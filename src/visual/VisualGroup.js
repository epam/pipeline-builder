import _ from 'lodash';
import VisualStep from './VisualStep';

const cEmbedsPadding = 50;

/** Class that provides graphical representation for the Group.
 * @private
 */
export default class VisualGroup extends VisualStep {
  /**
   * Creates new Group visual representation. Accepts all options for
   * joint.shapes.dev.Model and Step and embeds padding values.
   */
  constructor(opts = {}) {
    super(_.defaultsDeep(opts, {
      attrs: {
        '.label': {
          text: opts.step.type,
        },
      },
      type: 'VisualGroup',
      embedsPadding: {
        left: cEmbedsPadding,
        right: cEmbedsPadding,
        top: cEmbedsPadding,
        bottom: cEmbedsPadding,
      },
    }));
  }

  /**
   * Call fit embeds with default params.
   */
  fit() {
    if (this.graph) {
      this.fitEmbeds({
        padding: this.attributes.embedsPadding,
      });
    }
  }

  _getLabel() {
    return this.step.type;
  }
}
