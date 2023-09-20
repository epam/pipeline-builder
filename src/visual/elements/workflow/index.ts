import VisualAction from './visual-action';
import VisualCall from './visual-call';
import VisualConditional from './visual-conditional';
import VisualScatter from './visual-scatter';
import VisualWorkflow from './visual-workflow';
import { ContextTypes } from '../../../model';

VisualAction.registerInitializer(ContextTypes.call, VisualCall);
VisualAction.registerInitializer(ContextTypes.conditional, VisualConditional);
VisualAction.registerInitializer(ContextTypes.scatter, VisualScatter);
VisualAction.registerInitializer(ContextTypes.workflow, VisualWorkflow);

export {
  VisualAction,
  VisualCall,
  VisualConditional,
  VisualScatter,
  VisualWorkflow,
};

export default VisualAction;
