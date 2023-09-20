/* eslint-disable import/no-extraneous-dependencies */
const gulp = require('gulp');
// 'del' is an ESM module, so we cannot `require` it; instead, we should
// use `import()` statement

/**
 * All paths here are relative to the project's root folder
 * (i.e., where package.json & gulpfile.js are located)
 */

/**
 * Cleans auto-generated documents
 */
async function cleanDocuments() {
  const { deleteAsync } = await import('del');
  await deleteAsync('./docs/auto');
}

async function cleanDistDirectory() {
  const { deleteAsync } = await import('del');
  await deleteAsync('./dist/');
}

async function cleanCoverage() {
  const { deleteAsync } = await import('del');
  await deleteAsync('./coverage/');
}

const clean = gulp.parallel(
  cleanDocuments,
  cleanCoverage,
);

module.exports = {
  clean,
  cleanDistDirectory,
  cleanDocuments,
  cleanCoverage,
};
