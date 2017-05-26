import _ from 'lodash';
import Action from './Action';
import Port from './Port';

/**
 * Bind ports during step construction.
 *
 * @private
 * @param {Object.<string, PortDesc>} portDescMap
 * @param {Object.<string, Port>} portMap
 */
function bindPorts(portDescMap, portMap) {
  _.forEach(portDescMap, (portDesc, portName) => {
    const /** @type Port */ port = portMap[portName];
    if (port) {
      if (portDesc instanceof Port) {
        port.bind(portDesc);
      } else if (portDesc.bind) {
        port.bind(portDesc.bind);
      }
    }
  });
}

/**
 * Synchronizes all ports of a step with their descriptions.
 *
 * @private
 * @param {Object.<string, Port>} portMap
 * @param {Object.<string, PortDesc>} portDescMap
 * @param {Step} step
 * @returns {*|Object}
 */
function syncPortsWithDesc(portMap, portDescMap, step) {
  // disconnect removed ports
  _.forEach(portMap, (port, name) => {
    if (portDescMap[name] === undefined) {
      port.disconnect();
    }
  });

  const omitBy = _.omitBy || _.omit; // be prepared for legacy lodash 3.10.1
  portMap = omitBy(portMap, (port, name) => portDescMap[name] === undefined);
  _.forEach(portMap, (port, name) => {
    const desc = portDescMap[name];
    if (port.inputs.length > 1 && !desc.multi) {
      port.disconnect();
    }
    port.desc = desc;
  });

  _.forEach(portDescMap, (desc, name) => {
    if (portMap[name]) {
      return;
    }
    portMap[name] = new Port(name, step, desc);
  });
  return portMap;
}

/**
 * Class representing a specific step in a {@link Workflow}.
 *
 * @example
 * // Create a step from an action and set input variable name
 * const helloStep = new Step(helloAction.name, helloAction, {
 *   i: {
 *     name: {
 *       bind: 'World',
 *     },
 *   },
 * });
 * @example
 * // Create a step AND an action in one statement
 * const helloStep = new Step('hello', {
 *   i: {
 *     name: {
 *       type: 'String',
 *       bind: 'World',
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
export default class Step {
  /**
   * Create a workflow step. You should {@link Workflow#add add} it to a workflow or a compound step.
   *
   * @param {string} name - Step name. Must be unique in a parent step (e.g. {@link Workflow}).
   * @param {Action=} action - Action to execute during the step. If no action is specified it will
   * automatically be created based on the configuration. Multiple steps may share a single action.
   * @param {object} [config={}] - Action configuration containing input bindings.
   * It should include action description in case the action is missing.
   *
   */
  constructor(name, action, config = {}) {
    if (_.isUndefined(name)) {
      throw new Error('Step must have a name');
    }
    if (!(action instanceof Action)) {
      config = _.merge(action, config);
      action = new Action(name, config);
    }

    action.on('changed', () => this._onActionChanged());
    action.on('port-rename', (...args) => this._onPortRename(...args));

    /**
     * Step name.
     * @type {string}
     */
    this.name = name;
    /**
     * Action performed during the step.
     * @type {Action}
     */
    this.action = action;
    /**
     * Parent step. A step can only have a single parent.
     * @type {?Step}
     */
    this.parent = null;
    /**
     * Dictionary of child steps.
     * @type {Object.<string, Step>}
     */
    this.children = {};

    /**
     * Dictionary of input ports bindings.
     * @type {Object.<string, Port>}
     */
    this.i = _.mapValues(action.i, (portDesc, portName) => new Port(portName, this, portDesc));
    bindPorts(config.i || {}, this.i);

    /**
     * Dictionary of output ports bindings.
     * @type {Object.<string, Port>}
     */
    this.o = _.mapValues(action.o, (portDesc, portName) => new Port(portName, this, portDesc));
    bindPorts(config.o || {}, this.o);
  }

  /**
   * Add a child step.
   *
   * @param {Step} child - Step to add.
   * @returns {Step} Added step. May be used for easy step creation.
   * @throws {Error} Generic exception if a child with the same name already exists.
   * @example
   * const child = parent.add(new Step('child', ...));
   */
  add(child) {
    const existing = this.children[child.name];
    if (!existing) {
      if (child.parent !== null) {
        child.parent.remove(child.name);
      }
      child.parent = this;
      this.children[child.name] = child;

      // collect and add all child actions to the workflow
      const root = this.workflow();
      if (root) {
        const actions = [];
        this.walk(step => actions.push(step.action));
        _.forEach(actions, action => root.addAction(action));
      }
    } else if (existing !== child) {
      throw new Error('Cannot add a child step with the same name');
    }
    return child;
  }

  /**
   * Remove a child.
   *
   * @param {string} name - Child to remove.
   * @example
   * parent.remove('child');
   */
  remove(name) {
    const child = this.children[name];
    if (child) {
      child.parent = null;
      delete this.children[name];
    }
  }

  /**
   * Rename current step.
   * @param newName
   */
  rename(newName) {
    const oldName = this.name;
    const parent = this.parent;
    if (parent) {
      const existing = parent.children[newName];
      if (existing === this) {
        return;
      }
      if (existing) {
        throw new Error('Cannot rename step - name is already taken');
      }
      delete parent.children[oldName];
      parent.children[newName] = this;
    }
    this.name = newName;
  }

  /**
   * Retrieve a workflow this step belongs to.
   *
   * @returns {?Workflow} Parent or grandparent workflow this step belongs to.
   */
  workflow() {
    let node = this;
    while (!node.addAction && node.parent) {
      node = node.parent;
    }
    return node.addAction ? node : null;
  }

  /**
   * Walk down the step hierarchy applying a callback at each step (including the root).
   * The callback accepts a {@link Step} as a parameter and may return `false` to prevent further processing.
   *
   * - If `before` callback returns `false`, children processing is disabled.
   * - If `after` callback returns `false`, sibling processing is stopped.
   *
   * **Note.** Child nodes are visited in arbitrary order.
   *
   * @param {function|object} callback - Either a callback or a pair of callbacks to execute at each step.
   * By default a `before` callback is specified.
   * @param {function=} callback.before - Function to execute before visiting child nodes.
   * @param {function=} callback.after - Function to execute after visiting child nodes.
   * @returns {*} The return value of the `after` callback of the root node.
   *
   * @example
   * // Create a JavaScript object which reflects the steps hierarchy starting at "root" node
   * let tree = {};
   * const trees = [];
   * root.walk({
   *   before() {
   *     trees.push(tree);
   *     tree = {};
   *   },
   *   after(step) {
   *     const children = tree;
   *     tree = trees.pop();
   *     tree[step.name] = children;
   *   },
   * });
   * return tree;
   */
  walk(callback) {
    if (_.isFunction(callback)) {
      callback = { before: callback };
    }
    const beforeResult = callback.before && callback.before(this);
    if (beforeResult !== false) {
      _.forEach(this.children, child => child.walk(callback));
    }
    return callback.after && callback.after(this);
  }

  /**
   * Checks whether or not a Port instance is an input port of this step.
   * @param {Port} port
   * @returns {boolean}
   */
  hasInputPort(port) {
    return this.i[port.name] === port;
  }

  /**
   * Checks whether or not a Port instance is an output port of this step.
   * @param {Port} port
   * @returns {boolean}
   */
  hasOutputPort(port) {
    return this.o[port.name] === port;
  }

  _onActionChanged() {
    this.i = syncPortsWithDesc(this.i, this.action.i, this);
    this.o = syncPortsWithDesc(this.o, this.action.o, this);
  }

  _onPortRename(oldName, newName, isInput) {
    const ports = isInput ? this.i : this.o;

    ports[newName] = ports[oldName];
    ports[newName].name = newName;
    delete ports[oldName];
  }
}
