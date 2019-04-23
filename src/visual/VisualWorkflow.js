import _ from 'lodash';
import VisualGroup from './VisualGroup';

/** Class that provides graphical representation for the Group.
 * @private
 */
export default class VisualWorkflow extends VisualGroup {
  /**
   * Creates new Workflow visual representation. Accepts all options for
   * joint.shapes.dev.Model and Step and embeds padding values.
   */
  constructor(opts = {}) {
    let text;
    const namespace = opts.step.namespace ? `${opts.step.namespace}.` : '';
    if (opts.step.name === opts.step.initialName || opts.step.initialName === `${namespace}${opts.step.name}`) {
      if (opts.step.action.name === `${namespace}${opts.step.name}`) {
        text = `${opts.step.type} ${namespace}${opts.step.name}`;
      } else {
        text = `${opts.step.type} ${opts.step.action.name} as ${opts.step.name}`;
      }
    } else {
      text = `${opts.step.type} ${opts.step.initialName} as ${opts.step.name}`;
    }

    super(_.defaultsDeep(opts, {
      attrs: {
        '.label': {
          text,
        },
      },
      type: 'VisualWorkflow',
      portsEnabled: !!(opts && opts.step && opts.step.parent),
    }));
  }

  _getLabel() {
    let text;
    const namespace = this.step.namespace ? `${this.step.namespace}.` : '';
    if (this.step.name === this.step.initialName || this.step.initialName === `${namespace}${this.step.name}`) {
      if (this.step.action.name === `${namespace}${this.step.name}`) {
        text = `${this.step.type} ${namespace}${this.step.name}`;
      } else {
        text = `${this.step.type} ${this.step.action.name} as ${this.step.name}`;
      }
    } else {
      text = `${this.step.type} ${this.step.initialName} as ${this.step.name}`;
    }

    return text;
  }
}
