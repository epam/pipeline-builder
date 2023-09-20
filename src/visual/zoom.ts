import {
  g, dia,
} from 'jointjs';
import { IVisualizer, IZoom } from './types';
import { IWdlEntity } from '../model/types';

/**
 * This class handles the default zoom behavior of
 * the visual component. It controls the wheel events
 * and provides exponential scaling changing diagram scale
 * by the fixed magnitude.
 */
class Zoom implements IZoom {
  private readonly _visualizer: IVisualizer;

  private readonly _scaleBase: number;

  /**
   * Creates zoom component and attaches it to the paper.
   *
   * **Note.** You should not use the constructor directly as a Zoom component
   * is automatically created
   * in {@link Visualizer}.
   *
   * @param {IVisualizer} visualizer
   * @param {joint.dia.Paper} paper
   * @param {number} [scaleBase=1.1] scale base
   * (paper scale will be calculated as `scale base` ** `scale factor`
   */
  constructor(visualizer: IVisualizer, paper: dia.Paper, scaleBase: number = 1.1) {
    this._visualizer = visualizer;
    this._scaleBase = scaleBase;
    this.fitToPage();

    const onWheel = (evt) => {
      evt.originalEvent.stopPropagation();
      evt.originalEvent.preventDefault();
      const point = { x: evt.clientX, y: evt.clientY };
      if (evt.originalEvent.wheelDelta < 0) {
        this.scale(-1, point);
      }
      if (evt.originalEvent.wheelDelta > 0) {
        this.scale(1, point);
      }
    };
    paper.on('blank:mousewheel', onWheel);
    paper.on('cell:mousewheel', (view, evt) => onWheel(evt));
  }

  get position(): g.PlainPoint {
    const { tx, ty } = this._visualizer.paper.translate();
    return {
      x: tx,
      y: ty,
    };
  }

  set position(position: g.PlainPoint) {
    this._visualizer.paper.translate(position.x, position.y);
  }

  get zoomFactor(): number {
    return Math.log(this.zoom) / Math.log(this._scaleBase);
  }

  set zoomFactor(zoomFactor: number) {
    this.zoom = this._scaleBase ** zoomFactor;
  }

  get zoom(): number {
    return this._visualizer.paper.scale().sx;
  }

  set zoom(zoom: number) {
    const scale = Math.min(1, zoom);
    this._visualizer.paper.scale(scale, scale, 0, 0);
  }

  /**
   * Performs zoom-in action.
   */
  zoomIn() {
    this.scale(1);
  }

  /**
   * Performs zoom-out action.
   */
  zoomOut() {
    this.scale(-1);
  }

  /**
   * Scales diagram contents to widget size.
   * @param {joint.dia.Paper.TransformToFitContentOptions} [opt] - optional argument identical to
   * options in joint.dia.Paper.scaleContentToFit
   */
  fitToPage(opt?: dia.Paper.TransformToFitContentOptions): void {
    this._visualizer.paper.transformToFitContent({
      useModelGeometry: true,
      verticalAlign: 'middle',
      horizontalAlign: 'middle',
      ...(opt || {}),
      maxScale: 1,
    });
    this.correctPaperScale();
  }

  fitTo(entity: IWdlEntity, opt?: dia.Paper.TransformToFitContentOptions): void {
    const view = this._visualizer.findViewByEntity(entity);
    if (view) {
      this._visualizer.paper.transformToFitContent({
        useModelGeometry: true,
        verticalAlign: 'middle',
        horizontalAlign: 'middle',
        ...(opt || {}),
        contentArea: view.getBBox(),
        maxScale: 1,
      });
    }
  }

  /**
   * Converts point from local widget coordinates to local paper coordinates.
   * @param point
   * @returns {*}
   */
  fromWidgetToLocal(point: g.PlainPoint): g.PlainPoint {
    return this._visualizer.paper.paperToLocalPoint(point);
  }

  reset(): void {
    this.position = { x: 0, y: 0 };
    this.zoomFactor = 0;
  }

  private correctPaperScale(): void {
    const {
      zoom,
    } = this;
    const scale = Math.min(1, zoom);
    if (scale !== zoom) {
      this.zoom = scale;
    }
  }

  /**
   * Scales the contents changing current scale to the `scale base` ** `scale factor`.
   * According to some origin (point).
   * @param {number} factorDelta
   * @param {g.PlainPoint} [point]
   * @private
   */
  private scale(factorDelta: number, point?: g.PlainPoint) {
    const { paper } = this._visualizer;
    const p = point || new g.Rect(paper.viewport.getBoundingClientRect()).center();
    const local = paper.clientToLocalPoint(p);
    const currentOrigin = paper.translate();
    this.zoomFactor += factorDelta;
    const client = paper.localToClientPoint(local);
    const dx = client.x - p.x;
    const dy = client.y - p.y;
    paper.translate(currentOrigin.tx - dx, currentOrigin.ty - dy);
  }
}

export default Zoom;
