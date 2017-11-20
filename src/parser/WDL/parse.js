import _ from 'lodash';

import Context from './entities/Context';
import Parser from './hermes/wdl_parser';

const Constants = {
  NS_SPLITTER: '.',
  NS_CONNECTOR: '_',

  IMPORT_STATEMENT: 'import',
  WORKFLOW: 'workflow',
  TASK: 'task',

  DECLARATION: 'declaration',
  CALL: 'call',

  CALL_INPUTS: 'inputs',
  CALL_IO_MAPPING: 'iomapping',
  WF_OUTPUTS: 'workflowoutputs',
  WF_OUTPUT_DECLARATION: 'workflowoutputdeclaration',

  IO_MEMBER_ACCESS: 'memberaccess',
  IO_FUNCTION_CALL: 'functioncall',
};

function hermesStage(data) {
  let tokens;
  let parseResult;
  let ast;
  let status = true;
  let message = '';

  try {
    tokens = Parser.lex(data);
    parseResult = Parser.parse(tokens);
    ast = parseResult.to_ast();
  } catch (e) {
    if (e.name && e.name === 'SyntaxError') {
      status = false;
      message = e.message;
    } else {
      throw e;
    }
  }

  return {
    status,
    message,
    ast,
  };
}

function logicParsingStage(ast, data) {
  let status = true;
  let message = '';
  const model = [];
  const actions = [];

  try {
    const context = new Context(ast, data);
    _.assign(model, context.workflowList);
    _.assign(actions, _.values(context.actionMap));
  } catch (e) {
    if (e.name && e.name === 'WDLParserError') {
      status = false;
      message = e.message;
    } else {
      throw e;
    }
  }

  return {
    status,
    message,
    model,
    actions,
  };
}

function getImports(ast) {
  const importsDefinitions = ast.attributes.imports;

  return importsDefinitions ? importsDefinitions.list
    .filter(item => item.name.toLowerCase() === Constants.IMPORT_STATEMENT && item.attributes.uri)
    .map(imp => ({
      name: imp.attributes.namespace && imp.attributes.namespace.source_string
                ? imp.attributes.namespace.source_string
                : imp.attributes.uri.source_string,
      uri: imp.attributes.uri.source_string,
    })) : [];
}

function getWorkflows(ast) {
  return ast.attributes.body.list.filter(item => item.name.toLowerCase() === Constants.WORKFLOW);
}

function getCallsNames(workflows) {
  const calls = [];
  workflows.forEach((wf) => {
    const findCalls = list => list.forEach((item) => {
      if (item.name.toLowerCase() !== Constants.DECLARATION && item.name.toLowerCase() !== Constants.WF_OUTPUTS) {
        if (item.name.toLowerCase() === Constants.CALL) {
          calls.push(item.attributes.task.source_string);
          return;
        }
        findCalls(item.attributes.body.list);
      }
    });

    findCalls(wf.attributes.body.list);
  });

  return calls;
}

function getTaskNames(ast) {
  return ast.attributes.body.list.filter(item => item.name.toLowerCase() === Constants.TASK)
    .map(task => task.attributes.name.source_string);
}

function proceedCallInputs(io, callNames, namespaces) {
  if (io.name.toLowerCase() === Constants.CALL_INPUTS) {
    io.attributes.map.list = io.attributes.map.list.map((input) => {
      if (input.name.toLowerCase() === Constants.CALL_IO_MAPPING) {
        const valueType = input.attributes.value.name ? input.attributes.value.name.toLowerCase() : null;

        if (valueType === Constants.IO_MEMBER_ACCESS) {
          const index = callNames.indexOf(input.attributes.value.attributes.lhs.source_string);

          if (index > -1) {
            input.attributes.value.attributes.lhs.source_string = `${namespaces[index]}_${callNames[index]}`;
          }
        } else if (valueType === Constants.IO_FUNCTION_CALL) {
          const index = callNames.indexOf(input.attributes.value.attributes.name.source_string);

          if (index > -1) {
            input.attributes.value.attributes.name.source_string = `${namespaces[index]}_${callNames[index]}`;
          }
        } else {
          const index = callNames.indexOf(input.attributes.value.source_string);

          if (index > -1) {
            input.attributes.value.source_string = `${namespaces[index]}_${callNames[index]}`;
          }
        }
      }

      return input;
    });
  }

  return io;
}

function proceedWfOutput(output, namespaces, callNames) {
  if (output.name.toLowerCase() !== Constants.WF_OUTPUT_DECLARATION) return output;

  const valueType = output.attributes.expression.name
    ? output.attributes.expression.name.toLowerCase()
    : null;

  if (valueType === Constants.IO_MEMBER_ACCESS) {
    const index = callNames.indexOf(output.attributes.expression.attributes.lhs.source_string);

    if (index > -1) {
      output.attributes.expression.attributes.lhs.source_string = `${namespaces[index]}_${callNames[index]}`;
    }
  }

  return output;
}

/** Return ast with changed calls and workflow outputs */
function changeCalls(firstAst, calls) { // todo find out a better function name
  const nsSplitter = Constants.NS_SPLITTER;
  const nsConnector = Constants.NS_CONNECTOR;
  const resAst = firstAst;
  const namespaces = [];
  const callNames = [];

  calls.forEach((c) => {
    const arr = c.split(nsSplitter);
    namespaces.push(arr.shift());
    callNames.push((arr).join(nsSplitter));
  });

  resAst.attributes.body.list = resAst.attributes.body.list
    .map((item) => {
      if (item.name.toLowerCase() !== Constants.WORKFLOW) {
        return item;
      }

      const change = list => list.map((i) => {
        if (i.name.toLowerCase() !== Constants.DECLARATION) {
          if (i.name.toLowerCase() === Constants.CALL) {
            i.attributes.body.attributes.io.list = i.attributes.body.attributes.io.list
              .map(io => proceedCallInputs(io, callNames, namespaces));

            if (calls.includes(i.attributes.task.source_string)) {
              i.attributes.task.source_string = i.attributes.task.source_string.split(nsSplitter).join(nsConnector);

              return i;
            }

            return i;
          } else if (i.name.toLowerCase() === Constants.WF_OUTPUTS) {
            i.attributes.outputs.list = i.attributes.outputs.list
              .map(output => proceedWfOutput(output, namespaces, callNames));

            return i;
          }

          i.attributes.body.list = change(i.attributes.body.list);

          return i;
        }

        return i;
      });

      item.attributes.body.list = change(item.attributes.body.list);
      return item;
    });

  return resAst;
}

// todo baseUrl files check
function getPreparedSubWDLs(wdlArray) {
  const res = {};

  wdlArray.forEach((item) => {
    res[item.name] = item.wdl;
  });

  return res;
}

function clearWorkflowCallsAndOutputs(workflows) {
  return workflows.map((wf) => {
    const clearWf = list => list.map((item) => {
      if (item.name.toLowerCase() !== Constants.DECLARATION && item.name.toLowerCase() !== Constants.WF_OUTPUTS) {
        if (item.name.toLowerCase() === Constants.CALL) {
          return false;
        }
        return clearWf(item.attributes.body.list);
      } else if (item.name.toLowerCase() === Constants.WF_OUTPUTS) {
        item.attributes.outputs.list = item.attributes.outputs.list.map((output) => {
          if (output.name.toLowerCase() === Constants.WF_OUTPUT_DECLARATION) {
            const newOut = output;
            newOut.attributes.expression = null;
            return newOut;
          }
          return output;
        });
      }
      return item;
    }).filter(i => !!i);

    wf.attributes.body.list = clearWf(wf.attributes.body.list);
    return wf;
  });
}

/** Return array of ast tasks/workflows */
function resolveCalls(calls, imports, preparedSubWdl) {
  const nsSplitter = Constants.NS_SPLITTER;
  const nsConnector = Constants.NS_CONNECTOR;
  const importNames = imports.map(imp => imp.name);
  const nounCalls = {};

  calls.filter(call => importNames.includes(call.split(nsSplitter)[0]))
    .forEach((call) => {
      const [nsName, ...callNameRest] = call.split(nsSplitter);
      const chosenImport = imports.filter(imp => imp.name === nsName).shift();

      if (chosenImport) {
        const callName = callNameRest.join(nsConnector);
        if (!nounCalls[nsName]) {
          nounCalls[nsName] = {};
        }
        nounCalls[nsName].importObject = chosenImport;

        if (nounCalls[nsName].callNames && _.isArray(nounCalls[nsName].callNames)) {
          nounCalls[nsName].callNames.push(callName);
        } else {
          nounCalls[nsName].callNames = [callName];
        }
      }
    });

  const foundTasks = [];
  Object.entries(nounCalls).forEach((entry) => {
    const [nsName, v] = entry;
    const hermesRes = hermesStage(preparedSubWdl[v.importObject.uri]);
    const importAst = hermesRes.status ? hermesRes.ast : null;

    if (!importAst) { return; }
    // find tasks
    importAst.attributes.body.list
      .filter(item => item.name.toLowerCase() === Constants.TASK
        && v.callNames.includes(item.attributes.name.source_string))
      .forEach((task) => {
        task.attributes.name.source_string = `${nsName}_${task.attributes.name.source_string}`;
        foundTasks.push(task);
      });

    // and find workFlows
    getWorkflows(importAst)
      .filter(item => v.callNames.includes(item.attributes.name.source_string))
      // convert workflow to task to enable it's presentation
      .forEach((wf) => {
        wf.attributes.name.source_string = `${nsName}_${wf.attributes.name.source_string}`;
        // clear wf calls and outputs expressions
        wf = clearWorkflowCallsAndOutputs([wf])[0];
        foundTasks.push(wf);
        // region resolving wf calls (don't need it now)
/*
        // find calls in firstAst
        const wfCalls = getCallsNames([wf]);

        if (wfCalls.length) {
          // const tasks = getTaskNames(wf);

          importAst.attributes.body.list
            .filter(item => item.name.toLowerCase() === Constants.TASK && wfCalls.includes(item.attributes.name.source_string))
            .forEach((task) => {
              // task.attributes.name.source_string = `${nsName}_${task.attributes.name.source_string}`;
              foundTasks.push(task);
            });
        }
*/
        // endregion
      });
  });

  return foundTasks;
}

function addSubWorkflows(ast, importedAst) {
  const resAst = ast;
  importedAst.forEach(item => resAst.attributes.body.list.push(item));

  return resAst;
}

/** Parse function with WDL imports support */
function importParsingStage(firstAst, opts) {
  const result = {
    status: true,
    message: '',
    ast: {},
  };
  let astRes;

  // list parsed import statements in ast
  const imports = getImports(firstAst);

  // todo check imports in opts.wdlArray
  if (imports.length && opts.wdlArray) {
    // find calls in firstAst
    let calls = getCallsNames(getWorkflows(firstAst));

    if (calls.length) {
      const tasks = getTaskNames(firstAst);

      // check if calls're already in existing tasks
      calls = calls.filter(call => !tasks.includes(call));

      // change calls in firstAst (xxx.xxx to xxx_xxx) & change call's inputs
      firstAst = changeCalls(firstAst, calls);
      // returns calls with ast
      const importedTasksAst = resolveCalls(calls, imports, getPreparedSubWDLs(opts.wdlArray));
      // merge first hermes parsing ast with imports ast
      astRes = addSubWorkflows(firstAst, importedTasksAst);

      result.ast = astRes;
    }
  }

  if (!astRes) {
    result.status = false;
    result.message = 'Error resolving imports';
    result.ast = null;
  }

  return result;
}

export default function parse(data, opts) {
  let result = {
    status: true,
    message: '',
    model: [],
    actions: [],
  };

  let ast;
  if (result.status) {
    const ret = hermesStage(data);
    result.status = ret.status;
    result.message = ret.message;
    ast = ret.ast;
  }

  if (result.status) {
    const importOpts = {};

    if (opts.wdlArray) {
      importOpts.wdlArray = opts.wdlArray;
    }

    const importRes = importParsingStage(ast, importOpts);

    result.status = importRes.status;
    result.message = importRes.message;
    ast = importRes.ast;
  }

  if (result.status && (ast === undefined || ast === null)) {
    result.status = false;
    result.message = 'No data to parse';
  }

  if (result.status) {
    result = logicParsingStage(ast, data);
  }

  return result;
}
