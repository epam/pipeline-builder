const gulp = require('gulp');
const build = require('./scripts/build');
const {
  clean,
  cleanDocuments,
  cleanCoverage,
  cleanDistDirectory,
} = require('./scripts/clean');
const {
  buildDocuments,
  showDocuments
} = require('./scripts/documents');

const buildAll = gulp.series(
  clean,
  gulp.parallel(
    buildDocuments,
    build,
  ),
);

const documents = gulp.series(
  buildDocuments,
  showDocuments,
);

module.exports = buildAll;

module.exports.build = build;
module.exports.buildAll = buildAll;
module.exports.buildDocuments = buildDocuments;
module.exports.clean = clean;
module.exports.cleanBuild = cleanDistDirectory;
module.exports.cleanCoverage = cleanCoverage;
module.exports.cleanDocuments = cleanDocuments;
module.exports.documents = documents;
