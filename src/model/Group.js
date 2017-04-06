import _ from 'lodash';
import Step from './Step';
import Action from './Action';

/**
 * Class representing the entire group.
 * @extends Step
 * @example
 * const test = new Group('scatter1', {
 *   type: 'scatter',
 *   data: {
 *     collection: 'inputSamples',
 *     item: 'sample',
 *   },
 * });
 * const hello = test.add(new Step('hello', ...));
 */
class Group extends Step {

  /**
   * Create a group.
   * A group is a compound {@link Step} which also keeps track of all {@link Action Actions} used
   * in its child steps.
   * Note that group cannot contain any ports
   *
   * @param {string} name - Group name.
   * @param {string} type - Group type.
   * @param {object} [config={}] - Group configuration containing group meta information.
   */
  constructor(name, type, config = {}) {
    /* Clean up config agains input or output ports or bindings*/
    if (!(config instanceof Action)) {
      if (_.has(config, 'i') || _.has(config, 'o')) {
        throw new Error('Group could not have any ports');
      }
    } else {
      throw new Error('Group could be created only using config object');
    }

    super(name, config);

    this.type = type || 'default';
  }

  /* Override the parent function to prohibit the port addition*/
  // eslint-disable-next-line class-methods-use-this
  _onActionChanged() {
  }
}

// Workaround for Google Closure inspections bug in JetBrains WebStorm.
// It doesn't understand "@extends" tag together with "export default class ... extends ...".
export default Group;
