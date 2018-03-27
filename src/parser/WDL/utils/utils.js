const binarySymbols = {
  Add: '+',
  Subtract: '-',
  Multiply: '*',
  Divide: '/',
  Remainder: '%',
  LogicalOr: '||',
  LogicalAnd: '&&',
  Equals: '==',
  NotEquals: '!=',
  LessThan: '<',
  LessThanOrEqual: '<=',
  GreaterThan: '>',
  GreaterThanOrEqual: '>=',
};

const binaryPriorities = {
  Add: 10,
  Subtract: 10,
  Multiply: 11,
  Divide: 11,
  Remainder: 9,
  LogicalOr: 5,
  LogicalAnd: 6,
  Equals: 4,
  NotEquals: 4,
  LessThan: 4,
  LessThanOrEqual: 4,
  GreaterThan: 4,
  GreaterThanOrEqual: 4,
  ObjectKV: 4,
};

const unarySymbols = {
  LogicalNot: '!',
  UnaryPlus: '+',
  UnaryNegation: '-',
};

const unaryUnScoped = [
  'FunctionCall',
  'MemberAccess',
  'LogicalNot',
  'UnaryPlus',
  'UnaryNegation',
  'ArrayOrMapLookup',
  'ArrayLiteral',
  'ObjectLiteral',
  'TupleLiteral',
  'string',
  'identifier',
  'boolean',
  'integer',
  'float',
];

function putEnumeratedExpressions(list, localRes, callback) {
  list.map(item => callback(item))
    .forEach((item, idx) => {
      localRes.accesses = localRes.accesses.concat(item.accesses);
      localRes.string += idx === 0 ? item.string : `, ${item.string}`;
    });
}

const processors = {
  FunctionCall: (scope) => {
    scope.res.string = `${scope.attr.name.source_string}(`;

    putEnumeratedExpressions(scope.attr.params.list, scope.res, scope.extractExpression);

    scope.res.string += ')';
    scope.res.type = 'FunctionCall';
  },
  MemberAccess: (scope) => {
    const left = scope.extractExpression(scope.attr.lhs);
    const right = scope.extractExpression(scope.attr.rhs);
    scope.res.string = `${left.string}.${right.string}`;
    scope.res.type = 'MemberAccess';
    scope.res.accesses = [{
      lhs: left.string,
      rhs: right.string,
    }];
  },
  Unary: (scope) => {
    const expr = scope.extractExpression(scope.attr.expression);
    if (unaryUnScoped.find(val => val === expr.type)) {
      scope.res.string = `${unarySymbols[scope.ast.name]}${expr.string}`;
    } else {
      scope.res.string = `${unarySymbols[scope.ast.name]}(${expr.string})`;
    }
    scope.res.type = scope.ast.name;
    scope.res.accesses = expr.accesses;
  },
  Binary: (scope) => {
    const left = scope.extractExpression(scope.attr.lhs);
    const right = scope.extractExpression(scope.attr.rhs);
    const [lLParen, lRParen] = binaryPriorities[scope.ast.name] > binaryPriorities[left.type] ? ['(', ')'] : ['', ''];
    const [rLParen, rRParen] = binaryPriorities[scope.ast.name] > binaryPriorities[right.type] ? ['(', ')'] : ['', ''];

    scope.res.string = `${lLParen}${left.string}${lRParen}`;
    scope.res.string += ` ${binarySymbols[scope.ast.name]} `;
    scope.res.string += `${rLParen}${right.string}${rRParen}`;

    scope.res.type = scope.ast.name;
    scope.res.accesses = scope.res.accesses.concat(left.accesses).concat(right.accesses);
  },
  Ternary: (scope) => {
    const cond = scope.extractExpression(scope.attr.cond);
    const ifTrue = scope.extractExpression(scope.attr.iftrue);
    const ifFalse = scope.extractExpression(scope.attr.iffalse);

    scope.res.string = `if ${cond.string} then ${ifTrue.string} else ${ifFalse.string}`;

    scope.res.type = scope.ast.name;
    scope.res.accesses = scope.res.accesses.concat(cond.accesses).concat(ifTrue.accesses).concat(ifTrue.ifFalse);
  },
  Kv: (scope) => {
    const left = scope.attr.key.source_string;
    const right = scope.extractExpression(scope.attr.value);

    scope.res.string = `${left} : ${right.string}`;

    scope.res.type = scope.ast.name;
    scope.res.accesses = scope.res.accesses.concat(right.accesses);
  },
  ArrayOrMapLookup: (scope) => {
    const left = scope.extractExpression(scope.attr.lhs);
    const right = scope.extractExpression(scope.attr.rhs);
    scope.res.string = `${left.string}[${right.string}]`;
    scope.res.type = 'ArrayOrMapLookup';
    scope.res.accesses = scope.res.accesses.concat(left.accesses).concat(right.accesses);
  },
  ArrayLiteral: (scope) => {
    scope.res.string = '[';

    putEnumeratedExpressions(scope.attr.values.list, scope.res, scope.extractExpression);
    scope.res.type = scope.ast.name;

    scope.res.string += ']';
  },
  ObjectLiteral: (scope) => {
    scope.res.string = 'object {';

    putEnumeratedExpressions(scope.attr.map.list, scope.res, scope.extractExpression);
    scope.res.type = scope.ast.name;

    scope.res.string += '}';
  },
  MapLiteral: (scope) => {
    scope.res.string = '{';

    putEnumeratedExpressions(scope.attr.map.list, scope.res, scope.extractExpression);
    scope.res.type = scope.ast.name;

    scope.res.string += '}';
  },
  TupleLiteral: (scope) => {
    scope.res.string = '(';

    putEnumeratedExpressions(scope.attr.values.list, scope.res, scope.extractExpression);
    scope.res.type = scope.ast.name;

    scope.res.string += ')';
  },
  Identifier: (scope) => {
    scope.res.string = scope.ast.source_string;
    scope.res.type = scope.ast.str;

    scope.res.accesses = scope.res.accesses.concat(scope.ast.source_string);
  },
  default: (scope) => {
    if (scope.ast.str === 'string') {
      scope.res.string = `"${JSON.stringify(scope.ast.source_string).slice(1, -1)}"`;
      scope.res.type = 'string';
    } else {
      scope.res.string = scope.ast.source_string;
      scope.res.type = scope.ast.str;
    }
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
 * Build the string from entire ast expression subtree
 * @param {ast} ast - Ast tree node to be expressed
 */
export function extractExpression(ast) {
  const res = {
    string: '',
    type: '',
    accesses: [],
  };

  if (!ast) {
    return res;
  }

  const attr = ast.attributes;

  const scope = {
    res,
    ast,
    extractExpression,
    attr,
  };

  processors[processorRemap[ast.name || ast.str]](scope);
  return res;
}

/**
 * Build the string from entire ast type subtree
 * @param {ast} declarationNode - Ast tree node to be expressed
 */
export function extractType(declarationNode) {
  if (declarationNode === undefined || declarationNode === null) {
    throw new Error('WDL type node could not be empty');
  }

  let res = '';
  if (declarationNode.source_string) {
    res = declarationNode.source_string;
  } else if (declarationNode.attributes) {
    if (declarationNode.name === 'Type') {
      const attr = declarationNode.attributes;
      res = `${attr.name.source_string}[`;
      attr.subtype.list.map(item => extractType(item))
        .forEach((item, idx) => {
          res += idx === 0 ? item : `, ${item}`;
        }, '');

      res += ']';
    } else {
      res = `${extractType(declarationNode.attributes.innerType)}`;
      res += `${declarationNode.name === 'NonEmptyType' ? '+' : '?'}`;
    }
  }
  return res;
}

export function extractMetaBlock(list, filter, desc) {
  list.forEach((item) => {
    const attributes = item.attributes;
    const key = attributes.key.source_string;

    if (desc.data[filter] === undefined) {
      desc.data[filter] = {};
    }

    desc.data[filter][key] = extractExpression(attributes.value).string;
  });
}

export class WDLParserError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WDLParserError';
  }
}
