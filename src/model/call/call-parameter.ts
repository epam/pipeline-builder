import {
  ContextTypes,
} from '../context-types';
import {
  IParameter, IParameterOptions, IParameterType, IWdlError, TParameterTypes, WdlEvent,
} from '../types';
import Parameter from '../parameter';

abstract class CallParameter
<T extends ContextTypes.input | ContextTypes.output, E extends TParameterTypes>
  extends Parameter<T> {
  private _executableParameter: IParameter<E> | undefined;

  protected constructor(
    options: IParameterOptions,
  );
  protected constructor(
    executableParameter: IParameter<E>,
    contextType: T,
  );
  protected constructor(
    executableParameter: IParameter<E> | IParameterOptions,
    contextType?: T,
  ) {
    const opts: IParameterOptions = (() => {
      if (executableParameter instanceof Parameter) {
        return {
          name: executableParameter.name,
          type: executableParameter.type,
        };
      }
      return executableParameter as IParameterOptions;
    })();
    super(
      opts,
      contextType,
    );
    this._executableParameter = undefined;
    if (executableParameter instanceof Parameter) {
      this.setExecutableParameter(executableParameter);
    }
  }

  protected get eventsRequireValidation(): Set<WdlEvent> {
    return new Set([
      ...super.eventsRequireValidation,
      WdlEvent.executableParameterChanged,
    ]);
  }

  get executableParameter(): IParameter<E> | undefined {
    return this._executableParameter;
  }

  set executableParameter(executableParameter: IParameter<E> | undefined) {
    this.setExecutableParameter(executableParameter);
  }

  get name(): string {
    return this.executableParameter
      ? this.executableParameter.name
      : super.getName();
  }

  set name(name) {
    if (this.executableParameter) {
      this.executableParameter.name = name;
    }
  }

  get parameterType(): IParameterType {
    return this.executableParameter
      ? this.executableParameter.parameterType
      : super.parameterType;
  }

  get type(): string | undefined {
    return this.executableParameter
      ? this.executableParameter.type
      : super.type;
  }

  set type(type: string | undefined) {
    if (this.executableParameter) {
      this.executableParameter.type = type;
    }
  }

  get typeIssues(): IWdlError[] {
    const { executableParameter } = this;
    if (executableParameter && executableParameter instanceof Parameter) {
      return executableParameter.typeIssues;
    }
    return [];
  }

  destroy() {
    super.destroy();
    if (this._executableParameter) {
      this.stopForwardEventsFrom(this._executableParameter);
      this._executableParameter = undefined;
    }
  }

  protected setExecutableParameter(executable: IParameter<E> | undefined) {
    if (this._executableParameter !== executable) {
      if (this._executableParameter) {
        this.stopForwardEventsFrom(this._executableParameter);
      }
      this._executableParameter = executable;
      if (this._executableParameter) {
        this.startForwardEventsFrom(
          this._executableParameter,
          WdlEvent.nameChanged,
          WdlEvent.typeChanged,
          WdlEvent.validation,
        );
      }
      this.bubble(WdlEvent.executableParameterChanged);
    }
  }

  generateWdl(): string {
    if (this.validate(true)) {
      return `${this.name} = ${this.value}`;
    }
    return undefined;
  }
}

export default CallParameter;
