import { ActionWithOutputs } from '../action';
import {
  ContextTypes,
} from '../context-types';
import {
  ICall,
  ICallAfter,
  ICallOptions,
  IExecutable,
  IExecutableCallOptions,
  IParameter,
  IParameterOptions,
  IParametersObject,
  isExecutableCallOptions,
  isTask,
  isTaskCallOptions,
  isWorkflowCallOptions,
  IWdlEntity,
  IWdlError,
  TParameterTypes,
  WdlErrorLevel,
  WdlEvent,
  WdlVersion,
} from '../types';
import CallInput from './call-input';
import CallOutput from './call-output';
import resolveIdentifier from '../utilities/resolve-identifier';
import Executable from '../executable';
import CallParameter from './call-parameter';
import { TParameterInitializer } from '../parameter/parameter';
import { getScopedContent, IWdlContentItem, IWdlContentScope } from '../utilities/wdl-generation';
import { ActionWdlContentBlock } from '../action/action';
import { createEventDispatcherArray, WdlEventDispatcherArray } from '../events';
import CallAfter from './call-after';
import {
  ExecutableRequiredError,
  MissingInputError,
  MissingOutputError,
  UniqueNameRequiredError,
  UnknownExecutableError,
  UnsupportedError,
} from '../validation';

const CallParameterInitializers = new Map<TParameterTypes, TParameterInitializer>();
CallParameterInitializers.set(ContextTypes.input, CallInput);
CallParameterInitializers.set(ContextTypes.output, CallOutput);

class Call extends ActionWithOutputs<ContextTypes.call> implements ICall {
  private _executable: IExecutable | undefined;

  private readonly _after: WdlEventDispatcherArray<ICallAfter>;

  private _executableName: string | undefined;

  /**
   * @param {ICallOptions} options
   */
  constructor(options: ICallOptions) {
    if (!options) {
      throw new Error('Call should be initialized with options');
    }
    const callOptions = ((): ICallOptions<IExecutableCallOptions> | never => {
      if (isExecutableCallOptions(options)) {
        return options;
      }
      if (isTaskCallOptions(options)) {
        const {
          task,
          ...rest
        } = options;
        return {
          ...rest,
          executable: task,
        };
      }
      if (isWorkflowCallOptions(options)) {
        const {
          workflow,
          ...rest
        } = options;
        return {
          ...rest,
          executable: workflow,
        };
      }
      throw new Error('Call executable (workflow / task) should be specified');
    })();
    const {
      executable,
      after = [],
      ...restOptions
    } = callOptions;
    if (!executable) {
      throw new Error('Call should be initialized with executable');
    }
    let executableName: string | undefined;
    if (typeof executable === 'string') {
      executableName = executable;
    }
    super(
      ContextTypes.call,
      restOptions,
      CallParameterInitializers,
    );
    this._executableName = executableName;
    this._after = createEventDispatcherArray(
      this,
      undefined,
      undefined,
      undefined,
    );
    this.registerChildrenContainer(this._after);
    this.muteAction(() => {
      this.setExecutable(executable);
      this._after.push(...CallAfter.deserializeCallAfter(after));
    });
    this.informTreeChanged();
  }

  protected get eventsRequireValidation(): Set<WdlEvent> {
    return new Set([
      ...super.eventsRequireValidation,
      WdlEvent.executableChanged,
      WdlEvent.executableParameterChanged,
      WdlEvent.parametersChanged,
      WdlEvent.commandChanged,
      WdlEvent.runtimePropertyChanged,
      WdlEvent.runtimeChanged,
    ]);
  }

  get name(): string | undefined {
    return this.executableName;
  }

  set name(name: string) {
    this.executableName = name;
  }

  protected setName(name: string) {
    this.setExecutable(name);
  }

  get executableName(): string | undefined {
    if (this.executable) {
      return this.executable.name;
    }
    if (this._executableName) {
      return this._executableName;
    }
    return undefined;
  }

  set executableName(executableName: string | undefined) {
    this.setExecutable(executableName);
  }

  /**
   * @returns {ITask|undefined}
   */
  get executable(): IExecutable | undefined {
    return this._executable;
  }

  /**
   * @param {IExecutable|undefined} executable
   */
  set executable(executable: IExecutable | undefined) {
    this.setExecutable(executable);
  }

  get after(): ICall[] {
    return this._after
      .filter((after) => !!after.call)
      .map((after) => after.call);
  }

  get entityValid(): boolean {
    return super.entityValid && (
      !this.executable
      || this.executable.entityValid
    );
  }

  get entityContainsIssues(): boolean {
    return super.entityContainsIssues || (
      this.executable && this.executable.entityContainsIssues
    );
  }

  protected onTreeChanged() {
    super.onTreeChanged();
    if (!this.executable && this._executableName) {
      this.setExecutable(this._executableName);
    } else if (this.executable) {
      this._executableName = this.executable.getReferenceFor(this);
    }
  }

  private setExecutable(executable: IExecutable | string | undefined): void {
    let executableObj: IExecutable | undefined;
    if (typeof executable === 'string') {
      const wdlEntity = resolveIdentifier(
        this.root,
        executable,
        ContextTypes.task,
        ContextTypes.workflow,
      );
      if (wdlEntity instanceof Executable) {
        executableObj = wdlEntity;
      }
    } else if (executable) {
      executableObj = executable;
    }
    if (executableObj) {
      this._executableName = executableObj.getReferenceFor(this);
    }
    if (executableObj !== this._executable && executableObj) {
      if (this._executable) {
        this.stopForwardEventsFrom(this._executable);
        this._executable.unregisterCall(this);
        this._executable.off(WdlEvent.parametersChanged, this.onExecutableChanged, this);
      }
      this._executable = executableObj;
      this._executable.registerCall(this);
      this.bubble(WdlEvent.executableChanged, executableObj);
      if (executableObj) {
        this.stopForwardEventsFrom(executableObj);
        this.startForwardEventsFrom(
          executableObj,
          WdlEvent.commandChanged,
          WdlEvent.runtimeChanged,
          WdlEvent.runtimePropertyChanged,
          WdlEvent.nameChanged,
          WdlEvent.metaChanged,
          WdlEvent.validation,
        );
        this.startForwardEventsFrom(
          {
            from: executableObj,
            senderChecker: (sender: IWdlEntity) => isTask(sender.parent)
              && sender.parent === executableObj,
          },
          WdlEvent.validation,
        );
        executableObj.on(WdlEvent.parametersChanged, this.onExecutableChanged, this);
      }
      this.updateParameters();
    }
  }

  private onExecutableChanged(event: WdlEvent, sender: IWdlEntity): void {
    if (sender === this._executable) {
      this.updateParameters();
    }
  }

  override addParameters<P extends TParameterTypes>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    parameters: IParameter<P>[] | IParameterOptions[] | IParametersObject<P>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type?: P,
  ): never {
    throw new Error(`Error adding parameters to ${this.toString()}: parameters should be added to the task / workflow`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override removeParameters<P extends TParameterTypes>(parameters: IParameter<P>[]): never {
    throw new Error(`Error removing parameters from ${this.toString()}: parameters should be removed from the task / workflow`);
  }

  private updateParameters(): void {
    const getCallParameter = <T extends TParameterTypes, E extends TParameterTypes>(
      parameters: IParameter<T>[],
      parameter: IParameter<E>,
    ): IParameter<T> | undefined => parameters.find((o) => o.name === parameter.reference);
    const getExecutableParameter = <T extends TParameterTypes, E extends TParameterTypes>(
      parameters: IParameter<E>[],
      parameter: IParameter<T>,
    ): IParameter<E> | undefined => parameters.find((o) => o.name === parameter.reference);
    const getModifiedParametersArrays = <P extends ContextTypes.input | ContextTypes.output,
      E extends TParameterTypes>(
        current: IParameter<P>[],
        executables: IParameter<E>[],
        initializer: ((parameter: IParameter<E>) => CallParameter<P, E>),
      ): {
        added: IParameter<P>[];
        removed: IParameter<P>[];
        other: IParameter<P>[];
      } => {
      const hasExecutableParameter = (
        parameter: IParameter<P>,
      ) => !!getExecutableParameter(executables, parameter);
      const callHasParameter = (
        parameter: IParameter<E>,
      ) => !!getCallParameter(current, parameter);
      return {
        added: executables
          .filter((p) => !callHasParameter(p))
          .map((p) => initializer(p)),
        removed: current
          .filter((p) => !hasExecutableParameter(p)),
        other: current
          .filter((p) => hasExecutableParameter(p)),
      };
    };
    const actionInputs = this.executable ? this.executable.getActionInputs() : [];
    const actionOutputs = this.executable ? this.executable.getActionOutputs() : [];
    const {
      added: addedInputs,
      removed: removedInputs,
      other: otherInputs,
    } = getModifiedParametersArrays(
      this.inputs,
      actionInputs,
      (input) => new CallInput(input),
    );
    const {
      added: addedOutputs,
      removed: removedOutputs,
      other: otherOutputs,
    } = getModifiedParametersArrays(
      this.outputs,
      actionOutputs,
      (output) => new CallOutput(output),
    );
    const assignExecutables = <P extends ContextTypes.input | ContextTypes.output,
      E extends TParameterTypes>(
        current: IParameter<P>[],
        executables: IParameter<E>[],
      ): void => {
      current.forEach((parameter) => {
        if (parameter instanceof CallParameter) {
          const executable = getExecutableParameter(executables, parameter);
          if (executable) {
            // eslint-disable-next-line no-param-reassign
            parameter.executableParameter = executable;
          }
        }
      });
    };
    this.muteAction(() => {
      this.removeActionParameters([].concat(removedInputs).concat(removedOutputs));
      this.addActionParameters([].concat(addedInputs).concat(addedOutputs));
    });
    assignExecutables(otherInputs, actionInputs);
    assignExecutables(otherOutputs, actionOutputs);
    const asPlainArray = (...array: IParameter[][]): IParameter[] => {
      if (array.length === 0) {
        return [];
      }
      let result = [];
      for (let i = 0; i < array.length; i += 1) {
        result = result.concat(array[i]);
      }
      return result;
    };
    if (addedInputs.length > 0) {
      this.bubble(WdlEvent.inputsAdded, asPlainArray(addedInputs));
    }
    if (addedOutputs.length > 0) {
      this.bubble(WdlEvent.outputsAdded, asPlainArray(addedOutputs));
    }
    if (removedInputs.length > 0) {
      this.bubble(WdlEvent.inputsRemoved, asPlainArray(removedInputs));
    }
    if (removedOutputs.length > 0) {
      this.bubble(WdlEvent.outputsRemoved, asPlainArray(removedOutputs));
    }
    if (addedInputs.length > 0 || removedInputs.length > 0) {
      this.bubble(WdlEvent.inputsChanged, asPlainArray(this.inputs));
      this.bubble(
        WdlEvent.changed,
        { changed: 'inputs' },
      );
    }
    if (addedOutputs.length > 0 || removedOutputs.length > 0) {
      this.bubble(WdlEvent.outputsChanged, asPlainArray(this.outputs));
      this.bubble(
        WdlEvent.changed,
        { changed: 'outputs' },
      );
    }
    if (addedInputs.length > 0 || addedOutputs.length > 0) {
      this.bubble(WdlEvent.parametersAdded, asPlainArray(addedInputs, addedOutputs));
    }
    if (removedInputs.length > 0 || removedOutputs.length > 0) {
      this.bubble(WdlEvent.parametersRemoved, asPlainArray(removedInputs, removedOutputs));
    }
    if (
      addedInputs.length > 0
      || addedOutputs.length > 0
      || removedInputs.length > 0
      || removedOutputs.length > 0
    ) {
      this.bubble(
        WdlEvent.parametersChanged,
        asPlainArray(
          addedInputs,
          addedOutputs,
          removedInputs,
          removedOutputs,
        ),
      );
      this.informTreeChanged();
    }
  }

  protected propertiesMatchesRegExp(regExp: RegExp): boolean {
    const { executable } = this;
    return super.propertiesMatchesRegExp(regExp)
      || (
        executable
        && regExp.test(executable.name)
      );
  }

  protected override getWdlContentItems(): [IWdlContentItem, ActionWdlContentBlock][] {
    return [
      [
        getScopedContent(
          {
            scope: 'input:',
            open: '',
            close: '',
            join: ',\n',
          },
          this.inputs.filter((i) => !!i.value),
        ),
        ActionWdlContentBlock.initialization,
      ],
    ];
  }

  protected getWdlContentHeader(): string {
    const parts: (string | undefined)[] = [
      `call ${this.name}`,
    ];
    if (this.alias) {
      parts.push(`as ${this.alias}`);
    }
    if (this.supports(WdlVersion.v1_1)) {
      parts.push(
        ...this._after.map((a) => `after ${a.callName}`),
      );
    }
    return parts.filter((s) => !!s && s.length).join(' ');
  }

  protected getWdlContentScope(): IWdlContentScope {
    return {
      scope: this.getWdlContentHeader(),
      open: '{',
      close: '}',
      allowEmpty: true,
    };
  }

  protected getSelfValidationErrors(): IWdlError[] {
    const issues: IWdlError[] = super.getSelfValidationErrors();
    // unique name
    if (
      this.rootAction
        .getNestedActions()
        .some((action) => action !== this && action.reference === this.reference)
    ) {
      issues.push(new UniqueNameRequiredError(this));
    }
    if (
      this._after.length > 0
      && !this.supports(WdlVersion.v1_1)
    ) {
      issues.push(
        new UnsupportedError(this, `"call after" statement is not supported for this WDL document version (${this.version})`),
      );
    }
    if (!this.executableName) {
      issues.push(new ExecutableRequiredError(this, WdlErrorLevel.warning));
    } else if (!this.executable) {
      issues.push(
        new UnknownExecutableError(
          this,
          `Unknown executable "${this.executableName}"`,
          WdlErrorLevel.warning,
        ),
      );
    } else {
      const inputs: CallInput[] = this.inputs
        .filter((input) => input instanceof CallInput) as CallInput[];
      const outputs: CallOutput[] = this.outputs
        .filter((input) => input instanceof CallOutput) as CallOutput[];
      const requiredInputs = this.executable.getActionInputs().filter((i) => !i.value);
      const missingInputs = requiredInputs
        .filter((i) => !inputs.find((ci) => ci.name === i.name));
      missingInputs.forEach((missingInput) => {
        issues.push(new MissingInputError(this, `"${missingInput.name}" of ${this.executable.toString()} is missing`));
      });
      const missingOutputs = this.executable.getActionOutputs()
        .filter((i) => !outputs.find((ci) => ci.name === i.name));
      missingInputs.forEach((missingInput) => {
        issues.push(new MissingInputError(this, `"${missingInput.name}" of ${this.executable.toString()} is missing`));
      });
      missingOutputs.forEach((missingOutput) => {
        issues.push(new MissingOutputError(this, `"${missingOutput.name}" of ${this.executable.toString()} is missing`));
      });
      if (this.declarations.length > 0) {
        issues.push(
          new UnsupportedError(
            this,
            'Call declaration statements are not supported',
            WdlErrorLevel.warning,
          ),
        );
      }
    }
    return issues;
  }

  protected getValidationErrors(): IWdlError[] {
    return super.getValidationErrors()
      .concat(this.executable ? this.executable.issues : []);
  }

  toString(): string {
    return `call "${this.reference || ''}"`;
  }
}

export default Call;
