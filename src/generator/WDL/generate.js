import _ from 'lodash';

import TaskGenerator from './entities/TaskGenerator';
import WorkflowGenerator from './entities/WorkflowGenerator';

export default function generate(objectModel) {
  const settings = {};

  const wf = new WorkflowGenerator(objectModel, settings).renderWorkflow();

  let tasks = '';
  const actionsToBeRendered = {};

  const actionSelector = (children) => {
    _.forEach(children, (val) => {
      if (!val.type) {
        const action = val.action;
        actionsToBeRendered[action.name] = action;
      } else {
        actionSelector(val.children);
      }
    });
  };

  actionSelector(objectModel.children);

  _.forEach(actionsToBeRendered, (action) => {
    tasks += new TaskGenerator(action).renderTask();
  });

  return wf + tasks;
}
