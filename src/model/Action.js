import _ from 'lodash';
import EventDispatcher from './EventDispatcher';
/**
 * Port descriptor.
 *
 * @typedef {object} PortDesc
 * @property {string} [type] - Arbitrary type identifier (user-defined).
 * @property {*} [default] - Default value of the port.
 * @property {boolean} [multi=false] - Specifies if multiple incoming connections are allowed.
 */

/**
 * Clean-up port description and provide default values.
 *
 * @private
 * @param {PortDesc} portDesc - Port description.
 * @returns {PortDesc}
 */
function createPort(portDesc) {
  return _.defaults(_.pick(portDesc, [
    'type',
    'default',
    'multi',
  ]), {
    multi: false,
  });
}

function isPrimitive(obj) {
  return obj !== Object(obj);
}

function isSubset(subObject, bigObject) {
  return bigObject === subObject ||
    (!isPrimitive(subObject) && bigObject && !_.some(subObject, (val, key) =>
      !isSubset(val, bigObject[key])));
}

const PORT_PROHIBITION_ERROR = 'Ports are not allowed for this action';

/**
 * Class representing a generic action to be referenced in specific steps.
 *
 * @extends EventDispatcher
 * @example
 * // Create an action with an input variable 'name' and an output 'response'.
 * const helloAction = new Action('hello', {
 *   i: {
 *     name: {
 *       type: 'String',
 *     },
 *   },
 *   o: {
 *     response: {
 *       type: 'File',
 *       default: 'stdout()',
 *     },
 *   },
 *   data: {
 *     command: 'echo \'Hello ${name}!\'',
 *   },
 * });
 */
class Action extends EventDispatcher {
  /**
   * Create a generic action.
   *
   * @param {string} name - Action name. Must be unique in a {@link Workflow}.
   * @param {object=} desc - Action description.
   * @param {Object.<string, PortDesc>} [desc.i={}] - Dictionary of input ports descriptions.
   * @param {Object.<string, PortDesc>} [desc.o={}] - Dictionary of output ports descriptions.
   * @param {Object.<string, *>} [desc.data={}] - Metadata associated with the action (i.e. arbitrary user-defined
   * action details).
   */
  constructor(name, desc = {}) {
    super();

    if (_.isUndefined(name)) {
      throw new Error('Action must have a name');
    }
    /**
     * Action name.
     * @type {string}
     */
    this.name = name;

    /**
     * Flag that allow or prohibit the port addition to the action
     * Note if it set to true, trying to create or add any port lead to the exception
     * @type {boolean}
     */
    this.canHavePorts = _.isUndefined(desc.canHavePorts) ? true : Boolean(desc.canHavePorts);

    if (!this.canHavePorts && (!_.isUndefined(desc.i) || !_.isUndefined(desc.o))) {
      throw new Error(PORT_PROHIBITION_ERROR);
    }
    /**
     * Dictionary of input ports descriptions.
     * @type {Object.<string, PortDesc>}
     */
    this.i = _.mapValues(desc.i || {}, createPort);
    /**
     * Dictionary of output ports descriptions.
     * @type {Object.<string, PortDesc>}
     */
    this.o = _.mapValues(desc.o || {}, createPort);

    /**
     * Metadata associated with the action (i.e. arbitrary user-defined action details).
     * @type {Object.<string, *>}
     */
    this.data = _.assign({}, desc.data);
  }

  /**
   * Adds new ports or modifies existing ones.
   *
   * @param {object} desc - Ports to add or modify.
   * @param {Object.<string, PortDesc>} [desc.i={}] - Dictionary of input ports descriptions.
   * @param {Object.<string, PortDesc>} [desc.o={}] - Dictionary of output ports descriptions.
   * @example
   * helloAction.addPorts({
   *   i: {
   *     name: { default: 'World' },
   *     unused: { type: 'bar', multi: true },
   *   },
   *   o: {
   *     str: { type: 'String' },
   *   },
   * });
   */
  addPorts(desc) {
    if (!this.canHavePorts) {
      throw new Error(PORT_PROHIBITION_ERROR);
    }

    let changed = false;
    const newIn = _.mapValues(desc.i || {}, createPort);
    if (!isSubset(newIn, this.i)) {
      _.merge(this.i, newIn);
      changed = true;
    }

    const newOut = _.mapValues(desc.o || {}, createPort);
    if (!isSubset(newOut, this.o)) {
      _.merge(this.o, newOut);
      changed = true;
    }

    if (changed) {
      this.trigger('changed');
    }
  }

  /**
   * Removes ports.
   *
   * @param {object} ports - Ports to remove.
   * @param {Object.<string, string[]>} [ports.i=[]] - Array of input ports names.
   * @param {Object.<string, string[]>} [ports.o=[]] - Array of output ports names.
   * @example
   * helloAction.removePorts({ i: ['unused'], o: ['str'] });
   */
  removePorts(ports) {
    if (!this.canHavePorts) {
      throw new Error(PORT_PROHIBITION_ERROR);
    }

    let changed = false;
    const removePort = (portsMap, remList) => {
      _.forEach(remList, (portName) => {
        if (portsMap[portName]) {
          changed = true;
          delete portsMap[portName];
        }
      });
    };

    removePort(this.i, ports.i || []);
    removePort(this.o, ports.o || []);

    if (changed) {
      this.trigger('changed');
    }
  }

  _renamePort(oldName, newName, isInput) {
    if (!this.canHavePorts) {
      throw new Error(PORT_PROHIBITION_ERROR);
    }

    const ports = isInput ? this.i : this.o;

    if (!ports[oldName]) {
      throw new Error(`Port with name ${oldName} does not exist!`);
    }

    if (newName === oldName) {
      return;
    }

    if (ports[newName]) {
      throw new Error(`Port with name ${newName} already exists!`);
    }

    ports[newName] = ports[oldName];
    delete ports[oldName];
    this.trigger('port-rename', oldName, newName, isInput);
  }

  /**
   * Renames single input port.
   * @param {string} oldName - current name.
   * @param {string} newName - new name.
   * @example
   * helloAction.renameIPort('name', 'theName');
   */
  renameIPort(oldName, newName) {
    this._renamePort(oldName, newName, true);
  }

  /**
   * Renames single output port
   * @param {string} oldName - current name.
   * @param {string} newName - new name.
   * @example
   * helloAction.renameOPort('response', 'result');
   */
  renameOPort(oldName, newName) {
    this._renamePort(oldName, newName, false);
  }
}

// Workaround for JetBrains inspector bug.
// It doesn't understand "@extends" tag together with "export default class ... extends ...".
export default Action;
