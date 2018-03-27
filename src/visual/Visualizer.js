import _ from 'lodash';
import joint, { V } from 'jointjs';

import Workflow from '../model/Workflow';
import Declaration from '../model/Declaration';
import Port from '../model/Port';
import Paper from './Paper';
import VisualLink from './VisualLink';
import VisualStep from './VisualStep';
import VisualGroup from './VisualGroup';
import VisualWorkflow from './VisualWorkflow';
import VisualDeclaration from './VisualDeclaration';

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

function createVisual(opts) {
  if (opts.step instanceof Workflow) {
    return new VisualWorkflow(opts);
  } else if (!_.isUndefined(opts.step.type)) {
    return new VisualGroup(opts);
  }
  return new VisualStep(opts);
}

function getDescendants(cell, currDepth) {
  const embeds = cell.getEmbeddedCells();
  let best = { cell, currDepth };
  _.forEach(embeds, (child) => {
    const chBest = getDescendants(child, currDepth + 1);
    if (chBest.currDepth > best.currDepth) {
      best = chBest;
    }
  });
  return best;
}

function getHighestDescendant(cell) {
  return getDescendants(cell, 0).cell;
}

function createSubstituteCells(graph) {
  const newCellsMap = graph.cloneCells(graph.getCells());

  const newCells = [];
  let cellIdx = 0;
  _.forEach(newCellsMap, (newCell, key) => {
    const cellProto = graph.getCell(key);
    if (newCell.isLink()) {
      const protoSrc = cellProto.getSourceElement();
      const protoDst = cellProto.getTargetElement();
      if (protoDst.isEmbeddedIn(protoSrc, { deep: true }) ||
          protoSrc.isEmbeddedIn(protoDst, { deep: true })) {
        return;
      }
      const source = newCellsMap[getHighestDescendant(protoSrc).id];
      const target = newCellsMap[getHighestDescendant(protoDst).id];
      newCell.get('source').id = source.id;
      newCell.get('target').id = target.id;
    } else {
      const bbox = cellProto.getBBox();
      newCell.set('size', {
        width: bbox.width,
        height: bbox.height,
      });
    }
    newCells[cellIdx] = newCell;
    cellIdx += 1;
    newCell.proto = cellProto;
  });

  const gr = new joint.dia.Graph();
  gr.addCells(newCells);
  return gr;
}

function generateChildName(step) {
  let parentName = null;
  if (step.parent) {
    parentName = generateChildName(step.parent);
  }
  return parentName ? `${parentName}_${step.name}` : step.name;
}

class VisualWorkflowView extends joint.dia.ElementView {
  pointerdown(evt, x, y) {
    if (evt.target.getAttribute('magnet') && evt.which === 1 && evt.shiftKey) {
      const port = evt.target.getAttribute('port');
      const isIn = evt.target.getAttribute('port-group') === 'in';
      this.model.togglePort(isIn, port);
      this._dx = x;
      this._dy = y;
      evt.stopPropagation();
    } else {
      super.pointerdown(evt, x, y);
    }
  }
}

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
   * @param {boolean} readOnly - specify the read only access mode
   */
  constructor(element, readOnly = false) {
    const graph = new joint.dia.Graph();

    if (!(element instanceof Element)) {
      element = document.getElementById(element);
    }

    this._readOnly = readOnly;

    const paper = new Paper({
      el: element,
      width: element.offsetWidth,
      height: element.offsetHeight,
      model: graph,
      defaultLink: new VisualLink(),
      elementView: VisualWorkflowView,
      interactive: val => !this._elementsPanning && (!this._readOnly || !(val.model instanceof VisualLink)),
      clickThreshold: 1,
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

    this._dragStartPosition = null;
    this._elementsPanning = false;

    this._handlePanning();
    this._handleSelection();

    this._selectionEnabled = true;
    this._graph = graph;
    this._children = {};
    this._declarations = {};
    this._timer = null;
    this._step = null;
    this.clear();

    const validateMagnet = this.paper.options.validateMagnet;
    this.paper.options.validateMagnet = (cellView, magnet) => {
      if (this._readOnly) {
        return false;
      }

      const args = [cellView, magnet];
      return validateMagnet.apply(this.paper, args);
    };

    const validateConnection = this.paper.options.validateConnection;
    this.paper.options.validateConnection = (cellViewS, magnetS, cellViewT, magnetT, end, linkView) => {
      if (this._readOnly) {
        return false;
      }

      if (this._isChildSubWorkflow(cellViewS.model.step)) return false;
      if (this._isChildSubWorkflow(cellViewT.model.step)) return false;

      const args = [cellViewS, magnetS, cellViewT, magnetT, end, linkView];

      if (!validateConnection.apply(this.paper, args)) {
        return false;
      }

      const source = cellViewS.model;
      const target = cellViewT.model;

      const sourceIsAncestor = target.isEmbeddedIn(source, { deep: true });
      const targetIsAncestor = source.isEmbeddedIn(target, { deep: true });
      const sourcePortIsInput = magnetS.getAttribute('port-group') === 'in';
      const targetPortIsInput = magnetT.getAttribute('port-group') === 'in';

      // one may only link step's input if it is an ancestor
      // and it is connected to descendants input
      if (sourcePortIsInput && (!sourceIsAncestor || !targetPortIsInput)) {
        return false;
      }

      // output port may only be a target port if the source port
      // is the target port of a descendant
      if (!targetPortIsInput && (!targetIsAncestor || sourcePortIsInput)) {
        return false;
      }

      // one may not connect ancestor's/descendant's output
      // with descendant's/ancestor's input
      if ((sourceIsAncestor || targetIsAncestor) && !sourcePortIsInput && targetPortIsInput) {
        return false;
      }

      const targetStep = target.step;
      const targetPortName = magnetT.attributes.port.value;
      const targetGroup = targetPortIsInput ? targetStep.i : targetStep.o;
      return _.size(targetGroup[targetPortName].inputs) === 0;
    };

    graph.on('change:position', (cell) => {
      let parentId = cell.get('parent');
      while (parentId) {
        const parent = graph.getCell(parentId);
        parent.fit();
        parentId = parent.get('parent');
      }
    });
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
    this._declarations = {};
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
    this._update();// call update once more to invoke fitEmbeds
    this.zoom.fitToPage({ padding: 10, maxScale: 1 });
    this._timer = setInterval(() => this._update(), 30);

    this._listenLinks();
  }

  /**
   * Layout the contents automatically.
   */
  layout() {
    const newCells = createSubstituteCells(this._graph);
    const settings = {
      marginX: 100,
      marginY: 10,
      rankSep: 100,
      nodeSep: 80,
      rankDir: 'LR',
      setLinkVertices: false,
      resizeClusters: true,
      setPosition: (element, glNode) => {
        element.proto.set('position', {
          x: glNode.x - glNode.width / 2,
          y: glNode.y - glNode.height / 2 });
      }, // setVertices is ignored
    };
    joint.layout.DirectedGraph.layout(newCells, settings);
  }

  /**
   * Toggles ports on a diagram depending on the onlyTopLevel flag value
   *
   * @param {boolean} onlyTopLevel - if true applies changes only to the top level step attached
   * @param {boolean}[value] - optional value to set
   */
  togglePorts(onlyTopLevel, value) {
    const groupToEdit = onlyTopLevel ? [this._children[generateChildName(this._step)]] : this._children;
    _.forEach(groupToEdit, (child) => {
      _.forOwn(child.step.i, (port, name) => child.togglePort(true, name, value));
      _.forOwn(child.step.o, (port, name) => child.togglePort(false, name, value));
    });
  }

  get _connectionProcessors() {
    return {
      declarationToDeclaration: (conn, visDeclaration, links, cellsToAdd) => {
        const declarations = this._declarations;
        const targetName = conn.to.name;
        if (declarations[targetName] &&
          _.find(links, link => link.conn === conn) === undefined &&
          declarations[targetName].isPortEnabled(conn.to.step.hasInputPort(conn.to), conn.to.name)) {
          const isReadOnly = this._readOnly || this._isChildSubWorkflow(visDeclaration.declaration.step) ||
            this._isChildSubWorkflow(declarations[targetName].step);
          cellsToAdd[cellsToAdd.length] = new VisualLink({
            source: {
              id: visDeclaration.id,
            },
            target: {
              id: declarations[targetName].id,
            },
            conn,
          }, isReadOnly);
        }
      },
      declarationToPort: (conn, visDeclaration, links, cellsToAdd) => {
        const children = this._children;
        const targetName = generateChildName(conn.to.step);
        if (children[targetName] &&
          _.find(links, link => link.conn === conn) === undefined &&
          children[targetName].isPortEnabled(conn.to.step.hasInputPort(conn.to), conn.to.name)) {
          const isReadOnly = this._readOnly || this._isChildSubWorkflow(visDeclaration.declaration.step) ||
            this._isChildSubWorkflow(children[targetName].step);
          cellsToAdd[cellsToAdd.length] = new VisualLink({
            source: {
              id: visDeclaration.id,
            },
            target: {
              id: children[targetName].id,
              port: conn.to.name,
            },
            conn,
          }, isReadOnly);
        }
      },
      portToDeclaration: (conn, port, source, links, cellsToAdd) => {
        const declarations = this._declarations;
        const targetDeclarationName = conn.to.name;
        if (declarations[targetDeclarationName] &&
          _.find(links, link => link.conn === conn) === undefined &&
          declarations[targetDeclarationName].isPortEnabled()) {
          const isReadOnly = this._readOnly || this._isChildSubWorkflow(source.step) ||
            this._isChildSubWorkflow(declarations[targetDeclarationName].declaration.step);
          cellsToAdd[cellsToAdd.length] = new VisualLink({
            source: {
              id: source.id,
              port: port.name,
            },
            target: {
              id: declarations[targetDeclarationName].id,
            },
            conn,
          }, isReadOnly);
        }
      },
      portToPort: (conn, port, source, links, cellsToAdd) => {
        const children = this._children;
        const targetName = generateChildName(conn.to.step);
        if (children[targetName] &&
          _.find(links, link => link.conn === conn) === undefined &&
          children[targetName].isPortEnabled(conn.to.step.hasInputPort(conn.to), conn.to.name)) {
          const isReadOnly = this._readOnly || this._isChildSubWorkflow(source.step) ||
            this._isChildSubWorkflow(children[targetName].step);
          cellsToAdd[cellsToAdd.length] = new VisualLink({
            source: {
              id: source.id,
              port: port.name,
            },
            target: {
              id: children[targetName].id,
              port: conn.to.name,
            },
            conn,
          }, isReadOnly);
        }
      },
    };
  }

  _loopPorts(ports, source, visDeclarations, cellsToAdd, isEnabled) {
    const links = this._graph.getConnectedLinks(source);
    _.forEach(ports, (port) => {
      if (!isEnabled(port.name)) {
        return;
      }
      _.forEach(port.outputs, (conn) => {
        if (conn.to instanceof Declaration) {
          this._connectionProcessors
            .portToDeclaration(conn, port, source, links, cellsToAdd);
        } else if (conn.to instanceof Port) {
          this._connectionProcessors
            .portToPort(conn, port, source, links, cellsToAdd);
        }
      });
    });
  }

  _loopDeclarations(visDeclarations, cellsToAdd) {
    _.forEach(visDeclarations, (visDeclaration) => {
      const links = this._graph.getConnectedLinks(visDeclaration);
      _.forEach(visDeclaration.declaration.outputs, (conn) => {
        if (conn.to instanceof Declaration) {
          this._connectionProcessors
            .declarationToDeclaration(conn, visDeclaration, links, cellsToAdd);
        } else if (conn.to instanceof Port) {
          this._connectionProcessors
            .declarationToPort(conn, visDeclaration, links, cellsToAdd);
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

    const declarations = this._declarations;

    // handle the renames
    const pickBy = _.pickBy || _.pick; // be prepared for legacy lodash 3.10.1
    const renamed = pickBy(children, (vStep, name) => name !== generateChildName(vStep.step));

    _.forEach(renamed, (vStep, oldName) => {
      delete children[oldName];
      children[generateChildName(vStep.step)] = vStep;
    });

    const toRemove = [];
    const findChildInModel = (visChild, name, modelChild) => {
      const modelChildName = generateChildName(modelChild);
      if (modelChildName === name) {
        return true;
      }
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
      delete children[generateChildName(child.step)];
    });

    const cellsToAdd = [];
    const updateOrCreateVisualSteps = (innerStep, parent = null) => {
      const name = generateChildName(innerStep);
      let visChild = children[name];
      if (!visChild) {
        const opts = this.zoom.fromWidgetToLocal({
          x: this.paper.el.offsetWidth / 2,
          y: this.paper.el.offsetHeight / 2,
        });
        opts.step = innerStep;
        visChild = createVisual(opts);
        children[name] = visChild;
        cellsToAdd[cellsToAdd.length] = visChild;
        if (_.size(opts.step.ownDeclarations)) {
          _.forEach(opts.step.ownDeclarations, (declaration) => {
            let visDeclaration = declarations[declaration.name];
            if (!visDeclaration) {
              visDeclaration = new VisualDeclaration({ declaration, x: opts.x, y: opts.y });
              cellsToAdd[cellsToAdd.length] = visDeclaration;
              declarations[declaration.name] = visDeclaration;
              visChild.embed(visDeclaration);
              visChild.fit();
              visChild.update();
            }
          });
        }
        if (parent) {
          parent.embed(visChild);
          parent.fit();
          parent.update();
        }
      } else {
        // it is essential to update links before the step!
        const links = this._graph.getConnectedLinks(visChild);
        _.forEach(links, (link) => {
          link.refresh();
        });
        visChild.update();
      }

      const innerChildren = innerStep.children;
      _.forEach(innerChildren, (child) => {
        updateOrCreateVisualSteps(child, visChild);
      });
    };

    updateOrCreateVisualSteps(step);

    _.forEach(children, (child) => {
      this._loopPorts(child.step.o, child, declarations, cellsToAdd, portName => child.isPortEnabled(false, portName));
      this._loopPorts(child.step.i, child, declarations, cellsToAdd, portName => child.isPortEnabled(true, portName));
    });

    this._loopDeclarations(declarations, cellsToAdd);

    this._graph.addCells(cellsToAdd);
  }

  _listenLinks() {
    const graph = this._graph;
    graph.on('remove', (cell, child, opts) => {
      if (this._readOnly) {
        return;
      }

      if (cell instanceof VisualLink && cell.conn && cell.conn.isValid() && !opts.silent) {
        cell.conn.unbind();
      }
    }, this);

    graph.on('change:source change:target', (link) => {
      if (this._readOnly) {
        return;
      }

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

        const srcPortName = link.get('source').port;
        const sourcePort = this.paper.findViewByModel(link).sourceMagnet.getAttribute('port-group') === 'in' ?
          sourceChild.i[srcPortName] :
          sourceChild.o[srcPortName];

        const dstPortName = link.get('target').port;
        const targetPort = this.paper.findViewByModel(link).targetMagnet.getAttribute('port-group') === 'in' ?
          targetChild.i[dstPortName] :
          targetChild.o[dstPortName];
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

  /**
   * Toggles elements panning mode
   * (If it's turned on then you can pan whole Paper dragging on any element)
   * */
  togglePanningMode() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
    if (this._elementsPanning) {
      this._turnOffElementsPanning();
      if (this._readOnlyDump && this._readOnlyDump.length) {
        this._readOnly = this._readOnlyDump[0];
      }
    } else {
      this._turnOnElementsPanning();
      if (!this._readOnly) {
        this._readOnlyDump = [this._readOnly];
        this._readOnly = true;
      }
    }
    this._timer = setInterval(() => this._update(), 30);
  }

  _turnOffElementsPanning() {
    const paper = this.paper;
    paper.off('cell:pointerdown', this._setCellDragStartPosition);
    paper.off('cell:pointerup', this._clearDragStartPosition);
    _.forEach(this._graph.getCells(), (cell) => {
      V(this.paper.findViewByModel(cell).el).toggleClass('pannable', false);
    });
    this._elementsPanning = false;
  }

  _turnOnElementsPanning() {
    const paper = this.paper;
    paper.on('cell:pointerdown', this._setCellDragStartPosition, this);
    paper.on('cell:pointerup', this._clearDragStartPosition, this);
    _.forEach(this._graph.getCells(), (cell) => {
      V(this.paper.findViewByModel(cell).el).toggleClass('pannable', true);
    });
    this._elementsPanning = true;
  }

  _setCellDragStartPosition(cellView, event, x, y) {
    this.paper.$el.find('svg').toggleClass('is-panning', true);
    this._dragStartPosition = { x, y };
  }

  _clearDragStartPosition() {
    this.paper.$el.find('svg').toggleClass('is-panning', false);
    this._dragStartPosition = null;
  }

  _handlePanning() {
    const paper = this.paper;
    paper.$el.find('svg').toggleClass('pannable', true);
    paper.on('blank:pointerdown', (event, x, y) => {
      this._dragStartPosition = { x, y };
      paper.$el.find('svg').toggleClass('is-panning', true);
    });
    if (this._elementsPanning) {
      paper.on('cell:pointerdown', this._setCellDragStartPosition, this);
      paper.on('cell:pointerup', this._clearDragStartPosition, this);
    }
    paper.on('blank:pointerup', () => {
      this._clearDragStartPosition();
    });
    paper.el.onmousemove = (event) => {
      const currScale = this.zoom.getCurrentScale();
      if (this._dragStartPosition) {
        paper.setOrigin(
          event.offsetX - (this._dragStartPosition.x * currScale),
          event.offsetY - (this._dragStartPosition.y * currScale));
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

  _isChildSubWorkflow(step) {
    if (!step || !step.parent) return false;
    if (step.parent instanceof Workflow && step.parent.name !== this._step.name) return true;
    return this._isChildSubWorkflow(step.parent);
  }
}
