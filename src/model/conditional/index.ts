import { Action } from '../action';
import {
  ContextTypes, IConditional, IConditionalOptions,
  WdlEvent,
} from '../types';
import ConditionalExpression from './conditional-expression';

class Conditional extends Action<ContextTypes.conditional> implements IConditional {
  private readonly _expression: ConditionalExpression;

  /**
   * @typedef {ActionOptions} ConditionalOptions
   * @property {string} expression
   */

  /**
   * @param {ConditionalOptions} options
   */
  constructor(options: IConditionalOptions) {
    if (!options) {
      throw new Error('Conditional options are not provided');
    }
    super(ContextTypes.conditional, options);
    const {
      expression,
    } = options;
    this._expression = new ConditionalExpression(expression || '');
    this.children.push(this._expression);
  }

  get entityValid(): boolean {
    return super.entityValid && this._expression.entityValid;
  }

  get entityContainsIssues(): boolean {
    return super.entityContainsIssues || this._expression.entityContainsIssues;
  }

  protected get eventsRequireValidation(): Set<WdlEvent> {
    return new Set([
      ...super.eventsRequireValidation,
      WdlEvent.conditionChanged,
    ]);
  }

  get expression(): string {
    return this._expression ? this._expression.value : undefined;
  }

  set expression(expression: string) {
    if (this._expression) {
      this._expression.value = expression;
    }
  }

  protected propertiesMatchesRegExp(regExp: RegExp): boolean {
    return super.propertiesMatchesRegExp(regExp)
      || regExp.test('if')
      || (
        this.expression
        && (
          regExp.test(`if (${this.expression})`)
          || regExp.test(this.expression)
        )
      );
  }

  protected getWdlContentHeader(): string {
    return `if (${this.expression})`;
  }

  toString(): string {
    return `condition "${this.expression}"`;
  }
}

export default Conditional;
