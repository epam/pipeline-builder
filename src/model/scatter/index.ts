import { Action } from '../action';
import {
  ContextTypes,
  IParameter,
  IScatter,
  IScatterIterator,
  IScatterOptions,
} from '../types';
import ScatterIterator from './scatter-iterator';
import { IParameterOrAction } from '../utilities/dependencies';

class Scatter extends Action<ContextTypes.scatter> implements IScatter {
  private readonly _scatterIterator: ScatterIterator;

  /**
   * @param {IScatterOptions} options
   */
  constructor(options: IScatterOptions) {
    if (!options) {
      throw new Error('Scatter options are not provided');
    }
    const {
      iterator,
      binding,
      ...rest
    } = options;
    const scatterIterator = new ScatterIterator(options);
    super(
      ContextTypes.scatter,
      {
        ...rest,
        inputs: [scatterIterator],
      },
    );
    this._scatterIterator = scatterIterator;
  }

  get iterator(): IScatterIterator {
    return this._scatterIterator;
  }

  protected propertiesMatchesRegExp(regExp: RegExp): boolean {
    return super.propertiesMatchesRegExp(regExp)
      || regExp.test('scatter')
      || regExp.test(this.iterator.name)
      || (
        this.iterator.value && regExp.test(this.iterator.value)
      );
  }

  // eslint-disable-next-line class-methods-use-this
  protected getWdlContentInputElements(): IParameter[] {
    return [];
  }

  protected getWdlContentBodyElements(): IParameterOrAction[] {
    return []
      .concat(this.declarations)
      .concat(this.actions);
  }

  protected getWdlContentHeader(): string {
    return `scatter (${this.iterator.name} in ${this.iterator.value})`;
  }

  toString(): string {
    if (this.iterator && this.iterator.name && this.iterator.value) {
      return `scatter (${this.iterator.name} in ${this.iterator.value})`;
    }
    return 'scatter';
  }
}

export default Scatter;
