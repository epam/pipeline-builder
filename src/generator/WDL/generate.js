import _ from 'lodash';

import TaskGenerator from './entities/TaskGenerator';
import WorkflowGenerator from './entities/WorkflowGenerator';

export default function generate(objectModel) {
  const settings = {};

  const wf = new WorkflowGenerator(objectModel, settings).renderWorkflow();

  let tasks = '';
  const actionsRendered = {};
  _.forEach(objectModel.children, (val) => {
    const action = val.action;
    if (!actionsRendered[action.name]) {
      actionsRendered[action.name] = true;
      tasks += new TaskGenerator(action).renderTask();
    }
  });

  return wf + tasks;
}
