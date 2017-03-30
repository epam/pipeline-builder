import _ from 'lodash';

/** Class representing a binding between inputs and outputs of workflow steps. */
export default class Connection {
  /**
   * Create a connection between two ports.
   *
   * **Note.** You should not use the constructor directly as all connections are automatically
   * created during {@link Port#bind port binding}.
   *
   * @param {Port|*} from - Source port or a constant.
   * @param {Port} to - Destination port.
   */
  constructor(from, to) {
    /**
     * Source port or a constant.
     * @type {Port|*}
     */
    this.from = from;
    /**
     * Destination port.
     * @type {Port}
     */
    this.to = to;
  }

  /**
   * Breaks the connection between source and destination ports.
   * @todo This function doesn't remove references to ports however they are not valid anymore.
   */
  unbind() {
    this.to.unbind(this.from);
  }

  /**
   * Function tells whether or not this connection is still valid, i.e. still binds two {@link Port Ports} together.
   * @returns {boolean} `true` if this connection was not unbound.
   */
  isValid() {
    return _.find(this.to.inputs, conn => conn === this) !== undefined;
  }
}
