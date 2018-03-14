import * as Constants from '../constants';

/**
 * Replaces {@link Constants}.{@link NS_SPLITTER} with {@link Constants}.{@link NS_CONNECTOR} in the name string
 * @param {String} name - the name string to handle
 * */
export function replaceSplitter(name) {
  let res;
  const split = name.split(Constants.NS_SPLITTER);
  if (split.length > 2) {
    const last = split.pop();
    res = `${split.join(Constants.NS_CONNECTOR)}${Constants.NS_SPLITTER}${last}`;
  } else {
    res = split.join(Constants.NS_CONNECTOR);
  }

  return res;
}

function putEnumeratedExpressions(list, localScope, callback) {
  list.forEach(item => callback(item, localScope.prefix, localScope.initialCalls));
}

const processors = {
  FunctionCall: (scope) => {
    putEnumeratedExpressions(scope.attr.params.list, scope, scope.renameExpression);
  },
  MemberAccess: (scope) => {
    scope.renameExpression(scope.attr.lhs, scope.prefix, scope.initialCalls);
  },
  Unary: (scope) => {
    scope.renameExpression(scope.attr.expression, scope.prefix, scope.initialCalls);
  },
  Binary: (scope) => {
    scope.renameExpression(scope.attr.lhs, scope.prefix, scope.initialCalls);
    scope.renameExpression(scope.attr.rhs, scope.prefix, scope.initialCalls);
  },
  Ternary: (scope) => {
    scope.renameExpression(scope.attr.cond, scope.prefix, scope.initialCalls);
    scope.renameExpression(scope.attr.iftrue, scope.prefix, scope.initialCalls);
    scope.renameExpression(scope.attr.iffalse, scope.prefix, scope.initialCalls);
  },
  Kv: (scope) => {
    scope.renameExpression(scope.attr.value, scope.prefix, scope.initialCalls);
  },
  ArrayOrMapLookup: (scope) => {
    scope.renameExpression(scope.attr.lhs, scope.prefix, scope.initialCalls);
    scope.renameExpression(scope.attr.rhs, scope.prefix, scope.initialCalls);
  },
  ArrayLiteral: (scope) => {
    putEnumeratedExpressions(scope.attr.values.list, scope, scope.renameExpression);
  },
  ObjectLiteral: (scope) => {
    putEnumeratedExpressions(scope.attr.map.list, scope, scope.renameExpression);
  },
  MapLiteral: (scope) => {
    putEnumeratedExpressions(scope.attr.map.list, scope, scope.renameExpression);
  },
  TupleLiteral: (scope) => {
    putEnumeratedExpressions(scope.attr.values.list, scope, scope.renameExpression);
  },
  Identifier: (scope) => {
    const calls = scope.initialCalls.map(call => call.split(Constants.NS_SPLITTER).pop());
    const index = calls.indexOf(scope.ast.source_string);
    if (index > -1) {
      scope.ast.source_string = `${scope.prefix}${replaceSplitter(scope.initialCalls[index])}`;
    }
  },
  default: () => {
    // no need to rename these types of declarations
  },
};

const processorRemap = {
  ArrayOrMapLookup: 'ArrayOrMapLookup',
  FunctionCall: 'FunctionCall',
  MemberAccess: 'MemberAccess',
  ArrayLiteral: 'ArrayLiteral',
  ObjectLiteral: 'ObjectLiteral',
  MapLiteral: 'MapLiteral',
  TupleLiteral: 'TupleLiteral',
  identifier: 'Identifier',

  string: 'default',
  boolean: 'default',
  integer: 'default',
  float: 'default',

  LogicalNot: 'Unary',
  UnaryPlus: 'Unary',
  UnaryNegation: 'Unary',

  Add: 'Binary',
  Subtract: 'Binary',
  Multiply: 'Binary',
  Divide: 'Binary',
  Remainder: 'Binary',
  LogicalOr: 'Binary',
  LogicalAnd: 'Binary',
  Equals: 'Binary',
  NotEquals: 'Binary',
  LessThan: 'Binary',
  LessThanOrEqual: 'Binary',
  GreaterThan: 'Binary',
  GreaterThanOrEqual: 'Binary',

  TernaryIf: 'Ternary',

  MapLiteralKv: 'Kv',
  ObjectKV: 'Kv',
};

/**
 * Changes declaration's names in entire ast expression subtree according to prefix and initialCalls parameters
 * @param {ast} ast - Ast tree node to be expressed
 * @param {String} prefix - name prefix
 * @param {[String]} initialCalls - array of initial call's names that need to be renamed
 */
export function renameExpression(ast, prefix, initialCalls) {
  if (!ast) {
    return;
  }

  const attr = ast.attributes;

  const scope = {
    ast,
    prefix,
    initialCalls,
    renameExpression,
    attr,
  };

  processors[processorRemap[ast.name || ast.str]](scope);
}
