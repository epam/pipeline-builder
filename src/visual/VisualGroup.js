import joint from 'jointjs';

const cDefaultWidth = 100;
const cMinHeight = 100;
const cPixelPerSymbol = 15;
const cHeightPerPort = 50;

/** Class that provides graphical representation for the Step.
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
          text: step.name,
        },
      },
      type: 'VisualStep',
    });

    this.step = step;
    this.update();
  }

  /**
   * Updates visual step according to the model.
   */
  update() {
    const step = this.step;
    const inNames = Object.keys(step.i);
    const outNames = Object.keys(step.o);
    const height = Math.max(cMinHeight, cHeightPerPort * Math.max(inNames.length, outNames.length));
    const width = Math.max(cDefaultWidth, step.name.length * cPixelPerSymbol);
    this.set({
      size: {
        height,
        width,
      },
    });
    this.attr('.label', {
      text: step.type,
    });
  }

  /**
   * Obtains bounding box os the element. Overrides Model method.
   * @param opts options, see joint.shapes.devs.Model.getBBox
   * @returns {*}
   */
  getBBox(opts) {
    return super.getBBox(opts);
  }
}
