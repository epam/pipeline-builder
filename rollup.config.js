/* eslint-env node */
/* global require */

import rollupPluginBabel from 'rollup-plugin-babel';
import rollupPluginCommonJS from 'rollup-plugin-commonjs';
import rollupPluginReplace from 'rollup-plugin-replace';

const version = require('./version');
const packageJson = require('./package.json');

const copyright = `${packageJson.description} v${version.combined} Copyright (c) 2017 ${packageJson.author}`;

export default {
  entry: './src/pipeline.js',
  banner: `/*! ${copyright} */`,
  external: ['lodash', 'jointjs'],
  globals: {
    lodash: '_',
    jointjs: 'joint',
  },
  plugins: [
    rollupPluginCommonJS({
      include: './src/parser/WDL/hermes/wdl_parser.js',
    }),
    rollupPluginBabel({
      babelrc: false,
      runtimeHelpers: true,
      presets: [['es2015', { modules: false }]],
      plugins: ['external-helpers'],
    }),
    rollupPluginReplace({
      PACKAGE_VERSION: JSON.stringify(version.combined),
    }),
  ],
  sourceMap: true,
  targets: [{
    format: 'umd',
    moduleName: 'pipeline',
    dest: packageJson.main,
  }, {
    format: 'es',
    dest: packageJson.module,
  }],
};
