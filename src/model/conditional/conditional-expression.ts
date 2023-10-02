import Expression from '../expression';
import {
  ContextTypes,
} from '../context-types';
import {
  IExpression, IWdlError, WdlEvent,
} from '../types';
import { ConditionalExpressionRequiredError } from '../validation';

class ConditionalExpression extends Expression<ContextTypes.conditionalExpression> {
  constructor(expression: string) {
    super({ value: expression }, ContextTypes.conditionalExpression);
  }

  protected get eventsRequireValidation(): Set<WdlEvent> {
    return new Set([
      ...super.eventsRequireValidation,
      WdlEvent.conditionChanged,
    ]);
  }

  protected reportValueChanged() {
    this.bubble(WdlEvent.conditionChanged, this.value);
    this.bubble(WdlEvent.changed, { changed: 'property' });
  }

  canBindTo(source: IExpression): boolean;
  canBindTo(source: IExpression, throwError: boolean): boolean | never;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  canBindTo(source: IExpression, throwError?: boolean): boolean | never {
    return true;
  }

  protected getSelfValidationErrors(): IWdlError[] {
    const issues = super.getSelfValidationErrors();
    if (!this.value || !this.value.length) {
      issues.push(new ConditionalExpressionRequiredError(this));
    }
    return issues;
  }

  // eslint-disable-next-line class-methods-use-this
  toString(): string {
    return 'Condition';
  }
}

export default ConditionalExpression;
