import { V, g } from 'jointjs';

function getOffset(el) {
  el = el.getBoundingClientRect();
  return {
    left: el.left + window.scrollX,
    top: el.top + window.scrollY,
  };
}

function convertToLocal(paper, p) {
  p = g.point(p);

  // This is a hack for Firefox! If there wasn't a fake (non-visible) rectangle covering the
  // whole SVG area, `$(paper.svg).offset()` used below won't work.
  const fakeRect = V('rect', {
    width: paper.options.width,
    height: paper.options.height,
    x: 0,
    y: 0,
    opacity: 0,
  });
  V(paper.svg).prepend(fakeRect);
  const paperOffset = getOffset(paper.svg);

  // Clean up the fake rectangle once we have the offset of the SVG document.
  fakeRect.remove();

  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  const scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;

  p.offset(scrollLeft - paperOffset.left, scrollTop - paperOffset.top);
  return p;
}

/**
 * This class handles the default zoom behavior of
 * the visual component. It controls the wheel events
 * and provides exponential scaling changing diagram scale
 * by the fixed magnitude.
 */
export default class Zoom {
  /**
   * Creates zoom component and attaches it to the paper.
   *
   * **Note.** You should not use the constructor directly as a Zoom component is automatically created
   * in {@link Visualizer}.
   *
   * @param {joint.dia.Paper} paper
   * @param {number} [zoomMultiplier=1.1] Multiplier
   */
  constructor(paper, zoomMultiplier = 1.1) {
    this._paper = paper;
    this._mult = zoomMultiplier;
    this.fitToPage();

    const onWheel = (evt) => {
      evt.originalEvent.stopPropagation();
      evt.originalEvent.preventDefault();
      const point = { x: evt.clientX, y: evt.clientY };
      if (evt.originalEvent.wheelDelta < 0) {
        this._scale(-1, point);
      }
      if (evt.originalEvent.wheelDelta > 0) {
        this._scale(1, point);
      }
    };
    paper.on('blank:mousewheel', onWheel);
    paper.on('cell:mousewheel', (view, evt) => onWheel(evt));
  }

  /**
   * Performs zoom-in action.
   */
  zoomIn() {
    this._scale(1);
  }

  /**
   * Performs zoom-out action.
   */
  zoomOut() {
    this._scale(-1);
  }

  /**
   * Scales diagram contents to widget size.
   * @param {Object|*} opt - optional argument identical to
   * options in joint.dia.Paper.scaleContentToFit
   */
  fitToPage(opt) {
    this._paper.scaleContentToFit(opt);
    this._currDeg = Math.floor(Math.log(V(this._paper.viewport).scale().sx) / Math.log(this._mult));
  }

  /**
   * Returns the currents scale of the component.
   * @returns {number}
   */
  getCurrentScale() {
    return V(this._paper.viewport).scale().sx;
  }

  /**
   * Converts point from local widget coordinates to local paper coordinates.
   * @param point
   * @returns {*}
   */
  fromWidgetToLocal(point) {
    const offset = getOffset(this._paper.el);
    return this._paper.clientToLocalPoint({
      x: point.x + offset.left,
      y: point.y + offset.top,
    });
  }

  /**
   * Scales the contents changing current scale by the mult ** degree.
   * According to some origin (point).
   * @param degree
   * @param point
   * @private
   */
  _scale(degree, point) {
    const paper = this._paper;
    point = point || g.rect(paper.viewport.getBoundingClientRect()).center();
    const delta = Math.pow(this._mult, degree);
    this._currDeg += degree;

    const scale = Math.pow(this._mult, this._currDeg);
    const oldX = paper.options.origin.x;
    const oldY = paper.options.origin.y;
    const paperPoint = convertToLocal(paper, point);
    paper.setOrigin(0, 0);
    paper.scale(scale, scale);
    paper.setOrigin(((oldX - paperPoint.x) * delta) + paperPoint.x,
      ((oldY - paperPoint.y) * delta) + paperPoint.y);
  }
}
