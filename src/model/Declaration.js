import Port from './Port';
import Action from './Action';
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
    if (declaration instanceof Action) {
      throw new Error('Group could be created only using declaration object');
    }
    super(name, step, {});

    delete this.desc;

    /**
     * Declaration expression extracted object.
     * @type {string}
     */
    this.expression = extractExpression(declaration.expression);
    /**
     * Declaration type.
     * @type {string}
     */
    this.type = extractType(declaration.type);
  }

}
