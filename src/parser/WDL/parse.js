import _ from 'lodash';

import Context from './entities/Context';
import Parser from './hermes/wdl_parser';
import * as Constants from './constants';

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
    .filter(item => item.name.toLowerCase() === Constants.IMPORT && item.attributes.uri)
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

function proceedCallInputs(ioItem, callNames, namespaces) {
  if (ioItem.name.toLowerCase() === Constants.CALL_INPUTS) {
    ioItem.attributes.map.list = ioItem.attributes.map.list.map((input) => {
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

  return ioItem;
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

function getNamespacesAndCallNames(calls) {
  const namespaces = [];
  const callNames = [];

  calls.forEach((c) => {
    const arr = c.split(Constants.NS_SPLITTER);
    namespaces.push(arr.shift());
    callNames.push((arr).join(Constants.NS_SPLITTER));
  });

  return [namespaces, callNames];
}

/** Returns ast with renamed calls, calls inputs and workflow outputs (xxx.xxx -> xxx_xxx) */
function updateFirstAst(firstAst, calls) {
  const resAst = firstAst;
  const [namespaces, callNames] = getNamespacesAndCallNames(calls);

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
              i.attributes.task.source_string = i.attributes.task.source_string
                .split(Constants.NS_SPLITTER).join(Constants.NS_CONNECTOR);

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

function getPreparedSubWDLs(opts) {
  const { wdlArray, baseURI } = opts;
  const res = {};

  if (wdlArray) {
    wdlArray.forEach((item) => {
      res[item.name] = item.wdl;
    });
  }

  if (baseURI) {
    // todo try get .wdl by url and add it to res
  }

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

function getNounCalls(calls, imports) {
  const nounCalls = {};
  const importNames = imports.map(imp => imp.name);

  calls.filter(call => importNames.includes(call.split(Constants.NS_SPLITTER)[0]))
    .forEach((call) => {
      const [nsName, ...callNameRest] = call.split(Constants.NS_SPLITTER);
      const chosenImport = imports.filter(imp => imp.name === nsName).shift();

      if (chosenImport) {
        const callName = callNameRest.join(Constants.NS_CONNECTOR);
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

  return nounCalls;
}

/** Return array of ast tasks/workflows */
function resolveCalls(calls, imports, preparedSubWdl) {
  const nounCalls = getNounCalls(calls, imports);

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
    hasImports: false,
    message: '',
    ast: {},
  };
  let astRes;

  // list parsed import statements in ast
  const imports = getImports(firstAst);

  if (!imports.length) {
    return result;
  }

  result.hasImports = true;

  if (!opts.wdlArray && !opts.baseURI) {
    result.status = false;
    result.message = 'Can\'t resolve imports';

    return result;
  }

  const preparedSubWDLs = getPreparedSubWDLs({
    imports,
    wdlArray: opts.wdlArray ? opts.wdlArray : null,
    baseURI: opts.baseURI ? opts.baseURI : null,
  });

  if (!preparedSubWDLs.status) {
    result.status = false;
    result.message = 'Can\'t resolve imports';

    return result;
  }

  // find calls in firstAst
  let calls = getCallsNames(getWorkflows(firstAst));

  if (calls.length) {
    const tasks = getTaskNames(firstAst);

    // check if calls're already in existing tasks
    calls = calls.filter(call => !tasks.includes(call));

    // change calls in firstAst, call's inputs & workflow outputs (xxx.xxx -> xxx_xxx)
    firstAst = updateFirstAst(firstAst, calls);
    // returns calls with ast
    const importedTasksAst = resolveCalls(calls, imports, preparedSubWDLs.res);
    // merge first hermes parsing ast with imports ast
    astRes = addSubWorkflows(firstAst, importedTasksAst);

    result.ast = astRes;
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
    const importOpts = {
      wdlArray: opts.wdlArray ? opts.wdlArray : null,
      baseURI: opts.baseURI ? opts.baseURI : null,
    };

    const importRes = importParsingStage(ast, importOpts);

    if (importRes.hasImports) {
      result.status = importRes.status;
      result.message = importRes.message;
      ast = importRes.ast;
    }
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
