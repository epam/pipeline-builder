import joint from 'jointjs';

/**
 * Class that represents graphical link
 * @private
 */
export default class VisualLink extends joint.shapes.devs.Link {

  constructor(sourceId, sourcePort, targetId, targetPort, conn) {
    super({
      source: {
        id: sourceId,
        port: sourcePort,
      },
      target: {
        id: targetId,
        port: targetPort,
      },
    });
    /** Connection from model. */
    this.conn = conn;
  }

  _check(name, port) {
    const data = this.get(name);
    if (port.name !== data.port) {
      data.port = port.name;
    }
  }

  /**
   * Updates visual link according to the model.
   */
  refresh() {
    const conn = this.conn;
    if (!conn) {
      return;
    }
    if (conn.isValid()) {
      this._check('source', conn.from);
      this._check('target', conn.to);
    } else {
      this.remove();
    }
  }

}
