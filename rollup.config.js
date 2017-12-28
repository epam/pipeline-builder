/* eslint-env node */
/* global require */

import rollupPluginBabel from 'rollup-plugin-babel';
import rollupPluginCommonJS from 'rollup-plugin-commonjs';
import rollupPluginReplace from 'rollup-plugin-replace';
import rollupPluginNodeResolve from 'rollup-plugin-node-resolve';

const version = require('./version');
const packageJson = require('./package.json');

const copyright = `${packageJson.description} v${version.combined} Copyright (c) 2017 ${packageJson.author}`;

export default {
  entry: './src/pipeline.js',
  banner: `/*! ${copyright} */`,
  external: ['lodash', 'jszip'],
  globals: {
    lodash: '_',
    jszip: 'JSZip',
  },
  plugins: [
    rollupPluginNodeResolve(),
    rollupPluginCommonJS({
      include: ['./node_modules/**', './src/parser/WDL/hermes/wdl_parser.js'],
      namedExports: {
        './node_modules/jointjs/dist/joint.min.js': ['joint', 'V', 'g'],
      },
    }),
    rollupPluginBabel({
      babelrc: false,
      runtimeHelpers: true,
      presets: [['env', { modules: false }]],
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
