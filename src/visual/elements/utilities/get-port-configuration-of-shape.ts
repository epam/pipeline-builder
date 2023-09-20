import { PortShapes } from '../../types';

export default function getPortConfigurationOfShape(shape, portSize = 10.0) {
  switch (shape) {
    case PortShapes.rectangle:
      return {
        tagName: 'rect',
        attributes: {
          width: portSize,
          height: portSize,
          refX: -portSize / 2.0,
          refY: -portSize / 2.0,
        },
      };
    case PortShapes.triangleLeft: {
      const a = Math.sin(Math.PI / 6.0) * portSize;
      const b = Math.cos(Math.PI / 6.0) * portSize;
      return {
        tagName: 'path',
        attributes: {
          d: `M 0 ${a} L ${b} 0 L ${b} ${2.0 * a} L 0 ${a}`,
          refX: -b / 2.0,
          refY: -a,
        },
      };
    }
    case PortShapes.triangleRight: {
      const a = Math.sin(Math.PI / 6.0) * portSize;
      const b = Math.cos(Math.PI / 6.0) * portSize;
      return {
        tagName: 'path',
        attributes: {
          d: `M ${b} ${a} L 0 0 L 0 ${2.0 * a} L ${b} ${a}`,
          refX: -b / 2.0,
          refY: -a,
        },
      };
    }
    case PortShapes.circle:
    default:
      return {
        tagName: 'circle',
        attributes: {
          r: portSize / 2.0,
        },
      };
  }
}
