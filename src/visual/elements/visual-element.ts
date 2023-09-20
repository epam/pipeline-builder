import * as dagre from 'dagre';
import { Graph as GraphLibGraph } from 'graphlib';
import { dia, g, shapes } from 'jointjs';
import defaultsDeep from '../utilities/defaults-deep';
import getElementLinks from '../utilities/get-element-links';
import { getParameterIdentifier } from '../utilities/get-parameter-identifier';
import {
  IParameter, isScatterIterator, IWdlEntity, TActionTypes, WdlEvent,
} from '../../model/types';
import {
  Align,
  ICreateConnectionOptions,
  IVisualConnection,
  IVisualElement,
  PortShapes,
  RankDir,
  Ranker,
  VisualConnectionConstructor,
  VisualDefaultOptions,
  VisualElementOptions,
  VisualElementShapeConstraints,
} from '../types';
import Parameter from '../../model/parameter';
import {
  BOLD,
  DEFAULT_STYLE,
  getStyle,
  getSVGText,
  measureSVGText,
  RichText,
  SMALL,
  SVGText,
  svgTextToString,
} from '../utilities/svg-rich-text';
import getPortConfigurationOfShape from './utilities/get-port-configuration-of-shape';
import createPortsGroup from './utilities/create-ports-group';
import booleanProp from './utilities/boolean-prop';

const defaultStyle = getStyle(DEFAULT_STYLE);
const smallStyle = getStyle(SMALL);
const boldStyle = getStyle(DEFAULT_STYLE, BOLD);

abstract class VisualElement<T extends TActionTypes = TActionTypes>
  extends shapes.standard.Rectangle implements IVisualElement {
  private _portSize: number;

  private _minimumSize: dia.Size;

  private _nameSize: dia.Size;

  private _verticalPadding: number;

  private _horizontalPadding: number;

  private _rankSeparation: number;

  private _nodeSeparation: number;

  private _edgeSeparation: number;

  private _ranker: Ranker;

  private _align: Align;

  private _rankDir: RankDir;

  private _fitRequested: boolean;

  private _portsSizes: Map<string, dia.Size>;

  static defaultOptions: VisualDefaultOptions = {
    layout: {
      portSize: 15.0,
      verticalPadding: 5.0,
      horizontalPadding: 5.0,
      rankSeparation: 20.0,
      edgeSeparation: 20.0,
      nodeSeparation: 20.0,
      rankDir: RankDir.LR,
      align: undefined,
      ranker: Ranker.networkSimplex,
    },
  };

  static VisualConnectionConstructor: VisualConnectionConstructor | undefined;

  static textDefaultStyle = defaultStyle;

  static textBoldStyle = boldStyle;

  static textSmallStyle = smallStyle;

  static getParameterText(parameter: IParameter): SVGText {
    const parts: RichText[] = [];
    if (parameter.type) {
      if (isScatterIterator(parameter)) {
        parts.push({
          text: parameter.iteratorType.toString(),
          style: getStyle(VisualElement.textSmallStyle, { parameterType: true }),
        });
      } else {
        parts.push({
          text: parameter.type,
          style: getStyle(VisualElement.textSmallStyle, { parameterType: true }),
        });
      }
    }
    parts.push({
      text: parameter.name,
      style: getStyle(VisualElement.textDefaultStyle, { parameterName: true }),
    });
    return getSVGText(...parts);
  }

  protected constructor(options: VisualElementOptions<T>) {
    const {
      attrs = {},
      ...rest
    } = options || {};
    const {
      layout = {},
    } = options;
    const {
      padding = 5.0,
      verticalPadding = padding,
    } = layout;
    const mergedAttrs = defaultsDeep(
      {
        label: {
          refY: verticalPadding,
        },
      },
      attrs,
      {
        body: {
          strokeWidth: 1,
        },
        label: {
          textVerticalAnchor: 'bottom',
          textAnchor: 'middle',
          fontSize: 14,
          fill: '#333333',
        },
      },
    );
    const markup = [{
      tagName: 'path',
      selector: 'body',
      className: 'visual-element-body',
    }, {
      tagName: 'text',
      selector: 'label',
      className: 'visual-element-label',
    }];
    super({
      size: {
        width: 1,
        height: 1,
      },
      ports: {
        groups: {
          inputs: createPortsGroup('left'),
          outputs: createPortsGroup('right'),
        },
      },
      attrs: mergedAttrs,
      markup,
      ...rest,
    });
    this.setOptions(options);
  }

  get portSize(): number {
    return this._portSize;
  }

  get fitRequested(): boolean {
    return this._fitRequested;
  }

  /**
   * @returns {joint.d.Size}
   */
  get minimumSize(): dia.Size {
    return this._minimumSize;
  }

  get verticalPadding(): number {
    return this._nameSize.height
      ? (2.0 * this._verticalPadding + this._nameSize.height)
      : this._verticalPadding;
  }

  get horizontalPadding(): number {
    return this._horizontalPadding;
  }

  get rankSeparation(): number {
    return this._rankSeparation;
  }

  get nodeSeparation(): number {
    return this._nodeSeparation;
  }

  get edgeSeparation(): number {
    return this._edgeSeparation;
  }

  get rankDir(): RankDir {
    return this._rankDir;
  }

  get align(): Align {
    return this._align;
  }

  get ranker(): Ranker {
    return this._ranker;
  }

  get padding(): dia.PaddingJSON {
    return {
      left: this.horizontalPadding,
      right: this.horizontalPadding,
      top: this.verticalPadding,
      bottom: this.verticalPadding,
    };
  }

  get selected(): boolean {
    return !!this.get('selected');
  }

  set selected(selected: boolean) {
    if (this.selected !== selected) {
      this.set('selected', !!selected);
    }
  }

  get visible(): boolean {
    return this.getVisible();
  }

  set visible(visible) {
    this.set('hidden', !visible);
  }

  get valid(): boolean {
    return booleanProp(this.get('valid'), true);
  }

  set valid(valid) {
    this.set('valid', valid);
  }

  get containsIssues(): boolean {
    return booleanProp(this.get('containsIssues'), false);
  }

  set containsIssues(containsIssues) {
    this.set('containsIssues', containsIssues);
  }

  get level(): number {
    const parent = this.getParentCell();
    if (parent instanceof VisualElement) {
      return parent.level + 1;
    }
    return 0;
  }

  get elementName(): SVGText | undefined {
    return this.get('elementName');
  }

  get entity(): IWdlEntity<T> | undefined {
    return this.get('entity');
  }

  private set entity(entity: IWdlEntity<T> | undefined) {
    this.set('entity', entity);
  }

  abstract getChildrenElements(): IVisualElement[];
  abstract getChildrenElements(recursive: boolean): IVisualElement[];

  protected getVisible(): boolean {
    const parent = this.getParentCell();
    return !(
      booleanProp(this.get('hidden'), false)
      || (parent instanceof VisualElement && !parent.visible)
    );
  }

  requestFit(): void {
    this._fitRequested = true;
    const parent = this.getParentCell();
    if (parent instanceof VisualElement) {
      parent.requestFit();
    }
  }

  protected shouldHandleParameter(parameter: IParameter): boolean {
    return this.entity === parameter.parent && !!parameter.parent;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected onModelChange(event: WdlEvent, sender: IWdlEntity, ...args: any[]) {
    const { entity } = this;
    if (sender === entity) {
      switch (event) {
        case WdlEvent.nameChanged:
        case WdlEvent.typeChanged:
          this.updateElementName();
          break;
        case WdlEvent.parametersChanged:
          this.updateParameters();
          break;
        default:
          break;
      }
    }
    if (
      sender instanceof Parameter
      && this.shouldHandleParameter(sender)
    ) {
      switch (event) {
        case WdlEvent.nameChanged:
        case WdlEvent.typeChanged:
          this.updateParameterName(sender);
          break;
        case WdlEvent.parameterBind:
        case WdlEvent.parameterUnbind:
          if (args[0] && args[0].source && args[0].target) {
            const {
              source,
              target,
            } = args[0];
            if (this.shouldHandleParameter(source)) {
              this.updateParameterConnected(source);
            }
            if (this.shouldHandleParameter(target)) {
              this.updateParameterConnected(target);
            }
          }
          break;
        default:
          break;
      }
    }
  }

  portPropSafe(portId: string, path: dia.Path): dia.Element;
  portPropSafe<P>(portId: string, path: dia.Path, value: P): dia.Element;
  portPropSafe<P>(portId: string, path: dia.Path, value?: P): dia.Element {
    if (this.hasPort(portId)) {
      if (value !== undefined) {
        return this.portProp(portId, path, value);
      }
      return this.portProp(portId, path);
    }
    return this;
  }

  protected updateValidationStatus() {
    let valid = this.entity.entityValid;
    let containsIssues = this.entity.entityContainsIssues;
    [...this.getInputPorts(), ...this.getOutputPorts()]
      .forEach((parameter) => {
        valid = valid && parameter.entityValid;
        containsIssues = containsIssues && parameter.containsIssues;
        this.portPropSafe(
          getParameterIdentifier(parameter),
          'valid',
          parameter.entityValid,
        );
        this.portPropSafe(
          getParameterIdentifier(parameter),
          'containsIssues',
          parameter.entityContainsIssues,
        );
      });
    this.valid = valid;
    this.containsIssues = containsIssues;
  }

  onValidation(event: WdlEvent, sender: IWdlEntity) {
    if (
      sender === this.entity
      || (
        sender.parent === this.entity && sender instanceof Parameter
      )
    ) {
      this.updateValidationStatus();
    }
  }

  /**
   * @param {VisualElement.Options} options
   */
  setOptions(options: VisualElementOptions<T>) {
    const {
      layout,
      entity,
    } = defaultsDeep(
      {
        layout: {},
      },
      options,
      VisualElement.defaultOptions,
    );
    if (!entity) {
      throw new Error('VisualElement should be initialized with an entity');
    }
    const {
      entity: previousEntity,
    } = this;
    if (previousEntity) {
      previousEntity.off(WdlEvent.nameChanged, this.onModelChange, this);
      previousEntity.off(WdlEvent.typeChanged, this.onModelChange, this);
      previousEntity.off(WdlEvent.parametersChanged, this.onModelChange, this);
      previousEntity.off(WdlEvent.parameterBind, this.onModelChange, this);
      previousEntity.off(WdlEvent.parameterUnbind, this.onModelChange, this);
      previousEntity.off(WdlEvent.validation, this.onValidation, this);
    }
    this.entity = entity;
    if (entity) {
      entity.on(WdlEvent.nameChanged, this.onModelChange, this);
      entity.on(WdlEvent.typeChanged, this.onModelChange, this);
      entity.on(WdlEvent.parametersChanged, this.onModelChange, this);
      entity.on(WdlEvent.parameterBind, this.onModelChange, this);
      entity.on(WdlEvent.parameterUnbind, this.onModelChange, this);
      entity.on(WdlEvent.validation, this.onValidation, this);
    }
    const {
      minimumSize = {},
      portSize = 10.0,
      padding = 5.0,
      verticalPadding = padding,
      horizontalPadding = padding,
      rankDir = 'LR',
      rankSeparation = 10.0,
      edgeSeparation = 10.0,
      nodeSeparation = 10.0,
      align,
      ranker = 'network-simplex',
    } = layout;
    const {
      width: minimumWidth = 0,
      height: minimumHeight = 0,
    } = minimumSize;
    this._minimumSize = {
      width: minimumWidth,
      height: minimumHeight,
    };
    this._nameSize = {
      width: 0,
      height: 0,
    };
    this._portsSizes = new Map();
    this._portSize = portSize;
    this._verticalPadding = verticalPadding;
    this._horizontalPadding = horizontalPadding;
    this._rankDir = rankDir;
    this._align = align;
    this._rankSeparation = rankSeparation;
    this._nodeSeparation = nodeSeparation;
    this._edgeSeparation = edgeSeparation;
    this._ranker = ranker;
    this.update();
    this.requestFit();
  }

  update() {
    this.updateElementName();
    this.updateParameters();
    this.updateValidationStatus();
  }

  updateParameters() {
    this.updateInputs();
    this.updateOutputs();
  }

  protected getElementName(): SVGText {
    const { entity } = this;
    if (entity) {
      const {
        name,
        alias,
        contextType: type,
      } = entity;
      if (name || type) {
        const parts: RichText[] = [];
        if (type) {
          parts.push({
            text: type,
            style: getStyle(VisualElement.textSmallStyle, { elementType: true }),
          });
        }
        if (name) {
          parts.push({
            text: name,
            style: getStyle(
              alias ? VisualElement.textDefaultStyle : VisualElement.textBoldStyle,
              { elementName: true },
            ),
          });
        }
        if (alias) {
          parts.push({
            text: 'as',
            style: getStyle(VisualElement.textSmallStyle, { elementAs: true }),
          });
          parts.push({
            text: alias,
            style: getStyle(VisualElement.textBoldStyle, { elementAlias: true }),
          });
        }
        return getSVGText(...parts);
      }
      return undefined;
    }
    return undefined;
  }

  protected abstract getInputPorts(): IParameter[];

  protected abstract getOutputPorts(): IParameter[];

  protected updateElementName(): void {
    const elementName = this.getElementName();
    this._nameSize = measureSVGText(elementName);
    this.set('elementName', elementName);
    this.ensureMinimumSize();
    this.requestFit();
  }

  /**
   * @param {IParameter} port
   * @param {string} group
   * @returns {{shape: PortShapes}}
   */
  // eslint-disable-next-line max-len
  // eslint-disable-next-line class-methods-use-this,no-unused-vars,@typescript-eslint/no-unused-vars
  getPortConfiguration(port: IParameter, group: string): {
    shape: PortShapes;
  } {
    return {
      shape: PortShapes.circle,
    };
  }

  protected updateParameterName(parameter: IParameter): SVGText | undefined {
    const id = getParameterIdentifier(parameter);
    try {
      const parameterName = VisualElement.getParameterText(parameter);
      this.portPropSafe(id, 'parameterName', parameterName);
      return parameterName;
    } catch (error) {
      console.warn(error.message);
      return undefined;
    }
  }

  protected updateParameterConnected(parameter: IParameter): void {
    this.portPropSafe(
      getParameterIdentifier(parameter),
      'attrs/portBody/connected',
      `${parameter.inboundConnections.length > 0 || parameter.outboundConnections.length > 0}`,
    );
  }

  protected getParameterProperty<P>(
    parameter: dia.Element.Port | IParameter,
    property: string,
  ): P {
    let id;
    if (Parameter.isIParameter(parameter)) {
      id = getParameterIdentifier(parameter);
    } else {
      id = parameter.id;
    }
    return this.portPropSafe(id, property) as P;
  }

  getParameterValid(port: dia.Element.Port): boolean;
  getParameterValid(parameter: IParameter): boolean;
  getParameterValid(parameter: dia.Element.Port | IParameter): boolean {
    return booleanProp(this.getParameterProperty<boolean>(
      parameter,
      'valid',
    ), true);
  }

  getParameterContainsIssues(port: dia.Element.Port): boolean;
  getParameterContainsIssues(parameter: IParameter): boolean;
  getParameterContainsIssues(parameter: dia.Element.Port | IParameter): boolean {
    return booleanProp(this.getParameterProperty<boolean>(
      parameter,
      'containsIssues',
    ), false);
  }

  getParameterName(port: dia.Element.Port): SVGText | undefined;
  getParameterName(parameter: IParameter): SVGText | undefined;
  getParameterName(parameter: dia.Element.Port | IParameter): SVGText | undefined {
    return this.getParameterProperty<SVGText | undefined>(
      parameter,
      'parameterName',
    );
  }

  /**
   * @param {string} group
   * @param {IParameter[]} ports
   */
  private updatePorts(group: string, ports: IParameter[]): void {
    const existingPorts = this.getGroupPorts(group);
    const ids = new Set(ports.map(getParameterIdentifier));
    const existingIds = new Set(existingPorts.map((port) => port.id));
    const portsToRemove = existingPorts.filter((port) => !ids.has(port.id));
    const portsToAdd = ports.filter((port) => !existingIds.has(getParameterIdentifier(port)));
    const portsToUpdate = ports.filter((port) => existingIds.has(getParameterIdentifier(port)));
    this.removePorts(portsToRemove);
    portsToUpdate.forEach((port) => {
      this.updateParameterName(port);
      this.updateParameterConnected(port);
    });
    portsToAdd.forEach((port) => {
      const {
        shape: portShape,
      } = this.getPortConfiguration(port, group);
      const {
        tagName,
        attributes = {},
      } = getPortConfigurationOfShape(portShape, this.portSize);
      const id = getParameterIdentifier(port);
      const parameterName = VisualElement.getParameterText(port);
      this.addPort({
        id,
        group,
        attrs: {
          portBody: {
            ...attributes,
          },
          label: {
            text: svgTextToString(parameterName),
          },
        },
        markup: [{
          tagName,
          selector: 'portBody',
        }],
      });
      this.updateParameterName(port);
      this.updateParameterConnected(port);
    });
    this._portsSizes.set(group, this.getParametersSize(ports));
    this.ensureMinimumSize();
    this.updateValidationStatus();
    this.requestFit();
  }

  private getParametersSize(parameters: IParameter[]): dia.Size {
    let portsWidth = 0;
    let portsHeight = 0;
    const margin = 2;
    parameters.forEach((parameter) => {
      const {
        width,
        height,
      } = measureSVGText(VisualElement.getParameterText(parameter));
      if (portsWidth < width + this.portSize / 2.0) {
        portsWidth = width + this.portSize / 2.0;
      }
      portsHeight += height + margin;
    });
    return {
      width: portsWidth,
      height: portsHeight,
    };
  }

  protected updateInputs(): void {
    this.updatePorts('inputs', this.getInputPorts());
  }

  protected updateOutputs(): void {
    this.updatePorts('outputs', this.getOutputPorts());
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createConnections(options?: ICreateConnectionOptions): IVisualConnection[] {
    const links = [];
    if (VisualElement.VisualConnectionConstructor) {
      const VisualConnection = VisualElement.VisualConnectionConstructor;
      [...this.getInputPorts(), ...this.getOutputPorts()]
        .forEach((target) => {
          target.inboundConnections.forEach((source) => {
            if (source instanceof Parameter) {
              const link = new VisualConnection({
                source,
                target,
              });
              links.push(link);
            }
          });
        });
    }
    return links;
  }

  // eslint-disable-next-line class-methods-use-this
  getShapeConstraints(): VisualElementShapeConstraints {
    const {
      width: inputsWidth = 0,
      height: inputsHeight = 0,
    } = this._portsSizes.get('inputs') || {};
    const {
      width: outputsWidth = 0,
      height: outputsHeight = 0,
    } = this._portsSizes.get('outputs') || {};
    const addIfNotZero = (source, add) => (source > 0 ? source + add : 0);
    const {
      width: labelWidth = 0,
      height: labelHeight = 0,
    } = this._nameSize;
    const vPadding = this.verticalPadding;
    const hPadding = this.horizontalPadding;
    const hasPorts = this.getPorts().length > 0;
    const textHorizontalPadding = 2.0 * (hPadding + (hasPorts ? this.portSize / 2.0 : 0));
    let width = labelWidth + textHorizontalPadding;
    let height = Math.max(
      inputsHeight + vPadding * 2.0,
      outputsHeight + vPadding * 2.0,
      labelHeight + vPadding * 2.0,
    );
    width = Math.max(width, this.minimumSize.width);
    height = Math.max(height, this.minimumSize.height);
    return {
      inner: {
        width,
        height,
      },
      outer: {
        width: width
          + addIfNotZero(inputsWidth, hPadding)
          + addIfNotZero(outputsWidth, hPadding),
        height,
      },
      left: {
        width: addIfNotZero(inputsWidth, hPadding),
        height,
      },
      right: {
        width: addIfNotZero(outputsWidth, hPadding),
        height,
      },
    };
  }

  setBBox(opts: g.PlainRect, options: dia.Element.PositionOptions) {
    const {
      x: specifiedX,
      y: specifiedY,
      width: specifiedWidth,
      height: specifiedHeight,
    } = opts;
    const shapeConstraints = this.getShapeConstraints();
    if (!shapeConstraints) {
      this.position(specifiedX, specifiedY, options);
      this.resize(specifiedWidth, specifiedHeight);
    } else {
      const unknownSize: dia.Size = {
        width: undefined,
        height: undefined,
      };
      const {
        inner = unknownSize,
        outer = unknownSize,
        left = unknownSize,
        right = unknownSize,
      } = shapeConstraints;
      const {
        width: innerWidth = opts.width,
        height: innerHeight = opts.height,
      } = inner;
      const {
        height: outerHeight = innerHeight,
      } = outer;
      const {
        width: leftWidth = 0,
      } = left;
      const {
        width: rightWidth = 0,
      } = right;
      const vOffset = Math.max(0, outerHeight - innerHeight);
      const x = specifiedX + leftWidth;
      const y = specifiedY + vOffset / 2.0;
      const width = Math.max(innerWidth, specifiedWidth - leftWidth - rightWidth);
      const height = Math.max(innerHeight, specifiedHeight - vOffset);
      this.position(x, y, options);
      this.resize(width, height);
    }
  }

  getBBox(opt?: dia.Element.BBoxOptions): g.Rect {
    const opts = super.getBBox(opt);
    const unknownSize: dia.Size = {
      width: undefined,
      height: undefined,
    };
    const {
      inner = unknownSize,
      outer = unknownSize,
      left = unknownSize,
      right = unknownSize,
    } = this.getShapeConstraints() || {};
    const {
      height: innerHeight = opts.height,
    } = inner;
    const {
      height: outerHeight = innerHeight,
    } = outer;
    const {
      width: leftWidth = 0,
    } = left;
    const {
      width: rightWidth = 0,
    } = right;
    const dH = Math.max(0, outerHeight - opts.height);
    opts.x -= leftWidth;
    opts.y -= dH / 2.0;
    opts.width += leftWidth + rightWidth;
    opts.height += dH;
    return opts;
  }

  /**
   * @returns {graphlib.Graph}
   */
  toGraphObject(): GraphLibGraph {
    const graph = new GraphLibGraph();
    const layoutConfiguration = {
      rankdir: this.rankDir,
      nodesep: this.nodeSeparation,
      edgesep: this.edgeSeparation,
      ranksep: this.rankSeparation,
      marginx: this.horizontalPadding,
      marginy: this.verticalPadding,
      ranker: this.ranker,
      align: this.align,
    };
    graph.setGraph(layoutConfiguration);
    graph.setDefaultEdgeLabel(() => ({}));
    /**
     * @type {ElementLinks[]}
     */
    const children = this
      .getEmbeddedCells()
      .filter((cell) => !cell.isLink())
      .map(getElementLinks);
    if (children.length === 0) {
      return graph;
    }
    // first we need to layout children
    children.forEach((child) => {
      if (child.element instanceof VisualElement) {
        child.element.layout();
      }
    });
    const aliases = children.map((config) => ({
      aliases: config.childrenIdentifiers,
      id: config.element.id,
    }));
    const formatLinkIdentifier = (linkIdentifier) => {
      const config = aliases.find((o) => o.aliases.has(linkIdentifier));
      if (config) {
        return config.id;
      }
      return undefined;
    };
    const formatLink = (link) => ({
      source: formatLinkIdentifier(link.source),
      target: formatLinkIdentifier(link.target),
    });
    children.forEach((child) => {
      const {
        element: node,
      } = child;
      const {
        width,
        height,
      } = node.getBBox();
      graph.setNode(node.id, { width, height, node });
    });
    const edges = [];
    children.forEach((child) => {
      child.links.forEach((link) => {
        const {
          source,
          target,
        } = formatLink(link);
        if (source && target && !edges.find((o) => o.source === source && o.target === target)) {
          edges.push({
            source,
            target,
          });
          graph.setEdge(source, target);
        }
      });
    });
    return graph;
  }

  layout(): void {
    const graph = this.toGraphObject();
    dagre.layout(graph);
    let totalWidth = 0;
    let totalHeight = 0;
    graph.nodes().forEach((node) => {
      const {
        x: nodeX,
        y: nodeY,
        width: nodeWidth,
        height: nodeHeight,
      } = graph.node(node);
      if (totalWidth < nodeX + nodeWidth / 2.0) {
        totalWidth = nodeX + nodeWidth / 2.0;
      }
      if (totalHeight < nodeY + nodeHeight / 2.0) {
        totalHeight = nodeY + nodeHeight / 2.0;
      }
    });
    totalWidth += this.horizontalPadding;
    totalHeight += this.verticalPadding;
    let dW = 0;
    let dH = 0;
    const shapeConstraints = this.getShapeConstraints();
    if (shapeConstraints) {
      const {
        inner = {
          width: undefined,
          height: undefined,
        },
      } = shapeConstraints;
      const {
        width: elementMinimumWidth,
        height: elementMinimumHeight,
      } = inner;
      dW = Math.max(0, elementMinimumWidth - totalWidth) / 2.0;
      dH = Math.max(0, elementMinimumHeight - totalHeight) / 2.0;
      this.resize(
        Math.max(totalWidth, elementMinimumWidth),
        Math.max(totalHeight, elementMinimumHeight),
      );
    } else {
      this.resize(totalWidth, totalHeight);
    }
    graph.nodes().forEach((node) => {
      const {
        width,
        height,
        x,
        y,
        /**
         * @type {joint.dia.Element}
         */
        node: visualElement,
      } = graph.node(node) || {};
      if (visualElement instanceof VisualElement) {
        visualElement.setBBox({
          x: x - width / 2.0 + dW,
          y: y - height / 2.0 + dH,
          width,
          height,
        }, {
          parentRelative: true,
          deep: true,
        });
      } else if (visualElement) {
        visualElement.position(
          x - width / 2.0 + dW,
          y - height / 2.0 + dH,
          {
            parentRelative: true,
            deep: true,
          },
        );
      }
    });
  }

  protected ensureMinimumSize(): void {
    const {
      inner = {
        width: undefined,
        height: undefined,
      },
    } = this.getShapeConstraints() || {};
    const {
      width: requiredWidth = 0,
      height: requiredHeight = 0,
    } = inner;
    const {
      width,
      height,
    } = this.size();
    let {
      x,
      y,
    } = this.position();
    if (width < requiredWidth || height < requiredHeight) {
      const dW = Math.max(0, requiredWidth - width);
      const dH = Math.max(0, requiredHeight - height);
      x -= dW / 2.0;
      y -= dH / 2.0;
      this.position(x, y);
      this.resize(Math.max(width, requiredWidth), Math.max(height, requiredHeight));
    }
  }

  fit(): void;
  fit(force: boolean): void;
  fit(force = true): void {
    if (!force && !this._fitRequested) {
      return;
    }
    if (!this.graph) {
      this._fitRequested = false;
      return;
    }
    this._fitRequested = false;
    try {
      this.fitEmbeds({
        deep: false,
        padding: this.padding,
      });
    } catch (noop) {
      console.warn(noop.message);
    }
    this.ensureMinimumSize();
    const parent = this.getParentCell();
    if (parent && parent instanceof VisualElement) {
      parent.fit(force);
    }
  }
}

export default VisualElement;
