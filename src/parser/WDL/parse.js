import _ from 'lodash';

import Context from './entities/Context';
import Parser from './hermes/wdl_parser';

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

export default function parse(data) {
  let result = {
    status: true,
    message: '',
    model: [],
    actions: [],
  };

  if (data === undefined || data === '') {
    result.status = false;
    result.message = 'No data to parse';
  }

  let ast;
  if (result.status) {
    const ret = hermesStage(data);
    result.status = ret.status;
    result.message = ret.message;
    ast = ret.ast;
  }

  if (result.status) {
    result = logicParsingStage(ast, data);
  }

  return result;
}
