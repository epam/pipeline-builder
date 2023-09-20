/* eslint-disable import/no-extraneous-dependencies */
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');
const packageJson = require('../package.json');
const gulpUglify = require('gulp-uglify');
const gulpRename = require('gulp-rename');
const webpackConfig = require('../webpack.config');
const {
  cleanDistDirectory,
} = require('./clean');

function buildSources () {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig({}, {mode: 'production'}));
    const callback = (error, stats) => {
      compiler.close((closeError) => {
        if (error) {
          reject(error);
        } else if (closeError) {
          reject(closeError);
        } else if (stats.hasErrors()) {
          console.log(stats.toString({ colors: true }));
          reject(new Error('Error compiling pipeline-builder'));
        } else {
          resolve(stats);
        }
      });
    };
    compiler.run((error, stats) => {
      if (error) {
        callback(error, stats);
        return;
      }
      callback(undefined, stats);
    });
  });
}

function minify() {
  return gulp.src(packageJson.main)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(gulpUglify({
      output: {
        comments: /copyright/i,
      },
      compress: {
        inline: 1
      }
    }))
    .pipe(gulpRename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'));
}

const build = gulp.series(
  cleanDistDirectory,
  buildSources,
  minify,
);

module.exports = build;
