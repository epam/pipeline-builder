import _ from 'lodash';
import { shapes } from 'jointjs';

const cDefaultWidth = 12;
const cMinHeight = 50;
const cPixelPerSymbol = 10;

export default class VisualDeclaration extends shapes.pn.Transition {

  constructor(opts = { declaration: null, x: 0, y: 0 }) {
    super(_.defaultsDeep(opts, {
      position: {
        x: (opts.x - cDefaultWidth / 2) || 0,
        y: (opts.y - cMinHeight / 2) || 0,
      },
      type: 'VisualDeclaration',
      attrs: {
        '.label': {
          text: opts.declaration.name,
        },
      },
    }));

    this.step = opts.declaration.step;
    this.declaration = opts.declaration;
  }

  // eslint-disable-next-line class-methods-use-this
  isPortEnabled() {
    return true;
  }

  _getLabel() {
    return this.declaration.name;
  }

  /**
   * Obtains bounding box os the element. Overrides Model method.
   * @param opts options, see joint.shapes.devs.Model.getBBox
   * @returns {*}
   */
  getBBox(opts) {
    const bbox = super.getBBox(opts);
    const declaration = this.declaration;
    if (declaration) {
      const boxWidth = Math.max((cPixelPerSymbol * declaration.name.length), cDefaultWidth);
      bbox.x -= boxWidth / 2;
      bbox.width = boxWidth;
    }
    return bbox;
  }
}
