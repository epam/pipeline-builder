import {
  ContextTypes, IParameter, IParameterOptions, IWdlError, WdlErrorLevel,
} from '../types';
import CallParameter from './call-parameter';
import Parameter from '../parameter';
import { UnknownInputError, ValueRequiredError } from '../validation';

class CallInput
  extends CallParameter<ContextTypes.input, ContextTypes.input | ContextTypes.declaration> {
  public constructor(
    options: IParameterOptions,
  );
  public constructor(
    executableInput: IParameter<ContextTypes.input | ContextTypes.declaration>,
  );
  public constructor(
    executableInput: IParameterOptions | IParameter<ContextTypes.input | ContextTypes.declaration>,
  ) {
    if (executableInput instanceof Parameter) {
      super(executableInput, ContextTypes.input);
    } else {
      super(executableInput as IParameterOptions);
    }
  }

  protected getValidationErrors(): IWdlError[] {
    const issues: IWdlError[] = super.getValidationErrors();
    if (!this.executableParameter) {
      issues.push(
        new UnknownInputError(
          this,
          `"${this.name}" is not found among caller inputs`,
          WdlErrorLevel.warning,
        ),
      );
    } else if (
      !this.executableParameter.value
      && !this.executableParameter.optional
      && !this.value
    ) {
      issues.push(new ValueRequiredError(this));
    }
    return issues;
  }
}

export default CallInput;
