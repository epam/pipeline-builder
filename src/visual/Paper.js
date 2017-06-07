import _ from 'lodash';
import joint, { V } from 'jointjs';

import VisualGroup from './VisualGroup';

/**
 * Extended version of the joint.dia.Paper class.
 */
export default class Paper extends joint.dia.Paper {
  /**
   * Create paper object.
   * @param opts options, see joint.dia.Paper.
   */
  constructor(opts) {
    super(_.defaults(opts, {
      gridSize: 1,
      linkPinning: false,
      perpendicularLinks: false,
      multiLinks: false,
      highlighting: {
        default: {
          name: 'stroke',
          options: {
            padding: 6,
          },
        },
        embedding: {
          name: 'addClass',
          options: {
            className: 'highlighted-parent',
          },
        },
      },

      validateEmbedding: (child, parent) => {
        const parentStep = parent.model.step;
        const childStepParent = child.step;
        return parent.model instanceof VisualGroup && childStepParent.name === parentStep.name;
      },

      validateConnection: (cellViewS, magnetS, cellViewT, magnetT, end, linkView) => {
        if (!cellViewT || !cellViewS || cellViewT.id === cellViewS.id) {
          return false;
        }

        const hasPortClass = (magnet) => {
          const classStr = magnet.getAttribute('class');
          return classStr && classStr.indexOf('port-body') !== -1;
        };
        // source
        if (!magnetS || !hasPortClass(magnetS)) {
          return false;
        }
        // target
        if (!magnetT || !hasPortClass(magnetT)) {
          return false;
        }

        const portUsed = _.find(this.model.getLinks(), link => (
          (link.id !== linkView.model.id &&
          link.get('target').id === cellViewT.model.id &&
          link.get('target').port === magnetT.getAttribute('port'))
        ));

        return !portUsed;
      },
      markAvailable: true,
    }));
  }

  _createCloneNode() {
    const paper = this;
    const viewportTransform = V(paper.viewport).attr('transform');
    V(paper.viewport).attr('transform', '');

    const graph = this.model;
    const viewportBBox = graph.getBBox(graph.getElements());
    const svgClone = paper.svg.cloneNode(true);

    V(paper.viewport).attr('transform', viewportTransform || '');

    V(svgClone).attr('width', '100%');
    V(svgClone).attr('height', '100%');

    V(svgClone).attr('viewBox', `${viewportBBox.x} ${viewportBBox.y} ${viewportBBox.width} ${viewportBBox.height}`);

    return svgClone;
  }

  /**
   * Generate PNG data and return in by calling the callback
   * @param callback Callback where PNG data is going to be passed to/
   * @param {object=} opts - Options
   * @param {string=} opts.bgrColor - background color.
   */
  getPNG(callback, opts = {}) {
    const image = new Image();
    image.src = `data:image/svg+xml;base64, ${window.btoa(this.getSVG())}`;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const graph = this.model;
      const rect = graph.getBBox(graph.getElements());
      canvas.width = rect.width;
      canvas.height = rect.height;
      const context = canvas.getContext('2d');
      context.fillStyle = opts.bgrColor || '#FFFFFF';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
      canvas.toBlob(callback, 'image/png');
    };
  }

  /**
   * Obtain svg string.
   * @returns {string} SVG contents.
   */
  getSVG() {
    const paper = this;
    const svgClone = this._createCloneNode();

    svgClone.removeAttribute('style');

    // The code below was inspired by the old jointjs version of format plugin.
    // It copies the necessary styles from paper to our svg file.
    // Unfortunately, it does its job in a sophisticated way:
    // 1. Disables all paper's stylesheets to obtain default values.
    // 2. Enable them back and retrieve only differences in styles.
    // 3. Applies styles to SVG elements.
    const styleSheetsCount = document.styleSheets.length;
    const styleSheetsCopy = [];

    // 1.
    for (let i = styleSheetsCount - 1; i >= 0; --i) {
      // Disabled styles could accidentally be removed from paper.
      // Therefore, backup them.
      styleSheetsCopy[i] = document.styleSheets[i];
      document.styleSheets[i].disabled = true;
    }

    const defaultComputedStyles = [];
    _.forEach(paper.svg.getElementsByTagName('*'), (elem, idx) => {
      const computedStyle = window.getComputedStyle(elem, null);
      defaultComputedStyles[idx] = _.cloneDeep(computedStyle);
    });

    if (styleSheetsCount !== document.styleSheets.length) {
      _.forEach(styleSheetsCopy, (copy, i) => {
        document.styleSheets[i] = copy;
      });
    }

    // 2.
    for (let i = 0; i < styleSheetsCount; i++) {
      document.styleSheets[i].disabled = false;
    }

    const customStyles = {};
    _.forEach(paper.svg.getElementsByTagName('*'), (elem, idx) => {
      const computedStyle = window.getComputedStyle(elem, null);
      const defaultComputedStyle = defaultComputedStyles[idx];
      const customStyle = {};

      _.forEach(computedStyle, (property) => {
        // Store only those that differ from the default styles applied by the browser.
        if (property !== 'width' && property !== 'height' &&
          computedStyle[property] !== defaultComputedStyle[property]) {
          customStyle[property] = computedStyle[property];
        }
      });
      customStyles[idx] = customStyle;
    });

    // 3.
    _.forEach(svgClone.getElementsByTagName('*'), (elem, idx) => {
      _.assign(elem.style, customStyles[idx]);
    });

    // Remove redundant 'onhover' elements
    _.forEach(
      svgClone.querySelectorAll('.connection-wrap,.marker-vertices,.link-tools,.marker-arrowheads'),
      (elem) => { elem.parentNode.removeChild(elem); });

    let svgString = '';
    try {
      const serializer = new XMLSerializer();
      svgString = serializer.serializeToString(svgClone);
    } catch (err) {
      return svgString;
    }

    return svgString;
  }
}
