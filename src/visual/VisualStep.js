import joint from 'jointjs';
import _ from 'lodash';

const cDefaultWidth = 100;
const cMinHeight = 100;
const cPixelPerSymbol = 15;
const cHeightPerPort = 50;

function findMaxLen(strList) {
  return _.reduce(strList, (maxLen, str) => Math.max(str.length, maxLen), 0);
}

/** Class that provides graphical representation for the Step.
 * @private
 */
export default class VisualStep extends joint.shapes.devs.Model {
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
      inPorts: inNames,
      outPorts: outNames,
      size: {
        height,
        width,
      },
    });
    this.attr('.label', {
      text: step.name,
    });

    const ports = this.getPorts();

    _.forEach(ports, (port) => {
      const stepPort = port.group === 'in' ? step.i[port.id] : step.o[port.id];

      const isEmpty = (_.size(stepPort.inputs) + _.size(stepPort.outputs)) === 0;

      const propVal = this.portProp(port.id, 'attrs/circle/class');
      const newVal = isEmpty ? 'port-body-empty' : 'port-body';
      if (!propVal || newVal !== propVal) {
        this.portProp(port.id, 'attrs/circle/class', newVal);
      }
    });
  }

  /**
   * Obtains bounding box os the element. Overrides Model method.
   * @param opts options, see joint.shapes.devs.Model.getBBox
   * @returns {*}
   */
  getBBox(opts) {
    const bbox = super.getBBox(opts);
    const step = this.step;
    if (step) {
      const leftOffset = cPixelPerSymbol * findMaxLen(Object.keys(step.i));
      const rightOffset = cPixelPerSymbol * findMaxLen(Object.keys(step.o));
      bbox.x -= leftOffset;
      bbox.width += leftOffset + rightOffset;
    }
    return bbox;
  }
}
