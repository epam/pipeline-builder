import defaultsDeep from '../../utilities/defaults-deep';
import VisualAction from './visual-action';
import {
  LayoutConfiguration,
  PortShapes,
  VisualActionDefaultOptions,
  VisualActionOptions,
} from '../../types';
import Parameter from '../../../model/parameter';
import { isScatterIterator } from '../../../model';

export interface ScatterLayoutConfiguration extends LayoutConfiguration {
  borderSliceSize?: number;
}

export interface VisualScatterOptions extends VisualActionOptions {
  layout?: ScatterLayoutConfiguration;
}

class VisualScatter extends VisualAction {
  static defaultOptions: VisualActionDefaultOptions<VisualScatterOptions> = {
    layout: {
      borderSliceSize: 20,
    },
  };

  private _borderSliceSize: number;

  constructor(options: VisualScatterOptions) {
    const {
      size,
    } = options;
    const opts = defaultsDeep(
      {},
      options,
      VisualScatter.defaultOptions,
    );
    const {
      borderSliceSize = 20.0,
    } = (opts || {}).layout || {};
    const {
      width = 3.0 * borderSliceSize,
      height = 2.0 * borderSliceSize,
    } = size || {};
    const b = borderSliceSize;
    super(defaultsDeep(
      opts,
      {
        layout: {
          size: {
            width: Math.max(width, 3.0 * borderSliceSize),
            height: Math.max(height, 2.0 * borderSliceSize),
          },
        },
        attrs: {
          body: {
            d: `M 0 ${b} L ${b} 0 L calc(w - ${b}) 0 L calc(w) ${b} L calc(w) calc(h) L 0 calc(h) Z`,
          },
        },
      },
    ));
  }

  get borderSliceSize(): number {
    return this._borderSliceSize;
  }

  setOptions(options: VisualScatterOptions) {
    const {
      layout,
    } = options;
    const {
      borderSliceSize = 20.0,
    } = layout || {};
    this._borderSliceSize = borderSliceSize;
    super.setOptions(options);
  }

  getPortConfiguration(port: Parameter, group: string): {
    shape: PortShapes;
  } {
    if (isScatterIterator(port)) {
      return {
        shape: PortShapes.rectangle,
      };
    }
    return super.getPortConfiguration(port, group);
  }
}

export default VisualScatter;
