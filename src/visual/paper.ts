import { dia } from 'jointjs';
import { VisualConnection, VisualElement } from './elements';
import { IPaper, IVisualizer } from './types';
import ConnectionView from './views/link';
import VisualElementView from './views/element';

class Paper extends dia.Paper implements IPaper {
  private readonly _workflowConnectionMarker: string;

  private readonly _defaultConnectionMarker: string;

  constructor(visualizer: IVisualizer, options: dia.Paper.Options = {}) {
    const {
      gridSize = 1,
      linkPinning = false,
      perpendicularLinks = false,
      multiLinks = false,
      markAvailable = true,
      highlighting = {
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
      validateConnection: validateConnectionOptions = ConnectionView.validateConnectionFactory(
        visualizer,
      ),
      ...rest
    } = options;
    super({
      gridSize,
      linkPinning,
      perpendicularLinks,
      multiLinks,
      markAvailable,
      highlighting,
      validateConnection: validateConnectionOptions,
      viewport: (view) => {
        const { model } = view;
        if (model instanceof VisualElement) {
          return model.visible;
        }
        if (model instanceof VisualConnection) {
          if (model.temporary) {
            return true;
          }
          if (!visualizer.displayConnections) {
            return false;
          }
          if (!visualizer.displayWorkflowConnections) {
            return !model.isWorkflowConnection && model.visible;
          }
          return model.visible;
        }
        return true;
      },
      model: visualizer,
      linkView: ConnectionView,
      elementView: VisualElementView,
      defaultLink: ConnectionView.defaultLink,
      ...rest,
    });
    const markerMarkup = (className) => [{
      tagName: 'path',
      attributes: {
        d: 'M -8 -4 0 0 -8 4 z',
        class: className,
      },
    }];
    this._workflowConnectionMarker = this.defineMarker({
      id: 'workflow-connection-marker',
      markup: markerMarkup('workflow-connection-marker'),
    });
    this._defaultConnectionMarker = this.defineMarker({
      id: 'default-connection-marker',
      markup: markerMarkup('default-connection-marker'),
    });
  }

  get workflowConnectionMarker(): string {
    return this._workflowConnectionMarker;
  }

  get defaultConnectionMarker(): string {
    return this._defaultConnectionMarker;
  }

  // eslint-disable-next-line class-methods-use-this
  getSVG() {
    // TODO:
    // implement method
    throw new Error('Not implemented');
  }

  // eslint-disable-next-line class-methods-use-this
  getPNG() {
    // TODO:
    // implement method
    throw new Error('Not implemented');
  }

  requestRenderView(views: dia.Cell[]) {
    views.forEach((view) => this.renderView(view));
  }
}

export default Paper;
