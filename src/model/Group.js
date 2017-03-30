import Step from './Step';

/**
 * Class representing the entire group.
 * @extends Step
 * @example
 * const test = new Group('scatter1', {
 *   type: 'scatter',
 *   i: {
 *     scatter_array: {
 *       type: 'Array[String]',
 *     },
 *   },
 * });
 * const hello = test.add(new Step('hello', ...));
 */
class Group extends Step {

  /**
   * Create a group.
   * A group is a compound {@link Step} which also keeps track of all {@link Action Actions} used
   * in its child steps.
   *
   * @param {string} name - Group name.
   * @param {string} type - Group type.
   * @param {object} [config={}] - Group configuration containing group meta information.
   */
  constructor(name, type, config = {}) {
    /* Clean up config agains input or output ports or bindings*/
    delete config.i;
    delete config.o;

    super(name, config);

    this.type = type || 'default';
  }
}

// Workaround for Google Closure inspections bug in JetBrains WebStorm.
// It doesn't understand "@extends" tag together with "export default class ... extends ...".
export default Group;
