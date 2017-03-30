import _ from 'lodash';
import Connection from './Connection';

/**
 * Class representing binding points of workflow steps.
 */
export default class Port {
  /**
   * Create a port.
   *
   * **Note.** You should not use the constructor directly as all Ports are automatically
   * created from corresponding descriptors (specified in {@link Action}) during {@link Step} creation.
   *
   * @param {string} name - Port name.
   * @param {Step} step - Parent step this port belongs to.
   * @param {PortDesc} desc - Port descriptor this port adheres to.
   */
  constructor(name, step, desc) {
    /**
     * The name of this port.
     * @type {string}
     */
    this.name = name;
    /**
     * Parent step this port belong to.
     * @type {Step}
     */
    this.step = step;
    /**
     * Port descriptor this port adheres to.
     * @type {PortDesc}
     */
    this.desc = desc;
    /**
     * A list of incoming connections.
     * @type {Connection[]}
     */
    this.inputs = [];
    /**
     * A list of outgoing connections.
     * @type {Connection[]}
     */
    this.outputs = [];
  }

  /**
   * Bind this target port to a source one.
   * It doesn't check if the ports are already connected.
   *
   * @param {Port|*} source - Source of the data, either a port or an immediate constant.
   * @returns {Connection} Created connection object
   * @todo This function doesn't check if multiple sources are allowed (see desc.multi).
   *
   * @example
   * // Connect "prev" and "next" Steps through their "variable" Ports
   * next.i.variable.bind(prev.o.variable);
   * @example
   * // Specify a constant value
   * step.i.variable.bind(42);
   */
  bind(source) {
    const conn = new Connection(source, this);
    this.inputs.push(conn);
    if (source instanceof Port) {
      source.outputs.push(conn);
    }

    return conn;
  }

  /**
   * Unbind this target port from a source one.
   * @param {Port|*} source - Source of the data.
   */
  unbind(source) {
    _.remove(this.inputs, conn => conn.from === source);
    if (source instanceof Port) {
      _.remove(source.outputs, conn => conn.to === this);
    }
  }

  /**
   * Unbind all incoming connections for this port.
   */
  unbindAll() {
    const sources = _.uniq(_.map(this.inputs, 'from'));
    _.forEach(sources, (source) => {
      if (source instanceof Port) {
        _.remove(source.outputs, conn => conn.to === this);
      }
    });
    this.inputs.length = 0;
  }

  /**
   * Unbind all incoming and outgoing connections for this port.
   */
  disconnect() {
    this.unbindAll();
    const outputs = this.outputs;
    this.outputs = [];
    _.forEach(outputs, conn => conn.unbind());
  }
}
