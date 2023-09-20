import { dia, g, shapes } from 'jointjs';
import {
  IAction, IParameter, IWdlDocument, IWdlEntity, TActionTypes,
} from '../model/types';
import { IEventHandlerCallback } from '../model/events/types';

export enum PortShapes {
  circle = 'circle',
  rectangle = 'rectangle',
  triangleLeft = 'triangle-left',
  triangleRight = 'triangle-right',
}

export enum RankDir {
  LR = 'LR',
  RL = 'RL',
  TB = 'TB',
  BT = 'BT',
}

export enum Align {
  UL = 'UL',
  UR = 'UR',
  DL = 'DL',
  DR = 'DR',
}

export enum Ranker {
  networkSimplex = 'network-simplex',
  tightTree = 'tight-tree',
  longestPath = 'longest-path',
}

export interface LayoutConfiguration {
  minimumSize?: dia.Size;
  /**
   * Number of pixels that separate nodes horizontally in the layout
   */
  nodeSeparation?: number;
  edgeSeparation?: number;
  rankSeparation?: number;
  portSize?: number;
  padding?: number;
  verticalPadding?: number;
  horizontalPadding?: number;
  rankDir?: RankDir;
  align?: Align;
  ranker?: Ranker;
}

export interface VisualElementBaseOptions {
}

export interface VisualElementShapeConstraints {
  inner: dia.Size;
  outer?: dia.Size;
  left?: dia.Size;
  right?: dia.Size;
}

export interface VisualElementOptions<T extends TActionTypes = TActionTypes>
  extends dia.Element.GenericAttributes<shapes.standard.RectangleAttributes>,
  VisualElementBaseOptions {
  layout?: LayoutConfiguration;
  entity: IWdlEntity<T>;
}

export interface VisualDeclarationsOptions extends VisualElementOptions {
}

export interface ICreateConnectionOptions {
  recursive?: boolean;
}

export interface IVisual {
  selected: boolean;
  readonly visible: boolean;
  readonly level: number;
}

export interface IVisualElement<T extends TActionTypes = TActionTypes>
  extends dia.Element, IVisual {
  readonly entity: IWdlEntity<T> | undefined;
  getChildrenElements(): IVisualElement[];
  getChildrenElements(recursive: boolean): IVisualElement[];
  requestFit(): void;
  layout(): void;
  fit(): void;
  fit(force: boolean): void;
  createConnections(options?: ICreateConnectionOptions): IVisualConnection[];
}

export interface VisualActionOptions extends VisualElementOptions {
}

export interface IVisualAction extends IVisualElement {
  readonly action: IAction;
}

export interface IVisualDeclarations extends IVisualElement {
  readonly action: IAction;
}

export interface IParameterConnection {
  id: dia.Cell.ID;
  port: dia.Cell.ID;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isParameterConnection(connection: any): connection is IParameterConnection {
  return connection
    && typeof connection === 'object'
    && ['string', 'number'].includes(typeof connection.id)
    && ['string', 'number'].includes(typeof connection.port);
}

export interface VisualConnectionOptions extends dia.Link.Attributes {
  source?: IParameter;
  target?: IParameter;
  paper?: dia.Paper;
  temp?: boolean;
}

export interface IVisualConnection extends shapes.standard.Link, IVisual {
  readonly sourceParameter: IParameter | undefined;
  readonly sourceConnection: IParameterConnection | undefined;
  readonly sourceElement: IVisualElement | undefined;
  readonly targetParameter: IParameter | undefined;
  readonly targetConnection: IParameterConnection | undefined;
  readonly targetElement: IVisualElement | undefined;
  readonly temporary: boolean;
  readonly visible: boolean;
  readonly isWorkflowConnection: boolean;
}
export interface VisualConnectionConstructor {
  new(options: VisualConnectionOptions): IVisualConnection;
}

export type VisualDefaultOptions<T = VisualElementOptions>
  = Omit<T, keyof VisualElementBaseOptions>;

export type VisualActionDefaultOptions<T extends VisualActionOptions = VisualActionOptions>
  = VisualDefaultOptions<Omit<T, 'action'>>;

enum VisualizerEvent {
  selectionChanged = 'selection-changed',
}

export interface IVisualizerOptions {
  readOnly?: boolean;
  displayConnections?: boolean;
  displayWorkflowConnections?: boolean;
  connectionsOnTop?: boolean;
}

export type IVisualizerDragEvent<T> = (event: DragEvent, actions: IAction[]) => T;

export interface IDragAndDropOptions {
  allowEvent?: IVisualizerDragEvent<boolean>;
  onDrop: IVisualizerDragEvent<void>;
}

export interface VisualizerOptions extends IVisualizerOptions {
  drop?: IDragAndDropOptions | IVisualizerDragEvent<void>;
}

export interface IZoom {
  zoomIn(): void;
  zoomOut(): void;
  fitToPage(opt?: dia.Paper.TransformToFitContentOptions): void;
  fitTo(entity: IWdlEntity, opt?: dia.Paper.TransformToFitContentOptions): void;
  fromWidgetToLocal(point: g.PlainPoint): g.PlainPoint;
  position: g.PlainPoint;
  zoomFactor: number;
  zoom: number;
  reset(): void;
}

export interface IPaper extends dia.Paper {
  readonly workflowConnectionMarker: string;
  readonly defaultConnectionMarker: string;
  getSVG(): void;
  getPNG(): void;
  requestRenderView(views: dia.Cell[]);
}

export interface IVisualizer extends dia.Graph, IVisualizerOptions {
  readonly paper: IPaper;
  readonly zoom: IZoom;
  attachTo(document: IWdlDocument): void;
  selectedAction: IAction | undefined;
  addEventListener<T extends VisualizerEvent>(
    event: T,
    listener: IEventHandlerCallback<VisualizerEvent, T>,
  );
  removeEventListener();
  removeEventListener<T extends VisualizerEvent>(event: T);
  removeEventListener<T extends VisualizerEvent>(
    event: T,
    listener: IEventHandlerCallback<VisualizerEvent, T>
  );
  findViewByEntity(entity: IWdlEntity): IVisualElement | undefined;
  findViewsByEntities(entity: IWdlEntity[]): IVisualElement[];
}

export interface VisualizerOptionsWithElement extends VisualizerOptions {
  element: HTMLElement | string;
}

export {
  VisualizerEvent,
};
