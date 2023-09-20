import WdlEntity from '../base/wdl-entity';
import {
  ContextTypes,
  ContextTypeSymbol,
  IAction,
  IActionOptions,
  IActionOptionsWithType,
  ICall,
  ICallOptionsOrInstance,
  IConditional,
  IConditionalOptionsOrInstance,
  IParameter,
  IParameterOptions,
  IParametersObject,
  isCall,
  IScatter,
  IScatterOptionsOrInstance,
  isConditional,
  isScatter,
  IWdlEntity,
  TActionTypes,
  TParameterTypes,
  WdlEvent,
  WdlVersion,
} from '../types';
import Parameter from '../parameter';
import { createEventDispatcherArray, WdlEventDispatcherArray } from '../events';
import generateName from '../utilities/generate-name';
import { IEventDispatcherArray } from '../events/types';
import { TParameterInitializer } from '../parameter/parameter';
import { getScopedContent, IWdlContentItem, IWdlContentScope } from '../utilities/wdl-generation';
import { getBodyElementsExecutionOrder, IParameterOrAction } from '../utilities/dependencies';

export interface IActionInitializer<T extends TActionTypes> {
  new (options: IActionOptions<T>): Action<T>;
}

export interface IInitializer<T extends TActionTypes = TActionTypes> {
  readonly type: T;
  readonly initializer: IActionInitializer<T>;
}

export enum ActionWdlContentBlock {
  preHeader = 0,
  header = 1,
  postHeader = 2,
  preInitialization = 3,
  initialization = 4,
  postInitialization = 5,
  preBody = 6,
  body = 7,
  postBody = 8,
  preFinalization = 9,
  finalization = 10,
  postFinalization = 11,
}

/**
 * Action is a base class for `Call`, `Scatter`, `Conditional` and
 * `Executable` (`Workflow` and `Task`) wdl blocks.
 */
abstract class Action<T extends TActionTypes = TActionTypes>
  extends WdlEntity<T>
  implements IAction<T> {
  static Initializers: IInitializer[] = [];

  /**
   * @param {TActionTypes} type
   * @param {IActionInitializer} initializer
   */
  static registerActionInitializer<T extends TActionTypes>(
    type: T,
    initializer: IActionInitializer<T>,
  ): void {
    Action.Initializers.push({
      type,
      initializer,
    });
  }

  /**
   * @typedef {IWdlEntityOptions} ActionOptions
   * @property {ContextTypes} [type]
   * @property {Parameter[]} [inputs]
   * @property {Parameter[]} [declarations]
   * @property {ActionOptions[]} [actions]
   */

  /**
   * @param {IActionOptions} options
   * @returns {Action|undefined}
   */
  static deserialize<T extends TActionTypes>(
    options: IActionOptions<T> | IAction<T>,
  ): Action<T> | undefined {
    function isIAction(o: IActionOptions<T> | IAction<T>): o is IAction<T> {
      return !!o && o instanceof Action;
    }
    if (isIAction(options)) {
      return options as Action<T>;
    }
    const type: T = options.type || options[ContextTypeSymbol];
    if (!type) {
      console.warn('Action type is not specified');
      return undefined;
    }
    const opt: IInitializer | undefined = (options
      ? Action.Initializers.find((o) => o.type === type)
      : undefined);
    if (opt) {
      const Initializer = opt.initializer as IActionInitializer<T>;
      return new Initializer(options);
    }
    console.warn(`Unknown action type: "${type}"`);
    return undefined;
  }

  static deserializeArray(): Action[];
  static deserializeArray(
    actionsOptions: (IActionOptions | IAction)[],
  ): Action[];
  /**
   * @param {IActionOptions[]} [actionsOptions]
   * @returns {Action[]}
   */
  static deserializeArray(
    actionsOptions: (IActionOptions | IAction)[] = [],
  ): Action[] {
    return actionsOptions
      .map(Action.deserialize)
      .filter(Boolean);
  }

  static getInitializerForType = <I extends TParameterTypes>(
    type: I,
    initializers?: Map<TParameterTypes, TParameterInitializer>,
  ): TParameterInitializer<I, Parameter<I>> => {
    if (initializers) {
      return initializers.get(type) as TParameterInitializer<I, Parameter<I>>;
    }
    return undefined;
  };

  private readonly _actions: WdlEventDispatcherArray<Action>;

  private readonly _inputs: WdlEventDispatcherArray<Parameter<ContextTypes.input>>;

  private readonly _declarations: WdlEventDispatcherArray<Parameter<ContextTypes.declaration>>;

  protected constructor(
    contextType: T,
    options: IActionOptions<T>,
  );
  protected constructor(
    contextType: T,
    options: IActionOptions<T>,
    initializers: Map<TParameterTypes, TParameterInitializer>,
  );
  protected constructor(
    contextType: T,
    options: IActionOptions<T>,
    initializers?: Map<TParameterTypes, TParameterInitializer>,
  ) {
    if (!options) {
      throw new Error('Action options are not provided');
    }
    super(contextType, options);
    const {
      i = {}, // for compatability with previous
      d = {}, // pipeline-builder versions
      actions = [],
      inputs = i,
      declarations = d,
    } = options;
    this._actions = createEventDispatcherArray(
      this,
      WdlEvent.actionsAdded,
      WdlEvent.actionsRemoved,
      [
        WdlEvent.actionsChanged,
        {
          event: WdlEvent.changed,
          bubble: true,
          args: [{ changed: 'actions' }],
        },
      ],
    );
    this._inputs = createEventDispatcherArray(
      this,
      [
        WdlEvent.inputsAdded,
        WdlEvent.parametersAdded,
      ],
      [
        WdlEvent.inputsRemoved,
        WdlEvent.parametersRemoved,
      ],
      [
        WdlEvent.inputsChanged,
        WdlEvent.parametersChanged,
        {
          event: WdlEvent.changed,
          bubble: true,
          args: [{ changed: 'inputs' }],
        },
      ],
    );
    this._declarations = createEventDispatcherArray(
      this,
      [
        WdlEvent.declarationsAdded,
        WdlEvent.parametersAdded,
      ],
      [
        WdlEvent.declarationsRemoved,
        WdlEvent.parametersRemoved,
      ],
      [
        WdlEvent.declarationsChanged,
        WdlEvent.parametersChanged,
        {
          event: WdlEvent.changed,
          bubble: true,
          args: [{ changed: 'declarations' }],
        },
      ],
    );
    this.registerChildrenContainer(this._inputs);
    this.registerChildrenContainer(this._declarations);
    this.registerChildrenContainer(this._actions);
    this.muteAction(() => {
      this._inputs.push(
        ...Parameter.deserializeCollection(
          inputs,
          ContextTypes.input,
          Action.getInitializerForType(ContextTypes.input, initializers),
        ),
      );
      this._declarations.push(
        ...Parameter.deserializeCollection(
          declarations,
          ContextTypes.declaration,
          Action.getInitializerForType(ContextTypes.declaration, initializers),
        ),
      );
      this._actions.push(
        ...Action.deserializeArray(actions),
      );
    });
    this.on(WdlEvent.parametersChanged, this.validateChildrenEntities, this);
    this.informTreeChanged();
  }

  get type(): T {
    return this.contextType;
  }

  /**
   * @returns {IParameter<ContextTypes.input>[]}
   */
  get inputs(): IParameter<ContextTypes.input>[] {
    return this._inputs;
  }

  /**
   * @returns {Parameter<ContextTypes.declaration>[]}
   */
  get declarations(): IParameter<ContextTypes.declaration>[] {
    return this._declarations;
  }

  /**
   * Sub actions
   * @returns {IAction[]}
   */
  get actions(): IAction[] {
    return this._actions;
  }

  get rootAction(): IAction {
    if (this.parent instanceof Action) {
      return this.parent.rootAction;
    }
    return this;
  }

  get parameters(): IParameter[] {
    return [].concat(this.inputs).concat(this.declarations);
  }

  get entityValid(): boolean {
    return super.entityValid
      && !this.parameters.some((parameter) => !parameter.entityValid);
  }

  get entityContainsIssues(): boolean {
    return super.entityContainsIssues
      || this.parameters.some((parameter) => parameter.entityContainsIssues);
  }

  getAliases(): string[] {
    if (!this.reference) {
      return this.getChildrenActionsAliases();
    }
    return [this.reference].concat(this.getChildrenActionsAliases());
  }

  getChildrenActionsAliases(): string[] {
    return this.actions.reduce<string[]>(
      (aliases, action) => aliases
        .concat(action.getAliases()),
      [],
    );
  }

  /**
   * Actual input parameters of action; previous wdl versions (draft-2, draft-1)
   * didn't specify `inputs` sections for Workflows or Tasks, instead `declarations`
   * were treated as inputs for `executable`. That's why we need to
   *  - maintain "as-is" `inputs` and `declaration` arrays, as they were passed to
   *  constructor
   *  - use `getActionInputs` / `getActionDeclarations`
   *  for UI / binding purposes (to find "connectable" ports)
   */
  getActionInputs(): IParameter<ContextTypes.input | ContextTypes.declaration>[] {
    return []
      .concat(this.inputs)
      .concat(this.declarations)
      .filter((parameter) => parameter.isInput);
  }

  /**
   * Actual input parameters of action; previous wdl versions (draft-2, draft-1)
   * didn't specify `inputs` sections for Workflows or Tasks, instead `declarations`
   * were treated as inputs for `executable`. That's why we need to
   *  - maintain "as-is" `inputs` and `declaration` arrays, as they were passed to
   *  constructor
   *  - use `getActionInputs` / `getActionDeclarations`
   *  for UI / binding purposes (to find "connectable" ports)
   */
  getActionDeclarations(): IParameter<ContextTypes.declaration>[] {
    return []
      .concat(this.inputs)
      .concat(this.declarations)
      .filter((parameter) => parameter.isDeclaration);
  }

  protected getArrayForParameter<P extends TParameterTypes>(
    parameter: IParameter<P>,
  ): IEventDispatcherArray<IParameter> {
    switch (parameter.contextType) {
      case ContextTypes.input:
        return this._inputs as IEventDispatcherArray<IParameter>;
      case ContextTypes.declaration:
        return this._declarations as IEventDispatcherArray<IParameter>;
      default:
        return new WdlEventDispatcherArray();
    }
  }

  protected getArraysForParameters<P extends TParameterTypes>(
    parameters: IParameter<P>[],
  ): [IEventDispatcherArray<IParameter>, IParameter<P>[]][] {
    const arrays: [IEventDispatcherArray<IParameter>, IParameter<P>[]][] = [];
    parameters.forEach((instance) => {
      const array = this.getArrayForParameter(instance);
      if (array) {
        let config = arrays.find((c) => c[0] === array);
        if (!config) {
          config = [array, []];
          arrays.push(config);
        }
        if (!config[1].includes(instance)) {
          config[1].push(instance);
        }
      }
    });
    return arrays;
  }

  addParameters<P extends TParameterTypes>(
    parameters: IParameter<P>[]
  ): IParameter<P>[] | never;
  addParameters<P extends TParameterTypes>(
    parameters: IParameterOptions[],
    type: P,
  ): IParameter<P>[] | never;
  addParameters<P extends TParameterTypes>(
    parameters: IParametersObject<P>,
    type: P,
  ): IParameter<P>[] | never;
  addParameters<P extends TParameterTypes>(
    parameters: IParameter<P>[] | IParameterOptions[] | IParametersObject<P>,
    type?: P,
  ): IParameter<P>[] | never {
    return this.addActionParameters(parameters, type);
  }

  /**
   * For internal usage
   */
  protected addActionParameters<P extends TParameterTypes>(
    parameters: IParameter<P>[] | IParameterOptions[] | IParametersObject<P>,
    type?: P,
  ): IParameter<P>[] | never {
    const params = Parameter.deserializeCollection(parameters, type);
    this.getArraysForParameters(params)
      .forEach(([array, items]) => array.push(...items));
    return params;
  }

  removeParameters<P extends TParameterTypes>(
    parameters: IParameter<P>[],
  ): void | never {
    this.removeActionParameters(parameters);
  }

  /**
   * For internal usage
   */
  protected removeActionParameters<P extends TParameterTypes>(
    parameters: IParameter<P>[],
  ): void | never {
    this.getArraysForParameters(parameters)
      .forEach(([array, toRemove]) => array.remove(...toRemove));
    parameters.forEach((parameter) => {
      parameter.remove();
    });
  }

  addAction(
    call: ICallOptionsOrInstance,
  ): ICall;
  addAction(
    scatter: IScatterOptionsOrInstance,
  ): IScatter;
  addAction(
    conditional: IConditionalOptionsOrInstance,
  ): IConditional;
  addAction<A extends TActionTypes>(
    action: IActionOptionsWithType<A, IActionOptions<A>> | IAction<A>,
  ): IAction<A> | never {
    const actionInstance = ((): IAction<A> | undefined => {
      if (action instanceof Action) {
        return action;
      }
      return Action.deserialize(action) as IAction<A>;
    })();
    if (!actionInstance) {
      console.warn('Unsupported action', action);
      throw new Error('Unsupported action');
    }
    if (!isScatter(actionInstance) && !isConditional(actionInstance)) {
      const callsAliases = (this.stack.pop() || this).getChildrenActionsAliases();
      const globalAliases = this.document
        ? this.document
          .getAliases(ContextTypes.workflow, ContextTypes.task)
          .filter((alias) => !isCall(actionInstance) || actionInstance.executableName !== alias)
          .concat(this.document.getAliases(ContextTypes.struct))
        : [];
      const aliases = [...globalAliases, ...callsAliases];
      const alias = generateName(
        actionInstance.reference,
        aliases,
      );
      if (alias !== actionInstance.reference) {
        actionInstance.alias = alias;
      }
    }
    this.actions.push(actionInstance);
    return actionInstance;
  }

  removeAction<A extends TActionTypes>(action: IAction<A>): void {
    const idx = this.actions.indexOf(action);
    if (idx >= 0) {
      this.actions.splice(idx, 1);
    }
  }

  protected getParameterByCriteria<P extends TParameterTypes>(
    parameters: IParameter<P>[],
    criteria: (parameter: IParameter<P>) => boolean,
    executionStack: string[],
  ): IParameter<P> | undefined {
    if (!criteria) {
      return undefined;
    }
    const aParameter = parameters.find((p) => criteria(p));
    if (!aParameter) {
      return undefined;
    }
    if (executionStack.length) {
      // we need to check if parameter matches fully qualified name provided
      const { stack: currentStack = [] } = this;
      const currentStackPath = currentStack.filter((o) => !!o.reference).map((o) => o.reference);
      const min = Math.min(currentStackPath.length, executionStack.length);
      for (let i = 0; i < min; i += 1) {
        if (executionStack[i] !== currentStackPath[i]) {
          return undefined;
        }
      }
    }
    return aParameter;
  }

  protected getParameterByName<P extends TParameterTypes>(
    parameters: IParameter<P>[],
    name: string,
  ): IParameter<P> | undefined {
    if (!name) {
      return undefined;
    }
    const [parameterName, ...stack] = name.split('.').reverse();
    return this.getParameterByCriteria(
      parameters,
      (p) => p.name === parameterName,
      stack,
    );
  }

  protected getParameterByReference<P extends TParameterTypes>(
    parameters: IParameter<P>[],
    reference: string,
  ): IParameter<P> | undefined {
    if (!reference) {
      return undefined;
    }
    const [parameterReference, ...stack] = reference.split('.').reverse();
    return this.getParameterByCriteria(
      parameters,
      (p) => p.reference === parameterReference,
      stack,
    );
  }

  getParameterByUUID(uuid: string): IParameter | undefined {
    return this.parameters.find((o) => o.uuid === uuid);
  }

  getParameters(includeChildActionParameters: boolean): IParameter[] {
    if (!includeChildActionParameters) {
      return this.parameters;
    }
    return this.parameters
      .concat(
        this._actions.reduce<IParameter[]>((result, action) => ([
          ...result,
          ...action.getParameters(includeChildActionParameters),
        ]), []),
      );
  }

  /**
   * @param {string} input
   * @returns {Parameter|undefined}
   */
  getInput(
    input: string,
  ): IParameter<ContextTypes.input> | undefined {
    return this.getInputByReference(input);
  }

  /**
   * @param {string} input
   * @returns {Parameter|undefined}
   */
  getInputByName(
    input: string,
  ): IParameter<ContextTypes.input> | undefined {
    return this.getParameterByName(this.inputs, input);
  }

  /**
   * @param {string} input
   * @returns {Parameter|undefined}
   */
  getInputByReference(
    input: string,
  ): IParameter<ContextTypes.input> | undefined {
    return this.getParameterByReference(this.inputs, input);
  }

  /**
   * @param {string} declaration
   * @returns {Parameter|undefined}
   */
  getDeclaration(declaration: string): IParameter<ContextTypes.declaration> | undefined {
    return this.getDeclarationByReference(declaration);
  }

  /**
   * @param {string} declaration
   * @returns {Parameter|undefined}
   */
  getDeclarationByName(declaration: string): IParameter<ContextTypes.declaration> | undefined {
    return this.getParameterByName(this.declarations, declaration);
  }

  /**
   * @param {string} declaration
   * @returns {Parameter|undefined}
   */
  getDeclarationByReference(declaration: string): IParameter<ContextTypes.declaration> | undefined {
    return this.getParameterByReference(this.declarations, declaration);
  }

  getNestedActions(): IAction[];
  getNestedActions(includingSelf: boolean): IAction[];
  getNestedActions(includingSelf: boolean = true): IAction[] {
    let actions: IAction[] = [];
    if (includingSelf) {
      actions.push(this);
    }
    this.actions.forEach((sub) => {
      actions = actions.concat(sub.getNestedActions(true));
    });
    return actions;
  }

  generateParameterName(): string;
  generateParameterName(suggestedName: string): string;
  generateParameterName(suggestedName: string | undefined = undefined): string {
    const names = this.parameters.map((p) => p.name);
    return generateName(suggestedName || 'parameter', names);
  }

  remove(): void {
    if (this.parent && this.parent instanceof Action) {
      this.parent.removeAction(this);
    } else if (this.parent && this.parent === this.document as IWdlEntity) {
      this.document.remove(this);
    }
  }

  protected getWdlContentInputElements(): IParameter[] {
    if (this.supports(WdlVersion.draft3)) {
      return this.inputs;
    }
    return [];
  }

  protected getWdlContentBodyElements(): IParameterOrAction[] {
    if (this.supports(WdlVersion.draft3)) {
      return []
        .concat(this.declarations)
        .concat(this.actions);
    }
    return []
      .concat(this.inputs)
      .concat(this.declarations)
      .concat(this.actions);
  }

  protected getWdlContentItems(): [IWdlContentItem, ActionWdlContentBlock][] {
    const bodyElements: IParameterOrAction[] = this.getWdlContentBodyElements();
    const inputElements: IWdlContentItem | undefined = getScopedContent(
      'input',
      this.getWdlContentInputElements(),
    );
    return [
      [
        inputElements,
        ActionWdlContentBlock.initialization,
      ],
      [
        getBodyElementsExecutionOrder(bodyElements),
        ActionWdlContentBlock.body,
      ],
    ];
  }

  protected abstract getWdlContentHeader(): string;

  protected getWdlContentScope(): IWdlContentScope {
    return {
      scope: this.getWdlContentHeader(),
      open: '{',
      close: '}',
      allowEmpty: false,
    };
  }

  generateWdl(): string {
    if (this.validate(true)) {
      const contentItems: IWdlContentItem[] = this.getWdlContentItems()
        .sort((a, b) => a[1] - b[1])
        .map((a) => a[0]);
      const scope: IWdlContentScope = this.getWdlContentScope();
      return getScopedContent(
        scope,
        ...contentItems,
      );
    }
    return undefined;
  }
}

export default Action;
