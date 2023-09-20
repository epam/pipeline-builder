const path = require('path');

module.exports = {
  env: {
    'browser': true,
    'es2021': true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'airbnb-base',
    'airbnb-typescript/base'
  ],
  overrides: [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: path.resolve(__dirname, './tsconfig.json')
  },
  plugins: [
    '@typescript-eslint',
    'react'
  ],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-underscore-dangle': 'off',
    'no-console': 'off',
  },
  ignorePatterns: [
    '*rc.js',
    '*rc.json',
    '*.config.js',
    '*.config.json',
    'docs/**/*',
    'scripts/**/*',
    'gulpfile.js',
    'src/parser/WDL/antlr4/**/*'
  ]
};
