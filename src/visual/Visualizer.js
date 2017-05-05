import _ from 'lodash';
import joint, { V } from 'jointjs';

import Paper from './Paper';
import VisualLink from './VisualLink';
import VisualStep from './VisualStep';
import VisualGroup from './VisualGroup';

import Group from '../model/Group';

import Zoom from './Zoom';

// Code below is an official fix for Chrome 57 from JointJS
V.matrixToTransformString = (matrix) => {
  matrix = matrix || true;
  return `matrix(${[matrix.a || 1, matrix.b || 0, matrix.c || 0, matrix.d || 1, matrix.e || 0, matrix.f || 0]})`;
};

V.prototype.transform = function fun(matrix, opt) {
  const node = this.node;

  if (V.isUndefined(matrix)) {
    return (node.parentNode)
      ? this.getTransformToElement(node.parentNode)
      : node.getScreenCTM();
  }

  if (opt && opt.absolute) {
    return this.attr('transform', V.matrixToTransformString(matrix));
  }

  const svgTransform = V.createSVGTransform(matrix);
  node.transform.baseVal.appendItem(svgTransform);
  return this;
};

/**
 * Class that allows to work with graphical pipeline representation.
 *
 * @example
 * const flow = new Workflow(...);
 * const diagram = new Visualizer(document.getElementById('diagram'));
 * diagram.attachTo(flow);
 */
export default class Visualizer {
  /**
   * Create a pipeline visualizer.
   * @param {Element|string} element - DOM Element or its identifier to embed the visualizer into.
   */
  constructor(element) {
    const graph = new joint.dia.Graph();

    if (!(element instanceof Element)) {
      element = document.getElementById(element);
    }

    const paper = new Paper({
      el: element,
      width: element.offsetWidth,
      height: element.offsetHeight,
      model: graph,
      defaultLink: new VisualLink(),
    });

    /**
     * JointJS paper object.
     * @type {joint.dia.Paper}
     */
    this.paper = paper;
    /**
     * Array of currently selected states.
     * @type {Array}
     */
    this.selection = [];

    /** Public member to access zoom object
     * @type {Zoom}
     */
    this.zoom = new Zoom(paper);
    this._handlePanning();
    this._handleSelection();

    this._selectionEnabled = true;
    this._graph = graph;
    this._children = {};
    this._timer = null;
    this._step = null;
    this.clear();

    const validateConnection = this.paper.options.validateConnection;

    this.paper.options.validateConnection = (cellViewS, magnetS, cellViewT, magnetT, end, linkView) => {
      const args = [cellViewS, magnetS, cellViewT, magnetT, end, linkView];

      if (validateConnection.apply(this.paper, args)) {
        const targetPortName = magnetT.attributes.port.value;
        const targetStep = cellViewT.model.step;

        return _.size(targetStep.i[targetPortName].inputs) === 0;
      }
      return false;
    };
  }

  /**
   * Clear the contents of component.
   */
  clear() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
    this._graph.off('remove', null, this);
    this._graph.off('add', null, this);
    this._graph.clear();
    this._children = {};
    this._step = null;
    this.selection = [];
  }

  /**
   * Enables selection.
   */
  enableSelection() {
    this._selectionEnabled = true;
  }

  /**
   * Disables selection
   */
  disableSelection() {
    this._selectionEnabled = false;
    this._clearSelection();
  }

  /**
   * Attaches visualizer component to specific step.
   * All step's children are rendered upon attachment.
   * @param step
   */
  attachTo(step) {
    this.clear();
    // add all step children to the diagram
    this._step = step;
    this._update();
    this.layout();
    this.zoom.fitToPage({ padding: 10, maxScale: 1 });
    this._timer = setInterval(() => this._update(), 30);

    this._listenLinks();
  }

  /**
   * Layout the contents automatically.
   */
  layout() {
    const settings = {
      marginX: 100,
      marginY: 10,
      rankSep: 230,
      nodeSep: 80,
      rankDir: 'LR',
      setLinkVertices: false,
      resizeClusters: false,
    };

    joint.layout.DirectedGraph.layout(this._graph, settings);
  }

  _loopPorts(ports, source) {
    const children = this._children;
    const links = this._graph.getConnectedLinks(source);
    _.forEach(ports, (port) => {
      _.forEach(port.outputs, (conn) => {
        const srcIsGroup = conn.from.step instanceof Group;
        const dstIsGroup = conn.to.step instanceof Group;

        const targetName = conn.to.step.name;
        if (children[targetName] &&
          _.find(links, link => link.conn === conn) === undefined &&
          !srcIsGroup &&
          !dstIsGroup) {
          const link = new VisualLink(
            source.id, port.name, children[targetName].id, conn.to.name, conn);
          link.addTo(this._graph);
        }
      });
    });
  }

  _update() {
    const step = this._step;
    if (!step) {
      return;
    }
    // validate call <-> step correspondence
    const children = this._children;

    // handle the renames
    const pickBy = _.pickBy || _.pick; // be prepared for legacy lodash 3.10.1
    const renamed = pickBy(children, (vStep, name) => name !== vStep.step.name);
    _.forEach(renamed, (vStep, oldName) => {
      delete children[oldName];
      children[vStep.step.name] = vStep;
    });

    const toRemove = [];
    const findChildInModel = (visChild, name, modelChild) => {
      const modelChildren = modelChild.children;

      if (_.has(modelChildren, name)) {
        return true;
      }

      let res = false;
      _.forEach(modelChildren, (child) => {
        res = res || findChildInModel(visChild, name, child);
      });

      return res;
    };

    _.forEach(children, (visChild, name) => {
      if (!findChildInModel(visChild, name, step)) {
        // remove visual step from graph
        toRemove[toRemove.length] = visChild;
      }
    });

    this._graph.removeCells(toRemove);
    _.forEach(toRemove, (child) => {
      const idx = _.indexOf(this.selection, child);
      if (idx !== -1) {
        this.selection.splice(idx, 1);
      }
      delete children[child.step.name];
    });

    const updateOrCreateVisualSteps = (innerStep, parent = null) => {
      const innerChildren = innerStep.children;
      _.forEach(innerChildren, (child, name) => {
        let visChild = children[name];
        const opts = this.zoom.fromWidgetToLocal({
          x: this.paper.el.offsetWidth / 2,
          y: this.paper.el.offsetHeight / 2,
        });
        opts.step = child;
        if (!visChild) {
          visChild = _.isUndefined(child.type) ? new VisualStep(opts) : new VisualGroup(opts);

          children[name] = visChild;

          this._graph.addCell(visChild);
          if (parent) {
            parent.embed(visChild);
          }
        } else {
          // it is essential to update links before the step!
          const links = this._graph.getConnectedLinks(visChild);
          _.forEach(links, (link) => {
            link.refresh();
          });
          visChild.update();
        }

        if (child.children) {
          updateOrCreateVisualSteps(child, visChild);
        }
      });
    };

    updateOrCreateVisualSteps(step);

    _.forEach(children, (child) => {
      this._loopPorts(child.step.o, child);
      this._loopPorts(child.step.i, child);
    });
  }

  _listenLinks() {
    const graph = this._graph;
    graph.on('remove', (cell) => {
      if (cell instanceof VisualLink && cell.conn && cell.conn.isValid()) {
        cell.conn.unbind();
      }
    }, this);

    graph.on('change:source change:target', (link) => {
      if (link instanceof VisualLink) {
        const source = graph.getCell(link.get('source').id);
        const target = graph.getCell(link.get('target').id);
        if (!(source instanceof VisualStep) || !(target instanceof VisualStep)) {
          return;
        }

        if (!source.step || !target.step) {
          return;
        }

        const sourceChild = source.step;
        const targetChild = target.step;
        if (link.conn) {
          link.conn.unbind();
        }
        if (!targetChild || !sourceChild) {
          return;
        }
        const sourcePort = sourceChild.o[link.get('source').port];
        const targetPort = targetChild.i[link.get('target').port];
        link.conn = targetPort.bind(sourcePort);
      }
    }, this);
  }

  _clearSelection() {
    _.forEach(this.selection, (elem) => {
      V(this.paper.findViewByModel(elem).el).toggleClass('selected', false);
    });
    this.selection = [];
  }

  _handleSelection() {
    this.paper.on('blank:pointerclick', () => {
      if (!this._selectionEnabled) {
        return;
      }
      this._clearSelection();
    });
    this.paper.on('cell:pointerclick', (view, evt) => {
      if (!this._selectionEnabled) {
        return;
      }
      const model = view.model;
      if (model instanceof VisualStep) {
        if (evt.shiftKey) { // if shift key is pressed - group selection
          const idx = _.indexOf(this.selection, model);
          // toggle the selection of current element
          if (idx !== -1) {
            this.selection.splice(idx, 1);
          } else {
            this.selection.push(model);
          }
        } else {
          // clear selection and mark element as the only selected
          this._clearSelection();
          this.selection.push(model);
        }

        view.$el.toggleClass('selected');
      }
    });
  }

  _handlePanning() {
    let dragStartPosition;
    const paper = this.paper;
    paper.on('blank:pointerdown', (event, x, y) => {
      dragStartPosition = { x, y };
    });
    paper.on('blank:pointerup', () => {
      dragStartPosition = null;
    });
    paper.el.onmousemove = (event) => {
      const currScale = this.zoom.getCurrentScale();
      if (dragStartPosition) {
        paper.setOrigin(
          event.offsetX - (dragStartPosition.x * currScale),
          event.offsetY - (dragStartPosition.y * currScale));
      }
    };

    window.onresize = () => {
      const elem = paper.el;
      if (!elem) {
        return;
      }
      paper.setDimensions(elem.offsetWidth, elem.offsetHeight);
    };
  }
}
