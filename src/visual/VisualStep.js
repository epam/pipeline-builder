import _ from 'lodash';
import joint from 'jointjs';

const cDefaultWidth = 100;
const cMinHeight = 100;
const cPixelPerSymbol = 10;
const cLabelMargin = 20;
const cHeightPerPort = 50;

function findMaxLen(strList) {
  return _.reduce(strList, (maxLen, str) => Math.max(str.length, maxLen), 0);
}

/** Class that provides graphical representation for the Step.
 * @private
 */
export default class VisualStep extends joint.shapes.devs.Model {
  /**
   * Creates new Step visual representation. Accepts all options for
   * joint.shapes.dev.Model and various custom parameters.
   * @param {object=} opts - Action description.
   * @param {Object.<string, Step>} opts.step - Step instance.
   * @param {Object.<string, int>} [opts.x=0] - Center x coordinate.
   * @param {Object.<string, int>} [opts.y=0] - Center y coordinate.
   */
  constructor(opts = { step: null, x: 0, y: 0 }) {
    super(_.defaultsDeep(opts, {
      position: {
        x: (opts.x - cDefaultWidth / 2) || 0,
        y: (opts.y - cMinHeight / 2) || 0,
      },
      attrs: {
        '.label': {
          text: opts.step.name,
        },
      },
      type: 'VisualStep',
      step: opts.step,
    }));

    this.step = opts.step;
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
    const label = this._getLabel();
    const width = Math.max(cDefaultWidth, label.length * cPixelPerSymbol + 2 * cLabelMargin);
    this.set({
      inPorts: inNames,
      outPorts: outNames,
      size: {
        height,
        width,
      },
    });
    this.attr('.label', {
      text: label,
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

  _getLabel() {
    return this.step.name;
  }
}
