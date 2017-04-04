const os = require('os');

module.exports = {
  root: true,
  extends: 'airbnb-base',
  plugins: [
    'import',
  ],

  env: {
    browser: true,
  },

  globals: {
  },

  // current deviations from AirBnB setup (TODO: revisit later)
  rules: {
    'linebreak-style': ['warn', os.EOL === '\n'? 'unix' : 'windows'],
    'no-param-reassign': 0,
    'no-underscore-dangle': ['warn', { 'allowAfterThis': true }],
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'no-mixed-operators': ['error', {
      'groups': [
        // ['+', '-', '*', '/', '%', '**'], Was removed in order to enable expressions like: a * b + c
        ['&', '|', '^', '~', '<<', '>>', '>>>'],
        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
        ['&&', '||'],
        ['in', 'instanceof'],
      ],
      // 'allowSamePrecedence': false, Was changed because it reports expressions like a + b + c
      'allowSamePrecedence': true,
    }],
    'no-restricted-properties': ['error', {
      object: 'arguments',
      property: 'callee',
      message: 'arguments.callee is deprecated',
    }, {
      property: '__defineGetter__',
      message: 'Please use Object.defineProperty instead.',
    }, {
      property: '__defineSetter__',
      message: 'Please use Object.defineProperty instead.',
    }, /*{ Disabled due to inaccessibility of ** operator in ES2015
      object: 'Math',
      property: 'pow',
      message: 'Use the exponentiation operator (**) instead.',
    }*/],
    'max-len': ['error', 120, 2, {
      ignoreUrls: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
  },
};
