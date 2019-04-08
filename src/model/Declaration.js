import Port from './Port';
import { extractExpression, extractType } from '../parser/WDL/utils/utils';

/**
 * Class representing binding points of workflow steps.
 */
export default class Declaration extends Port {
  /**
   * Create a Declaration.
   *
   * @param {string} name - Declaration name
   * @param {ast} declaration - Declaration ast tree node
   * @param {Step} step - Parent step this Declaration belongs to.
   */
  constructor(name, declaration, step) {
    if (!name) {
      throw new Error('Declaration must have a name');
    }
    if (!declaration.expression || !declaration.type) {
      throw new Error('Declaration could be created only using declaration object');
    }
    const expression = extractExpression(declaration.expression);
    const type = extractType(declaration.type);
    const desc = {
      default: expression.string || undefined,
      type,
    };
    super(name, step, desc);

    /**
     * Declaration expression extracted object.
     * @type {Object}
     */
    this.expression = expression;
    /**
     * Declaration type.
     * @type {string}
     */
    this.type = type;
  }

}
