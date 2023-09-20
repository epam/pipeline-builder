import {
  ContextTypes,
  IScatterIterator,
  IScatterOptions,
  IType, IWdlError,
  ScatterIteratorSymbol,
  WdlErrorType,
  WdlEvent,
} from '../types';
import Parameter from '../parameter';
import { ValueRequiredError } from '../validation';

class ScatterIterator
  extends Parameter<ContextTypes.input> implements IScatterIterator {
  [ScatterIteratorSymbol] = true;

  constructor(options: IScatterOptions) {
    if (!options) {
      throw new Error('Scatter options are not provided');
    }
    const {
      binding,
      iterator = 'scatterItem',
      iteratorType,
    } = options;
    super(
      {
        name: iterator,
        value: binding,
        type: iteratorType,
      },
      ContextTypes.input,
    );
    this[ScatterIteratorSymbol] = true;
    this.on(WdlEvent.connectionsChanged, this.updateTypes, this);
    this.updateTypes();
  }

  get arrayType(): IType | undefined {
    return this.parameterType.makeArray();
  }

  get iteratorType(): IType | undefined {
    return this.parameterType.clone();
  }

  protected updateDependencies(force: boolean = true) {
    super.updateDependencies(force);
    this.updateTypes();
  }

  private updateTypes(): void {
    if (
      this.isSingleDependency
      && this.inboundConnections.length === 1
      && this.inboundConnections[0] instanceof Parameter
      && this.inboundConnections[0].isArray
    ) {
      this.type = this.inboundConnections[0].parameterType.makeArrayItem().toString();
    } else if (
      this.outboundConnections.length > 0
      && this.outboundConnections[0] instanceof Parameter
    ) {
      this.type = this.outboundConnections[0].type;
    } else {
      this.type = undefined;
    }
  }

  protected getValidationErrors(): IWdlError[] {
    const issues = super.getValidationErrors()
      .filter((issue) => issue.type !== WdlErrorType.typeRequired);
    if (!this.value) {
      issues.push(new ValueRequiredError(this));
    }
    return issues;
  }

  toString(): string {
    return `${this.name} (${this.contextType} of scatter)`;
  }
}

export default ScatterIterator;
