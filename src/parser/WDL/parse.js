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

function replaceDot(name) {
  let res;
  const splitted = name.split(Constants.NS_SPLITTER);
  if (splitted.length > 2) {
    const last = splitted.pop();
    res = `${splitted.join(Constants.NS_CONNECTOR)}${Constants.NS_SPLITTER}${last}`;
  } else {
    res = splitted.join(Constants.NS_CONNECTOR);
  }

  return res;
}

function renameCallInput(callInput, prefix, initialCalls) {
  if (callInput.name.toLowerCase() === Constants.CALL_IO_MAPPING) {
    const valueType = callInput.attributes.value.name ? callInput.attributes.value.name.toLowerCase() : null;
    if (valueType === Constants.IO_MEMBER_ACCESS) {
      const calls = initialCalls.map(call => call.split(Constants.NS_SPLITTER).pop());
      const index = calls.indexOf(callInput.attributes.value.attributes.lhs.source_string);
      if (index > -1) {
        callInput.attributes.value.attributes.lhs.source_string = `${prefix}${replaceDot(initialCalls[index])}`;
      }
    }
  }

  return callInput;
}

function renameCallInputs(callInputsItem, prefix, initialCalls) {
  if (callInputsItem.name.toLowerCase() === Constants.CALL_INPUTS) {
    callInputsItem.attributes.map.list = callInputsItem.attributes.map.list
      .map(callInput => renameCallInput(callInput, prefix, initialCalls));
  }
  return callInputsItem;
}

function renameWfOutput(output, prefix, initialCalls) {
  switch (output.name.toLowerCase()) {
    case Constants.WF_OUTPUT_DECLARATION:
      if (output.attributes.expression && output.attributes.expression.name
        && output.attributes.expression.name.toLowerCase() === Constants.IO_MEMBER_ACCESS) {
        const calls = initialCalls.map(call => call.split(Constants.NS_SPLITTER).pop());
        const index = calls.indexOf(output.attributes.expression.attributes.lhs.source_string);
        if (index > -1) {
          output.attributes.expression.attributes.lhs.source_string = `${prefix}${replaceDot(initialCalls[index])}`;
        }
      }
      break;
    default:
      break;
  }

  return output;
}

function renameCallAst(call, prefix, initialCalls) {
  if (!initialCalls.includes(call.attributes.task.source_string)) {
    initialCalls.push(call.attributes.task.source_string);
  }
  if (call.attributes.body && call.attributes.body.attributes && call.attributes.body.attributes.io) {
    call.attributes.body.attributes.io.list = call.attributes.body.attributes.io.list
      .map(callInput => renameCallInputs(callInput, prefix, initialCalls));
  }

  call.attributes.task.source_string = `${prefix}${replaceDot(call.attributes.task.source_string)}`;

  return call;
}

function renameWfDefinition(definition, prefix, initialCalls) {
  switch (definition.name.toLowerCase()) {
    case Constants.DECLARATION:
      break;
    case Constants.CALL:
      definition = renameCallAst(definition, prefix, initialCalls);
      break;
    case Constants.WF_OUTPUTS:
      definition.attributes.outputs.list = definition.attributes.outputs.list
        .map(output => renameWfOutput(output, prefix, initialCalls));
      break;
    default:
      definition.attributes.body.list = definition.attributes.body.list
        .map(def => renameWfDefinition(def, prefix, initialCalls));
      break;
  }

  return definition;
}

function renameWfAstNames(node, prefix) {
  node.attributes.name.source_string = `${prefix}${replaceDot(node.attributes.name.source_string)}`;
  const initialCalls = [];
  // declarations, calls, outputs
  node.attributes.body.list = node.attributes.body.list.map((definition) => {
    if (definition.name.toLowerCase() === Constants.CALL) {
      initialCalls.push(definition.attributes.task.source_string);
    }
    return renameWfDefinition(definition, prefix, initialCalls);
  });

  return node;
}

function renameTaskAstNames(node, prefix) {
  node.attributes.name.source_string = `${prefix}${replaceDot(node.attributes.name.source_string)}`;

  return node;
}

function renameAstNodeNames(node, prefix) {
  switch (node.name.toLowerCase()) {
    case Constants.WORKFLOW:
      node = renameWfAstNames(node, prefix);
      break;
    case Constants.TASK:
      node = renameTaskAstNames(node, prefix);
      break;
    default:
      break;
  }

  return node;
}

/** Returns ast with renamed calls, calls inputs and workflow outputs (xxx.xxx -> xxx_xxx) */
function updateAstNames(ast, prefix = '') {
  ast.attributes.body.list = ast.attributes.body.list
    .map(item => renameAstNodeNames(item, prefix));

  return ast;
}

function getPreparedSubWDLs(opts) {
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
  _.forEach(imports.map(imp => imp.uri), (importUri) => {
    if (!res[importUri]) {
      if (importUri.indexOf('file://') === 0) {
        message = 'Error resolving imports: "file://" protocol for imports is not supported';
        status = false;

        return false;
      }

      if (importUri.indexOf('http://') === 0 || importUri.indexOf('https://') === 0) {
        promises.push(DataService.get(`${importUri}`).then(data => ({ importUri, data })));

        return true;
      }

      if (!baseURI) {
        status = false;
        message = 'Error resolving imports: No baseURI presented';

        return false;
      }

      promises.push(DataService.get(baseURI.endsWith('/') ? `${baseURI}${importUri}` : `${baseURI}/${importUri}`)
        .then(data => ({ importUri, data })));
    }

    return true;
  });

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

function clearWfDefinition(definition) {
  switch (definition.name.toLowerCase()) {
    case Constants.DECLARATION:
      break;
    case Constants.CALL:
      definition = false;
      break;
    case Constants.WF_OUTPUTS:
      definition.attributes.outputs.list = definition.attributes.outputs.list
        .map((output) => {
          if (output.name.toLowerCase() === Constants.WF_OUTPUT_DECLARATION) {
            output.attributes.expression = null;
          }
          return output;
        });
      break;
    default:
      definition.attributes.body.list = definition.attributes.body.list.map(def => clearWfDefinition(def))
        .filter(i => !!i && !_.isArray(i));
      if (!definition.attributes.body.list.length) {
        definition = false;
      }
      break;
  }

  return definition;
}

function clearWorkflow(node) {
  node.attributes.body.list = node.attributes.body.list
    .map(wfDefinition => clearWfDefinition(wfDefinition)).filter(i => !!i && !_.isArray(i));

  return node;
}

function clearImportedAst(importedAst, recursionDepth = 0, subWfDetailing = []) {
  if (recursionDepth > 0) {
    if (subWfDetailing.includes('*')) {
      return importedAst;
    }
    importedAst.attributes.body.list = importedAst.attributes.body.list.map((item) => {
      if (item.name.toLowerCase() === Constants.WORKFLOW
        && !subWfDetailing.includes(item.attributes.name.source_string)) {
        item = clearWorkflow(item);
      }

      return item;
    });

    return importedAst;
  }
  importedAst.attributes.body.list = importedAst.attributes.body.list.map((item) => {
    if (item.name.toLowerCase() === Constants.WORKFLOW) {
      item = clearWorkflow(item);
    }

    return item;
  });

  return importedAst;
}

/** Returns import's ast */
function resolveImport(importObject, preparedSubWdl) {
  const hermesRes = hermesStage(preparedSubWdl[importObject.uri]);

  return hermesRes.status ? hermesRes.ast : null;
}

function mergeAst(ast, importedAstArray) {
  importedAstArray.forEach((importedAst) => {
    importedAst.attributes.body.list.forEach((item) => { ast.attributes.body.list.push(item); });
  });

  return ast;
}

/** Resolving WDL imports for ast */
async function importParsingStage(ast, opts) {
  const result = {
    status: true,
    message: '',
    ast,
  };
  const subWfDetailing = opts.subWfDetailing || [];
  const recursionDepth = opts.recursionDepth || 0;
  const wdlArray = opts.wdlArray || null;
  const baseURI = opts.baseURI || null;
  const parentNamespace = opts.parentNamespace || '';

  // list parsed import statements in ast
  const imports = getImports(ast);

  if (!imports.length) {
    return result;
  }

  const preparedSubWDLs = await getPreparedSubWDLs({ imports, wdlArray, baseURI });

  if (!preparedSubWDLs.status) {
    result.status = false;
    result.message = preparedSubWDLs.message ? preparedSubWDLs.message : 'Error resolving imports';

    return result;
  }

  if (!parentNamespace) {
    ast = updateAstNames(ast);
  }

  const resolvedImportsAsts = [];
  await Promise.all(imports.map(async (importObject) => {
    const newParentNamespace = `${parentNamespace}${importObject.name}_`;
    let importedAst = resolveImport(importObject, preparedSubWDLs.res);

    if (!importedAst) {
      result.status = false;
      result.message = 'Error resolving imports';
      return Promise.reject(result);
    }

    importedAst = updateAstNames(importedAst, newParentNamespace);

    if (recursionDepth > 0) {
      try {
        const importRes = await importParsingStage(importedAst, {
          wdlArray,
          baseURI,
          subWfDetailing,
          parentNamespace: newParentNamespace,
          recursionDepth: recursionDepth - 1,
        });
        importedAst = importRes.ast;
      } catch (e) {
        result.status = false;
        result.message = e.message;
      }
    }
    importedAst = clearImportedAst(importedAst, recursionDepth, subWfDetailing);

    resolvedImportsAsts.push(importedAst);

    return Promise.resolve(result);
  }));

  if (!result.status) {
    return result;
  }

  result.ast = mergeAst(ast, resolvedImportsAsts);

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
      recursionDepth: opts.recursionDepth || null,
    };

    try {
      const importRes = await importParsingStage(ast, importOpts);
      result.status = importRes.status;
      result.message = importRes.message;
      ast = importRes.ast;
    } catch (e) {
      result.status = e.status;
      result.message = e.message;
    }
  }

  if (result.status && (ast === undefined || ast === null) && !result.message) {
    result.status = false;
    result.message = 'No data to parse';
  }

  if (result.status) {
    result = logicParsingStage(ast, data);
  }

  return result.status ? Promise.resolve(result) : Promise.reject(result.message);
}
