import joint from 'jointjs';

const cDefaultWidth = 100;
const cMinHeight = 100;

/** Class that provides graphical representation for the Group.
 * @private
 */
export default class VisualGroup extends joint.shapes.devs.Model {
  constructor(step, opts = {}) {
    super({
      position: {
        x: (opts.x - cDefaultWidth / 2) || 0,
        y: (opts.y - cMinHeight / 2) || 0,
      },
      attrs: {
        '.label': {
          text: step.type,
        },
      },
      type: 'VisualGroup',
    });

    this.step = step;
    this.update();
  }

  /**
   * Updates visual step according to the model.
   */
  update() {
    const step = this.step;

    this.attr('.label', {
      text: step.type,
    });

    if (this.graph) {
      this.fitEmbeds({
        deep: true,
        padding: {
          left: 5,
          right: 5,
          top: 50,
          bottom: 50,
        },
      });
    }
  }
}
