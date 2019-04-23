import _ from 'lodash';

import TaskGenerator from './entities/TaskGenerator';
import WorkflowGenerator from './entities/WorkflowGenerator';
import ImportGenerator from './entities/ImportGenerator';

export default function generate(objectModel) {
  const settings = {};

  let imports = '';
  _.forEach(objectModel.imports, (imp, i) => {
    const importGen = new ImportGenerator(imp, settings);
    imports += importGen.renderImport();
    if (i === objectModel.imports.length - 1) {
      imports += importGen.renderEOL();
    }
  });

  const wf = new WorkflowGenerator(objectModel, settings).renderWorkflow();

  let tasks = '';
  const actionsToBeRendered = {};

  const actionSelector = (children) => {
    _.forEach(children, (val) => {
      if (!val.imported) {
        if (!val.type) {
          const action = val.action;
          actionsToBeRendered[action.name] = action;
        } else {
          actionSelector(val.children);
        }
      }
    });
  };

  actionSelector(objectModel.children);

  _.forEach(actionsToBeRendered, (action) => {
    tasks += new TaskGenerator(action).renderTask();
  });

  return imports + wf + tasks;
}
