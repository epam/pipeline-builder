import {
  Visualizer,
} from './pipeline';
import * as scenarios from './tests/demo';
import './demo.scss';

const visualizer = new Visualizer({
  element: 'visualizer',
  connectionsOnTop: false,
  displayWorkflowConnections: true,
});

scenarios.createDocumentScenario(visualizer);
