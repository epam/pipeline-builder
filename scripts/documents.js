/* eslint-disable import/no-extraneous-dependencies */
const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const { cleanDocuments } = require('./clean');
// 'open' is an ESM module, so we cannot `require` it; instead, we should
// use `import()` statement

const jsdocConfig = {
  source: {
  },
  opts: {
    template: './docs/template',
    tutorials: './docs/tutorials',
    destination: './docs/auto',
    private: false,
  },
  plugins: [
    'plugins/underscore',
    'plugins/markdown',
    'node_modules/jsdoc-export-default-interop/dist/index',
  ],
  templates: {
    default: {
      outputSourceFiles: false,
      staticFiles: {
        include: [
          'node_modules/jsdoc/templates/default/static',
          './docs/template/static',
          './docs/tutorials',
        ],
      },
    },
  },
};

function buildJSDoc(cb) {
  return gulp.src([
    './README.md',
    './src/**/*.{js,ts}',

    '!./src/app/**/*.{js,ts}',
    '!./src/parser/WDL/**/*',
    '!./src/parser-new/**/*',
    '!./src/generator/WDL/**/*',
  ], { read: false })
    .pipe(jsdoc(jsdocConfig, cb));
}

async function showDocuments() {
  const { default: open } = await import('open');
  await open('./docs/auto/index.html');
}

const buildDocuments = gulp.series(cleanDocuments, buildJSDoc);

module.exports = {
  cleanDocuments,
  buildDocuments,
  showDocuments,
};
