import _ from 'lodash';
import joint from 'jointjs';

/**
 * Class that represents graphical link
 * @private
 */
export default class VisualLink extends joint.shapes.pn.Link {

  constructor(opts, readOnly) {
    const defaultLinkaAttr = readOnly ?
    {
      conn: null,
      attrs: {
        '.link-tools': {
          display: 'none',
        },
        '.marker-arrowheads': {
          display: 'none',
        },
      },
    }
    :
    {
      conn: null,
    };

    super(_.defaultsDeep(opts, defaultLinkaAttr));
    /** Connection from model. */
    this.conn = this.attributes.conn;
  }

  _check(name, port) {
    const data = this.get(name);
    if (port.name !== data.port) {
      data.port = port.name;
    }
  }

  _checkPorts() {
    const conn = this.conn;
    const source = this.getSourceElement();
    const target = this.getTargetElement();

    return source.isPortEnabled(conn.from.step.hasInputPort(conn.from), this.get('source').port) &&
           target.isPortEnabled(conn.to.step.hasInputPort(conn.to), this.get('target').port);
  }

  /**
   * Updates visual link according to the model.
   */
  refresh() {
    const conn = this.conn;
    if (!conn) {
      return;
    }
    const isValidConn = conn.isValid();
    if (isValidConn && this._checkPorts()) {
      this._check('source', conn.from);
      this._check('target', conn.to);
    } else {
      this.remove({ silent: isValidConn });
    }
  }

}
