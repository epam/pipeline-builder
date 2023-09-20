// eslint-disable-next-line max-classes-per-file
import Parameter from './parameter';
import {
  ContextTypes,
  IParameterOptions,
  isExecutable,
  IWdlError,
} from '../types';
import { ValueRequiredError } from '../validation';

class InputParameter extends Parameter<ContextTypes.input> {
  constructor(options: IParameterOptions) {
    super(options, ContextTypes.input);
  }
}

class DeclarationParameter extends Parameter<ContextTypes.declaration> {
  constructor(options: IParameterOptions) {
    super(options, ContextTypes.declaration);
  }
}

class OutputParameter extends Parameter<ContextTypes.output> {
  constructor(options: IParameterOptions) {
    super(options, ContextTypes.output);
  }

  protected getValidationErrors(): IWdlError[] {
    const issues: IWdlError[] = super.getValidationErrors();
    if (
      this.parent
      && isExecutable(this.parent)
      && !this.value
    ) {
      issues.push(new ValueRequiredError(this));
    }
    return issues;
  }
}

Parameter.registerInitializer(ContextTypes.input, InputParameter);
Parameter.registerInitializer(ContextTypes.declaration, DeclarationParameter);
Parameter.registerInitializer(ContextTypes.output, OutputParameter);

export {
  InputParameter,
  DeclarationParameter,
  OutputParameter,
};
export default Parameter;
