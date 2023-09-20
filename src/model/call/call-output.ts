import {
  ContextTypes, IParameter, IParameterOptions, IWdlError, WdlErrorLevel,
} from '../types';
import CallParameter from './call-parameter';
import Parameter from '../parameter';
import { UnknownInputError } from '../validation';

class CallOutput
  extends CallParameter<ContextTypes.output, ContextTypes.output> {
  public constructor(
    options: IParameterOptions,
  );
  public constructor(
    executableOutput: IParameter<ContextTypes.output>,
  );
  public constructor(
    executableOutput: IParameterOptions | IParameter<ContextTypes.output>,
  ) {
    if (executableOutput instanceof Parameter) {
      super(executableOutput, ContextTypes.output);
    } else {
      super(executableOutput as IParameterOptions);
    }
  }

  get value(): string | undefined {
    if (this.executableParameter) {
      return this.executableParameter.value;
    }
    return undefined;
  }

  set value(value) {
    if (this.executableParameter) {
      this.executableParameter.value = value;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  get dependencies() {
    return [];
  }

  protected getValidationErrors(): IWdlError[] {
    const issues: IWdlError[] = super.getValidationErrors();
    if (!this.executableParameter) {
      issues.push(
        new UnknownInputError(
          this,
          `${this.name} is not found among caller outputs`,
          WdlErrorLevel.warning,
        ),
      );
    }
    return issues;
  }
}

export default CallOutput;
