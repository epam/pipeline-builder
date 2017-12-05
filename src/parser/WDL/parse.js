import _ from 'lodash';

import Context from './entities/Context';
import Parser from './hermes/wdl_parser';
import * as Constants from './constants';
import DataService from './../../dataServices/data-services';

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
    .map((imp) => {
      let name;
      if (imp.attributes.namespace && imp.attributes.namespace.source_string) {
        name = imp.attributes.namespace.source_string;
      } else {
        const uri = imp.attributes.uri.source_string.split('/').pop();
        const index = uri.indexOf('.wdl');
        const length = uri.length;

        if (length - index === 4) {
          name = uri.slice(0, index - length);
        } else {
          name = uri;
        }
      }

      return {
        name,
        uri: imp.attributes.uri.source_string,
      };
    }) : [];
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
function updateFirstAst(firstAst, calls = [], notRootAst = false) {
  const resAst = firstAst;
  const [namespaces, callNames] = getNamespacesAndCallNames(calls);
  notRootAst = !!notRootAst;

  resAst.attributes.body.list = resAst.attributes.body.list
    .map((item) => {
      if (item.name.toLowerCase() !== Constants.WORKFLOW) {
        return item;
      }

      const change = list => list.map((i) => {
        if (i.name.toLowerCase() !== Constants.DECLARATION) {
          if (i.name.toLowerCase() === Constants.CALL) {
            if (i.attributes.body && i.attributes.body.attributes && i.attributes.body.attributes.io) {
              i.attributes.body.attributes.io.list = i.attributes.body.attributes.io.list
                .map(io => proceedCallInputs(io, callNames, namespaces));
            }

            if (notRootAst) {
              if (callNames.includes(i.attributes.task.source_string)) {
                const index = callNames.indexOf(i.attributes.task.source_string);
                const prefix = namespaces[index] && namespaces[index].split(Constants.NS_CONNECTOR).length > 1
                  ? namespaces[index].split(Constants.NS_CONNECTOR).shift() : namespaces[index];

                i.attributes.task.source_string = `${prefix}_${i.attributes.task.source_string
                  .split(Constants.NS_SPLITTER).join(Constants.NS_CONNECTOR)}`;

                return i;
              }
            } else if (calls.includes(i.attributes.task.source_string)) {
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

function getPreparedSubWDLs(opts = {}) {
  const { wdlArray, baseURI, imports } = opts;
  const res = {};
  let status = true;
  let message = '';

  if (wdlArray) {
    wdlArray.forEach((item) => {
      res[item.name] = item.wdl;
    });
  }

  const promises = [];
  /* eslint-disable */
  _.forEach(imports.map(imp => imp.uri), (importUri) => {
    if (!res[importUri]) {
      if (importUri.indexOf('file://') === 0) {
        message = '"file://" protocol for imports is not supported';
        status = false;

        // exit forEach
        return false;
      }

      if (importUri.indexOf('http://') === 0 || importUri.indexOf('https://') === 0) {
        promises.push(DataService.get(`${importUri}`).then(data => ({ importUri, data })));

        return;
      }

      if (!baseURI) {
        status = false;

        // exit forEach
        return false;
      }

      promises.push(DataService.get(baseURI.endsWith('/') ? `${baseURI}${importUri}` : `${baseURI}/${importUri}`)
        .then(data => ({ importUri, data })));
    }
  });
  /* eslint-enable */

  return new Promise((resolve) => {
    Promise.all(promises).then((response) => {
      _.forEach(response, (source) => {
        res[source.importUri] = source.data;
      });
      resolve({ status, res, message });
    }).catch(() => {
      status = false;
      resolve({ status, res, message });
    });
  });
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
    }).filter(i => !!i && !_.isArray(i));

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
async function resolveCalls(calls, imports, preparedSubWdl, opts = {}) {
  const nounCalls = getNounCalls(calls, imports);
  const subWfDetailing = (opts.subWfDetailing && _.isArray(opts.subWfDetailing)) ? opts.subWfDetailing : [];
  const deepResolving = opts.deepResolving || 0;
  const wdlArray = opts.wdlArray ? opts.wdlArray : null;
  const baseURI = opts.baseURI ? opts.baseURI : null;


  const foundAsts = [];
  await Promise.all(Object.entries(nounCalls).map(async (entry) => {
    const [nsName, v] = entry;
    const hermesRes = hermesStage(preparedSubWdl[v.importObject.uri]);
    let importAst = hermesRes.status ? hermesRes.ast : null;
    let subAst;

    if (!importAst) { return; }

    const workflows = getWorkflows(importAst);

    let includesWf = false;
    const wfNames = workflows.map(wf => wf.attributes.name.source_string);

    if (subWfDetailing.includes('*')) {
      includesWf = true;
    } else {
      _.forEach(wfNames, (name) => {
        if (subWfDetailing.includes(name)) {
          includesWf = true;
          return false;
        }
        return true;
      });
    }

    if (deepResolving > 0 && workflows.length > 0 && (subWfDetailing.includes('*') || includesWf)) {
      // eslint-disable-next-line no-use-before-define
      subAst = await importParsingStage(importAst,
        { deepResolving: deepResolving - 1, subWfDetailing, wdlArray, baseURI });
      if (subAst.status) {
        subAst.modifiedUnfilteredCalls = subAst.modifiedUnfilteredCalls.map(call => `${nsName}${call.split(Constants.NS_SPLITTER).length > 1 ? '_' : '.'}${call}`);
        importAst = updateFirstAst(subAst.ast, subAst.modifiedUnfilteredCalls, true);
      }
    }

    // find tasks and workFlows
    importAst.attributes.body.list
    // if deep resolving this wf - need all tasks, otherwise - only those used in root wf
      .filter(item => includesWf || v.callNames.includes(item.attributes.name.source_string))
      .forEach((astItem) => {
        astItem.attributes.name.source_string = `${nsName}_${astItem.attributes.name.source_string}`;
        if (astItem.name.toLowerCase() === Constants.WORKFLOW) {
          if (!subWfDetailing.includes('*') && !subWfDetailing.includes(astItem.attributes.name.source_string)) {
            // clear sub wf calls and outputs expressions
            astItem = clearWorkflowCallsAndOutputs([astItem])[0];
          }
        }
        foundAsts.push(astItem);
      });
  }));

  return foundAsts;
}

function addSubWorkflows(ast, importedAst) {
  const resAst = ast;
  importedAst.forEach(item => resAst.attributes.body.list.push(item));

  return resAst;
}

function modifyUnfilteredCalls(unfilteredCalls) {
  return unfilteredCalls.map(call => call.split(Constants.NS_SPLITTER).join(Constants.NS_CONNECTOR));
}

/** Parse function with WDL imports support */
async function importParsingStage(firstAst, opts = {}) {
  const result = {
    status: true,
    message: '',
    ast: firstAst,
    unfilteredCalls: [],
    filteredCalls: [],
    modifiedUnfilteredCalls: [],
  };
  const subWfDetailing = opts.subWfDetailing || null;
  const deepResolving = opts.deepResolving || null;
  const wdlArray = opts.wdlArray ? opts.wdlArray : null;
  const baseURI = opts.baseURI ? opts.baseURI : null;

  // list parsed import statements in ast
  const imports = getImports(firstAst);

  // find calls in firstAst
  result.unfilteredCalls = getCallsNames(getWorkflows(firstAst));
  result.modifiedUnfilteredCalls = result.unfilteredCalls;

  if (!imports.length) {
    return result;
  }

  const tasks = getTaskNames(firstAst);

  // check if calls're already in existing tasks
  result.filteredCalls = result.unfilteredCalls.filter(call => !tasks.includes(call));
  if (!result.filteredCalls.length) return result;

  const preparedSubWDLs = await getPreparedSubWDLs({ imports, wdlArray, baseURI });

  if (!preparedSubWDLs.status) {
    result.status = false;
    result.message = preparedSubWDLs.message ? preparedSubWDLs.message : 'Can\'t resolve imports';

    return result;
  }
  result.modifiedUnfilteredCalls = modifyUnfilteredCalls(result.unfilteredCalls);

  // change calls in firstAst, call's inputs & workflow outputs (xxx.xxx -> xxx_xxx)
  firstAst = updateFirstAst(firstAst, result.filteredCalls);
  // returns calls with ast
  const importedTasksAst = await resolveCalls(result.filteredCalls, imports, preparedSubWDLs.res,
    { subWfDetailing, deepResolving, wdlArray, baseURI });

  // merge first hermes parsing ast with imports ast
  result.ast = addSubWorkflows(firstAst, importedTasksAst);

  return result;
}

export default async function parse(data, opts = {}) {
  let result = {
    status: true,
    message: '',
    model: [],
    actions: [],
  };

  let ast;
  const ret = hermesStage(data);
  result.status = ret.status;
  result.message = ret.message;
  ast = ret.ast;

  if (result.status && ast) {
    const importOpts = {
      wdlArray: opts.wdlArray || null,
      baseURI: opts.baseURI || null,
      subWfDetailing: opts.subWfDetailing || null,
      deepResolving: opts.deepResolving || null,
    };

    const importRes = await importParsingStage(ast, importOpts);

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

  return result.status ? Promise.resolve(result) : Promise.reject(result.message);
}
