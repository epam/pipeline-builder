import Step from './Step';
import Action from './Action';

/**
 * Class representing the group.
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
    if (config instanceof Action) {
      throw new Error('Group could be created only using config object');
    }

    super(name, new Action(name, config), config);

    this.type = type || 'default';
    /**
     * Dictionary of Group's own declarations.
     * @type {Object.<string, Declaration>}
     */
    this.ownDeclarations = {};
  }

  /**
   * Add a child step.
   *
   * @param {Declaration} declaration - Declaration to add.
   * @returns {Declaration} Added declaration. May be used for easy declaration creation.
   * @throws {Error} Generic exception if a declaration with the same name already exists.
   * @example
   * const declaration = parent.addDeclaration(new Declaration('declaration', ...));
   */
  addDeclaration(declaration) {
    const root = this.workflow();
    const existingInRoot = root && root.declarations[declaration.name];
    const ownExisting = this.ownDeclarations[declaration.name];
    if (!existingInRoot && !ownExisting) {
      if (declaration.step !== null) {
        declaration.step.removeDeclaration(declaration.name, root);
      }

      declaration.step = this;

      if (root) {
        root.declarations[declaration.name] = declaration;
      }
      this.ownDeclarations[declaration.name] = declaration;
    } else if ((existingInRoot && existingInRoot !== declaration) || ownExisting !== declaration) {
      throw new Error(`Cannot add a declaration with the same name ${declaration.name}.`);
    }
    return declaration;
  }

  /**
   * Remove a declaration.
   *
   * @param {string} name - Declaration to remove.
   * @param {Workflow} root - Declaration's workflow
   * @example
   * parent.removeDeclaration('declaration');
   */
  removeDeclaration(name, root = null) {
    const workflow = root || this.workflow();
    const declarationInRoot = workflow && workflow.declarations[name];
    const declaration = this.ownDeclarations[name];
    if (declarationInRoot) {
      declarationInRoot.step = null;
      delete workflow.declarations[name];
    }
    if (declaration) {
      declaration.step = null;
      delete this.ownDeclarations[name];
    }
  }
}

// Workaround for Google Closure inspections bug in JetBrains WebStorm.
// It doesn't understand "@extends" tag together with "export default class ... extends ...".
export default Group;
