import _ from 'lodash';
import * as joint from 'jointjs';

const cDefaultWidth = 100;
const cMinHeight = 100;

export default class VisualDeclaration extends joint.shapes.pn.Transition {

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

  isPortEnabled() {
    return true;
  }

  _getLabel() {
    return this.declaration.name;
  }
}
