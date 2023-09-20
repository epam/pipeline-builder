import { dia, shapes } from 'jointjs';
import {
  IDragAndDropOptions,
  IPaper,
  IVisualizer,
  IVisualizerDragEvent,
  IZoom,
  VisualizerEvent,
  VisualizerOptions,
  VisualizerOptionsWithElement,
  IVisualConnection,
  IVisualElement,
} from './types';
import { VisualAction, VisualConnection, VisualElement } from './elements';
import Paper from './paper';
import Zoom from './zoom';
import {
  IAction,
  IParameter,
  IWdlDocument,
  IWdlEntity,
  WdlEvent,
} from '../model/types';
import getParameter from './utilities/get-parameter';
import { measure } from '../model/utilities/measure';
import { Action } from '../model/action';
import { IEventHandler, IEventHandlerCallback } from '../model/events/types';
import {
  findLeafElements, getOptions, linkMouseEnterFactory, linkMouseLeave,
} from './utilities/visualizer-utilities';
import VisualDeclarations from './elements/visual-declarations';

interface IAttachOptions {
  fitViewport?: boolean;
  resetViewport?: boolean;
  parent?: VisualAction;
  resetCells?: boolean;
}

function getDragAndDropOptions(
  drop: IDragAndDropOptions | IVisualizerDragEvent<void> | undefined,
): IDragAndDropOptions | undefined {
  if (!drop) {
    return undefined;
  }
  if (typeof drop === 'function') {
    return {
      allowEvent: () => true,
      onDrop: drop,
    };
  }
  return drop;
}

class Visualizer extends dia.Graph implements IVisualizer {
  private _readOnly: boolean;

  private readonly _element: HTMLElement;

  private _checkFitRequestRAF: number | undefined;

  private _resizeRAF: number | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public _layoutInProgress: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public _attaching: any;

  private readonly _paper: Paper;

  private readonly _zoom: Zoom;

  private _selected: VisualConnection | VisualElement | undefined;

  private _document: IWdlDocument;

  private _handlers: IEventHandler<VisualizerEvent>[];

  constructor(options: VisualizerOptionsWithElement);
  constructor(element: HTMLElement, options: VisualizerOptions);
  constructor(element: string, options: VisualizerOptions);
  constructor(
    element: string | HTMLElement | VisualizerOptionsWithElement,
    options?: VisualizerOptions,
  ) {
    const opts = getOptions(element, options);
    const {
      element: el,
      drop,
    } = opts;
    if (!el || !(el instanceof Element)) {
      throw new Error('Visualizer should be created with DOM element');
    }
    const {
      readOnly = false,
      displayConnections = true,
      displayWorkflowConnections = false,
      connectionsOnTop = false,
      ...rest
    } = (opts || {}) as VisualizerOptions;
    super({
      displayConnections,
      displayWorkflowConnections,
      connectionsOnTop,
      ...rest,
    }, {
      cellNamespace: shapes,
    });
    this._element = el;
    const visualizerElement = document.createElement('div');
    const dragAndDrop = getDragAndDropOptions(drop);
    el.appendChild(visualizerElement);
    this._handlers = [];
    this._paper = new Paper(this, {
      el: visualizerElement,
      width: el.clientWidth,
      height: el.clientHeight,
      clickThreshold: 1,
      cellViewNamespace: shapes,
      async: true,
    });
    if (dragAndDrop) {
      el.addEventListener('dragover', (event: DragEvent) => {
        if (
          !dragAndDrop.allowEvent
          || dragAndDrop.allowEvent(event, this.getActionsUnderEvent(event))
        ) {
          event.preventDefault();
          // eslint-disable-next-line no-param-reassign
          event.dataTransfer.dropEffect = 'copy';
        } else {
          // eslint-disable-next-line no-param-reassign
          event.dataTransfer.dropEffect = 'none';
        }
      });
      el.addEventListener('drop', (event: DragEvent) => {
        event.preventDefault();
        dragAndDrop.onDrop(event, this.getActionsUnderEvent(event));
      });
    }
    this._zoom = new Zoom(this, this._paper);
    this._readOnly = readOnly;
    this._layoutInProgress = undefined;
    this._attaching = undefined;
    this.on('change:target', (link, info) => {
      if (
        link instanceof VisualConnection
        && typeof info === 'object'
        && typeof info.id === 'string'
        && typeof info.port === 'string'
      ) {
        this.changeLinkTarget(link, info.id, info.port);
      }
    });
    this.on('change:displayConnections change:displayWorkflowConnections', () => {
      this._paper.requestRenderView(this.getLinks());
    });
    this.on('change:position', (e) => {
      if (this.layoutInProgress || this.attaching) {
        return;
      }
      if (e instanceof VisualElement) {
        e.requestFit();
      }
    });
    this.on('add', () => this.correctElementsZPositions());
    this._selected = undefined;
    this._paper.on('link:mouseenter', linkMouseEnterFactory(this));
    this._paper.on('link:mouseleave', linkMouseLeave);
    this._paper.on('cell:pointerclick', (cell) => {
      const { model } = cell;
      if (model instanceof VisualAction) {
        this.selectedElement = model;
      } else {
        this.selectedElement = undefined;
      }
    });
    this._paper.on('blank:pointerclick', () => {
      this.selectedElement = undefined;
    });
    this._paper.on('link:pointerclick', (link) => {
      const { model } = link;
      if (model instanceof VisualConnection) {
        this.selectedElement = model;
      } else {
        this.selectedElement = undefined;
      }
    });
    this.startResizing();
  }

  get selectedAction(): IAction | undefined {
    if (this.selectedElement instanceof VisualAction) {
      return this.selectedElement.action;
    }
    return undefined;
  }

  set selectedAction(action: IAction | undefined) {
    const view: IVisualElement = this.findViewByEntity(action);
    this.selectedElement = view instanceof VisualElement ? view : undefined;
  }

  get paper(): IPaper {
    return this._paper;
  }

  get zoom(): IZoom {
    return this._zoom;
  }

  get readOnly(): boolean {
    return this._readOnly;
  }

  set readOnly(readOnly) {
    this._readOnly = readOnly;
  }

  get attaching() {
    return !!this._attaching;
  }

  get layoutInProgress() {
    return !!this._layoutInProgress;
  }

  get displayConnections() {
    return this.get('displayConnections');
  }

  set displayConnections(displayConnections) {
    if (this.displayConnections !== displayConnections) {
      this.set('displayConnections', displayConnections);
    }
  }

  get displayWorkflowConnections() {
    return this.get('displayWorkflowConnections');
  }

  set displayWorkflowConnections(displayWorkflowConnections) {
    if (this.displayWorkflowConnections !== displayWorkflowConnections) {
      this.set('displayWorkflowConnections', displayWorkflowConnections);
    }
  }

  get connectionsOnTop() {
    return this.get('connectionsOnTop');
  }

  set connectionsOnTop(connectionsOnTop) {
    if (this.connectionsOnTop !== connectionsOnTop) {
      this.set('connectionsOnTop', connectionsOnTop);
      this.correctElementsZPositions();
    }
  }

  get selectedElement(): VisualElement | VisualConnection | undefined {
    return this._selected;
  }

  set selectedElement(selectedElement: VisualElement | VisualConnection | undefined) {
    if (this._selected !== selectedElement) {
      if (this._selected) {
        this._selected.selected = false;
      }
      this._selected = selectedElement;
      if (this._selected) {
        this._selected.selected = true;
      }
      this.triggerEvent(VisualizerEvent.selectionChanged, this.selectedAction);
    }
  }

  private getActionsUnderEvent(event: MouseEvent): IAction[] {
    const views: VisualAction[] = this._paper.findViewsFromPoint(
      this._paper.clientToLocalPoint(
        event.clientX,
        event.clientY,
      ),
    )
      .filter((view) => view.model instanceof VisualAction)
      .map((view) => view.model as VisualAction);
    views.sort((a, b) => b.level - a.level);
    return views.map((view) => view.action);
  }

  private changeLinkTarget(link: VisualConnection, targetId: string, targetPort: string): void {
    if (link.targetParameter) {
      link.targetParameter.unbind();
    }
    const target = this.getCell(targetId);
    if (
      (target instanceof VisualAction || target instanceof VisualDeclarations)
      && link.sourceParameter
    ) {
      const parameter = getParameter(target.action, targetPort);
      if (parameter) {
        link.setOptions({
          target: parameter,
          temp: false,
        });
        parameter.bind(link.sourceParameter);
        requestAnimationFrame(this.correctElementsZPositions.bind(this));
      }
    }
  }

  correctElementsZPositions() {
    const getElementLevel = (element) => {
      if (element instanceof VisualElement) {
        return element.level;
      }
      if (element instanceof VisualConnection) {
        if (!this.connectionsOnTop) {
          return element.level + 0.5;// links should be "under" all elements, except root ones
        }
        return -Infinity; // connections should be processed first
      }
      return 0;
    };
    this.getCells()
      .sort((a, b) => getElementLevel(a) - getElementLevel(b))
      .forEach((cell) => {
        cell.toFront();
      });
  }

  override getLinks(): VisualConnection[] {
    return super.getLinks()
      .filter((link) => link instanceof VisualConnection) as VisualConnection[];
  }

  override getElements(): VisualElement[] {
    return super.getElements()
      .filter((element) => element instanceof VisualElement) as VisualElement[];
  }

  getVisualEntity(entity: IWdlEntity): VisualElement | undefined {
    return this.getElements()
      .find((element) => element instanceof VisualElement
        && element.entity === entity);
  }

  private parameterBind(
    event: WdlEvent,
    sender: IWdlEntity,
    info: { source: IParameter, target: IParameter },
  ): void {
    const {
      target,
      source,
    } = info || {};
    const links = this.getLinks();
    const existing = links
      .find((link) => link.targetParameter === target
        && link.sourceParameter === source);
    if (!existing) {
      const connection = new VisualConnection({
        source,
        target,
      });
      if (this._paper.hasScheduledUpdates()) {
        this._paper.updateViews();
      }
      this.addCells([connection]);
    }
  }

  private parameterUnbind(
    event: WdlEvent,
    sender: IWdlEntity,
    info: { source: IParameter, target: IParameter },
  ): void {
    const {
      source,
      target,
    } = info || {};
    const links = this.getLinks();
    const existing = links
      .find((link) => link.targetParameter === target
        && link.sourceParameter === source);
    if (existing) {
      existing.remove();
      if (this._paper.hasScheduledUpdates()) {
        this._paper.updateViews();
      }
    }
  }

  findViewByEntity(entity: IWdlEntity): IVisualElement | undefined {
    return this.getElements().find((el) => el instanceof VisualElement
      && el.entity === entity) as VisualAction;
  }

  findViewsByEntities(entity: IWdlEntity[]): IVisualElement[] {
    return this.getElements().filter((el) => el instanceof VisualElement
      && (entity as IWdlEntity[]).includes(el.entity)) as IVisualElement[];
  }

  private actionsChanged(
    event: WdlEvent,
    parent: IWdlEntity,
  ): void {
    const options: IAttachOptions = {};
    if (parent instanceof Action) {
      const parentElement = this.findViewByEntity(parent);
      if (parentElement instanceof VisualAction) {
        options.parent = parentElement;
        this.performAttachingOperation(() => {
          parentElement.updateActions();
          this.attachVisualElements(
            parentElement.getChildrenElements(),
            options,
          );
        });
      }
    } else {
      // workflows changed
      this.attachTo(this._document);
    }
  }

  private attachVisualElements(
    visualElements: IVisualElement[],
    options?: IAttachOptions,
  ): void {
    if (options?.resetViewport) {
      this.zoom.reset();
    }
    return this.performAttachingOperation(() => {
      this.performOperationOnUnscaledPaper(() => {
        const roots = measure(
          'Visualizer: process elements',
          () => {
            this._paper.updateViews();
            const all = visualElements.reduce<IVisualElement[]>(
              (array, root) => (array
                .concat([root])
                .concat(root.getChildrenElements(true))),
              [],
            );
            if (options?.resetCells) {
              this.resetCells(all);
            } else {
              this.addCells(all);
            }
            return visualElements;
          },
          this._document.project.debug,
        );
        if (options?.parent) {
          options.parent.embed(roots);
          options.parent.requestFit();
        }
        const links: IVisualConnection[] = [];
        const existingLinks = this.getLinks();
        const isNewLink = (link: IVisualConnection): boolean => !existingLinks.some((e) => (
          e.targetParameter === link.targetParameter && e.sourceParameter === link.targetParameter
        ));
        measure(
          'Visualizer: process links',
          () => {
            roots
              .forEach((root) => {
                links.push(...root.createConnections({
                  recursive: true,
                }));
              });
            this.addCells(links.filter(isNewLink));
          },
          this._document.project.debug,
        );
        this.correctElementsZPositions();
        this.layout();
      });
      if (options?.fitViewport) {
        measure(
          'Visualizer: fitting to viewport',
          () => this.zoom.fitToPage({
            padding: 10,
            verticalAlign: 'middle',
            horizontalAlign: 'middle',
          }),
          this._document.project.debug,
        );
      }
    });
  }

  private stopCheckingFitRequest(): void {
    cancelAnimationFrame(this._checkFitRequestRAF);
    this._checkFitRequestRAF = undefined;
  }

  private startCheckingFitRequest(): void {
    this.stopCheckingFitRequest();
    const callback = () => {
      if (!this.layoutInProgress) {
        const views = this.getElements().filter((element) => element.fitRequested);
        if (views.length > 0) {
          this.performLayoutOperation(() => {
            this.correctElementSize(views);
          });
        }
      }
      this._checkFitRequestRAF = requestAnimationFrame(callback);
    };
    callback();
  }

  private stopResizing(): void {
    cancelAnimationFrame(this._resizeRAF);
    this._resizeRAF = undefined;
  }

  private startResizing(): void {
    this.stopResizing();
    let width: number | undefined;
    let height: number | undefined;
    const callback = () => {
      if (!this.layoutInProgress) {
        if (
          this._element
          && (
            this._element.clientWidth !== width
            || this._element.clientHeight !== height
          )
        ) {
          width = this._element.clientWidth;
          height = this._element.clientHeight;
          this._paper.setDimensions(
            width,
            height,
          );
        }
      }
      this._resizeRAF = requestAnimationFrame(callback);
    };
    callback();
  }

  attachTo(document: IWdlDocument): void {
    this.stopCheckingFitRequest();
    measure(
      'Visualizer: attaching to visualizer',
      () => {
        if (this._document) {
          this._document.off(WdlEvent.actionsChanged, this.actionsChanged, this);
          this._document.off(WdlEvent.workflowsChanged, this.actionsChanged, this);
          this._document.off(WdlEvent.parameterBind, this.parameterBind, this);
          this._document.off(WdlEvent.parameterUnbind, this.parameterUnbind, this);
        }
        this._document = document;
        this.clear();
        this.attachVisualElements(
          document.workflows.map((wf) => VisualAction.initialize({ entity: wf })),
          {
            fitViewport: true,
            resetViewport: true,
            resetCells: true,
          },
        );
        this._document.on(WdlEvent.actionsChanged, this.actionsChanged, this);
        this._document.on(WdlEvent.workflowsChanged, this.actionsChanged, this);
        this._document.on(WdlEvent.parameterBind, this.parameterBind, this);
        this._document.on(WdlEvent.parameterUnbind, this.parameterUnbind, this);
      },
      document.project.debug,
    );
    this.startCheckingFitRequest();
  }

  private performOperationOnUnscaledPaper<T>(operation: () => T): T {
    const {
      position,
      zoomFactor,
    } = this._zoom;
    this.zoom.zoomFactor = 0;
    const result = operation();
    this.zoom.zoomFactor = zoomFactor;
    this.zoom.position = position;
    return result;
  }

  private performAttachingOperation<T>(operation: () => T): T {
    return this.performBlockingOperation(
      operation,
      '_attaching',
      {},
    );
  }

  private performLayoutOperation<T>(operation: () => T): T {
    return this.performBlockingOperation(
      operation,
      '_layoutInProgress',
      {},
    );
  }

  private performBlockingOperation<T, K extends keyof this, V extends this[K]>(
    operation: () => T,
    key: K,
    value: V,
  ): T {
    const previous = this[key];
    this[key] = value;
    const result = operation();
    this[key] = previous;
    return result;
  }

  protected correctElementSize(elements: IVisualElement[]): void;
  protected correctElementSize(elements: IVisualElement[], force: boolean): void;
  protected correctElementSize(elements: IVisualElement[], force: boolean = false): void {
    const visualActions: IVisualElement[] = elements === undefined && this._document
      ? this._document.workflows.map((wf) => this.findViewByEntity(wf)).filter(Boolean)
      : (elements || []);
    this.performLayoutOperation(() => {
      visualActions.forEach((root) => root.fit(force));
    });
  }

  layout();
  layout(elements: VisualAction[]);
  layout(elements: VisualAction[] | undefined = undefined) {
    const visualActions: IVisualElement[] = elements === undefined && this._document
      ? this._document.workflows.map((wf) => this.findViewByEntity(wf)).filter(Boolean)
      : (elements || []);
    measure(
      'Visualizer: layout',
      () => this.performLayoutOperation(() => {
        const leafs = findLeafElements(visualActions);
        this.correctElementSize(leafs, true);
        visualActions.forEach((root) => root.layout());
      }),
      this._document ? this._document.project.debug : false,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private triggerEvent(event: VisualizerEvent, ...args: any[]): void {
    this._handlers
      .filter((h) => h.event === event)
      .forEach((h) => h.callback(event, this, ...args));
  }

  addEventListener<T extends VisualizerEvent>(
    event: T,
    listener: IEventHandlerCallback<VisualizerEvent, T>,
  ) {
    this.removeEventListener(event, listener);
    this._handlers.push({
      event,
      callback: listener,
      priority: 0,
      order: this._handlers.length,
    });
  }

  removeEventListener();
  removeEventListener<T extends VisualizerEvent>(event: T);
  removeEventListener<T extends VisualizerEvent>(
    event: T,
    listener: IEventHandlerCallback<VisualizerEvent, T>,
  );
  removeEventListener<T extends VisualizerEvent>(
    event?: T,
    listener?: IEventHandlerCallback<VisualizerEvent, T>,
  ) {
    this._handlers = this._handlers.filter((h) => !!event
      && h.event !== event
      && (!listener || h.callback !== listener));
  }
}

export default Visualizer;
