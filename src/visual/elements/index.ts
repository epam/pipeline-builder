import { VisualAction } from './workflow';
import VisualConnection from './visual-connection';
import VisualElement from './visual-element';

VisualElement.VisualConnectionConstructor = VisualConnection;

export {
  VisualAction,
  VisualElement,
  VisualConnection,
};
