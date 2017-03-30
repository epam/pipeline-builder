import _ from 'lodash';
import Step from './Step';

/**
 * Class representing the entire workflow.
 * @extends Step
 * @example
 * const test = new Workflow('test', {
 *   i: {
 *     greeting: {
 *       type: 'String',
 *     },
 *   },
 * });
 * const hello = test.add(new Step('hello', ...));
 */
class Workflow extends Step {

  /**
   * Create a workflow.
   * A workflow is a compound {@link Step} which also keeps track of all {@link Action Actions} used
   * in its child steps.
   *
   * @param {string} name - Workflow name.
   * @param {object} [config={}] - Workflow configuration containing input bindings.
   */
  constructor(name, config = {}) {
    super(name, config);
    /**
     * A dictionary of actions to be (probably) used in the workflow.
     *
     * It is updated automatically when you {@link Workflow#add add} a child or a grandchild step.
     * You may also wish to {@link Workflow#addAction add actions} manually even if they do not correspond
     * to any child step in the workflow.
     *
     * @type {Object.<string, Action>}
     */
    this.actions = {};
    this.addAction(this.action);
  }

  /**
   * Add an action.
   * Normally it is called automatically when you {@link Workflow#add add} a child or a grandchild step.
   *
   * @param {Action} action - Action to add.
   * @returns {Action} Added action. May be used for easy action creation.
   * @throws {Error} Generic exception if a different action with the same name already exists.
   * @example
   * const action = flow.addAction(new Action('action', ...));
   */
  addAction(action) {
    const existing = this.actions[action.name];
    if (existing && existing !== action) {
      throw new Error('Cannot add another action with the same name');
    }
    this.actions[action.name] = action;
    return action;
  }

  /**
   * Remove an action.
   * If the action is used in any child step then it will not be removed unless `force=true` is specified.
   *
   * @param {string} name - Action to remove.
   * @param {boolean} [force=false] - Force to remove the action and every step which references it.
   * @throws {Error} Generic exception if the action is used in any child step.
   * @example
   * parent.removeAction('action');
   */
  removeAction(name, force = false) {
    const action = this.actions[name];
    if (action) {
      if (force) {
        this.walk((step) => {
          if (step.action === action && step.parent) {
            step.parent.remove(step.name);
            return false;
          }
          return undefined;
        });
      } else {
        let found = false;
        this.walk(step => !found && !(found = (step.action === action)));
        if (found) {
          throw new Error('Cannot remove action in use');
        }
      }
      delete this.actions[name];
    }
  }

  /**
   * Removes actions that are not used in any child step.
   */
  removeUnusedActions() {
    const actions = {};
    this.walk((step) => {
      actions[step.action.name] = 1;
    });
    const notUsed = _.filter(Object.keys(this.actions), name => actions[name] !== 1);
    _.forEach(notUsed, name => this.removeAction(name));
  }

}

// Workaround for Google Closure inspections bug in JetBrains WebStorm.
// It doesn't understand "@extends" tag together with "export default class ... extends ...".
export default Workflow;
