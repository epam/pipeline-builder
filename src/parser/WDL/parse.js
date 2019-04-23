import _ from 'lodash';

import Context from './entities/Context';
import Parser from './hermes/wdl_parser';
import * as Constants from './constants';
import DataService from './../../dataServices/data-service';
import { extractImportsArray } from './utils/utils';

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
    status = false;
    message = e.message;
  }

  return {
    status,
    message,
    ast,
  };
}

function logicParsingStage(ast, data, imports = {}) {
  let status = true;
  let message = '';
  const model = [];
  const actions = [];

  try {
    const context = new Context(ast, data, imports);
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
      if (definition.attributes.expression) {
        definition.attributes.expression = null;
      }
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
    case Constants.CALL:
    default:
      definition = false;
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
    if (subWfDetailing.indexOf('*') >= 0) {
      return importedAst;
    }
    importedAst.attributes.body.list = importedAst.attributes.body.list.map((item) => {
      if (item.name.toLowerCase() === Constants.WORKFLOW
        && subWfDetailing.indexOf(item.attributes.name.source_string) < 0) {
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
function resolveImport(src) {
  const hermesRes = hermesStage(src);

  return hermesRes.status ? hermesRes.ast : null;
}

async function getImportChildrenRecursively(
  ast,
  { wdlArray = null, baseURI = null, subWfDetailing = [], recursionDepth = 0 }) {
  const importsDict = {};
  const imports = extractImportsArray(ast);

  if (imports.length && recursionDepth > -1) {
    const preparedSubWDLs = await getPreparedSubWDLs({ imports, wdlArray, baseURI });
    if (!preparedSubWDLs.status) {
      throw new Error('Error resolving imports');
    }
    await Promise.all(imports.map(async (importObject) => {
      const src = preparedSubWDLs.res[importObject.uri];
      let importedAst = resolveImport(src);
      if (!importedAst) {
        return Promise.reject('Error resolving imports');
      }

      importedAst = clearImportedAst(importedAst, recursionDepth, subWfDetailing);
      importsDict[importObject.name] = {
        imports: extractImportsArray(importedAst),
        src,
        ast: importedAst,
        children: await getImportChildrenRecursively(importedAst, {
          wdlArray,
          baseURI,
          subWfDetailing,
          recursionDepth: recursionDepth - 1,
        }),
      };

      return Promise.resolve();
    })).catch((e) => {
      throw new Error(e.message);
    });
  }

  return importsDict;
}

async function importsParse(
  ast,
  { wdlArray = null, baseURI = null, subWfDetailing = [], recursionDepth = 0 }) {
  const result = {
    message: '',
    status: true,
    imports: {},
  };

  const imports = extractImportsArray(ast);
  const importsDict = {
    imports,
    children: {},
  };

  if (imports.length) {
    try {
      importsDict.children = await getImportChildrenRecursively(
        ast,
        { wdlArray, baseURI, subWfDetailing, recursionDepth },
      );
    } catch (e) {
      result.message = e.message;
      result.status = false;
    }
  }

  result.imports = importsDict;

  return result;
}

async function parse(data, opts = {}) {
  let result = {
    status: true,
    message: '',
    model: [],
    actions: [],
  };

  let imports;
  const ret = hermesStage(data);
  result.status = ret.status;
  result.message = ret.message;
  const ast = ret.ast;

  if (result.status && ast) {
    const importOpts = {
      wdlArray: opts.wdlArray || null,
      baseURI: opts.baseURI || null,
      subWfDetailing: opts.subWfDetailing || null,
      recursionDepth: opts.recursionDepth || null,
    };

    const importParsingResult = await importsParse(ast, importOpts);
    result.status = importParsingResult.status;
    result.message = importParsingResult.message;
    imports = importParsingResult.imports;
  }

  if (result.status && (ast === undefined || ast === null) && !result.message) {
    result.status = false;
    result.message = 'No data to parse';
  }

  if (result.status) {
    result = logicParsingStage(ast, data, imports);
  }

  return result.status ? Promise.resolve(result) : Promise.reject(result.message);
}

export default parse;
