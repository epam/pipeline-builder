/* eslint-env node */
/* global require */

import _ from 'lodash';
import gulp from 'gulp';
import util from 'gulp-util';
import ignore from 'gulp-ignore';
import del from 'del';
import sequence from 'run-sequence';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-babel-istanbul';
import coveralls from 'gulp-coveralls';
import jsdoc from 'gulp-jsdoc3';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sassModuleImporter from 'sass-module-importer'; // eslint-disable-line import/no-unresolved, import/extensions
import cleanCss from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import stylelint from 'gulp-stylelint';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import open from 'open';
import { rollup } from 'rollup';
import yargs from 'yargs';
import ftp from 'vinyl-ftp';
import url from 'url';

import uglifyes from 'uglify-es';
import composer from 'gulp-uglify/composer';

import webpackConfig from './webpack.config';
import rollupConfig from './rollup.config';

const uglify = composer(uglifyes, console);

const packageJson = require('./package.json');

gulp.task('default', done =>
  sequence('lint', 'test:cover', ['docs', 'build'], done),
);

gulp.task('clean', ['clean:docs', 'clean:dist', 'clean:cover']);

gulp.task('clean:docs', () =>
  del(['docs/auto/']),
);

gulp.task('clean:dist', () =>
  del(['dist/*']),
);

gulp.task('clean:cover', () =>
  del(['coverage/*']),
);

gulp.task('lint', done =>
  sequence('lint:css', 'lint:js', done),
);

gulp.task('lint:js', () =>
  gulp.src(['*.js', 'src/**/*.js', 'test/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()),
);

gulp.task('lint:js-fix', () =>
  gulp.src(['*.js', 'src/**/*.js', 'test/**/*.js'], { base: './' })
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
    .pipe(ignore.include(file => file.eslint != null && file.eslint.fixed))
    .pipe(gulp.dest('')),
);

gulp.task('lint:css', () =>
  gulp.src(['src/**/*.scss'])
    .pipe(stylelint({
      reporters: [
        { formatter: 'string', console: true },
      ],
    })),
);

gulp.task('test', () =>
  gulp.src('test/**/*.js', { read: false })
    .pipe(mocha({ compilers: 'js:babel-core/register' })),
);

gulp.task('test:cover', ['clean:cover', 'test:cover-hook'], () =>
  gulp.src('test/**/*.js', { read: false })
    .pipe(mocha({ compilers: 'js:babel-core/register' }))
    .pipe(istanbul.writeReports()),
);

gulp.task('test:coveralls', () =>
  gulp.src('coverage/**/lcov.info')
    .pipe(coveralls()),
);

gulp.task('test:cover-hook', () =>
  gulp.src([
    'src/**/*.js',
    '!src/*.js',
    '!src/app/**/*.js',
    '!src/generator/**/*.js',
    '!src/parser/WDL/hermes/*.js',
    '!src/visual/**/*.js',
  ])
    .pipe(istanbul({ includeUntested: true }))
    .pipe(istanbul.hookRequire()),
);

const jsdocConfig = {
  source: {
  },
  opts: {
    template: 'docs/template',
    tutorials: 'docs/tutorials',
    destination: 'docs/auto',
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
          'docs/template/static',
          'docs/tutorials',
        ],
      },
    },
  },
};

gulp.task('docs', ['clean:docs'], (done) => {
  gulp.src([
    'README.md',
    'src/**/*.js',

    '!src/app/**/*.js',
    '!src/parser/WDL/**/*',
    '!src/generator/WDL/**/*',
  ], { read: false })
    .pipe(jsdoc(jsdocConfig, done));
});

gulp.task('build', done =>
  sequence('clean:dist', ['build:js', 'build:css'], done),
);

const uglifyConfig = {
  output: {
    comments: /copyright/i,
  },
};

gulp.task('build:js', () =>
  rollup(rollupConfig).then((bundle) => {
    if (rollupConfig.dest) {
      return bundle.write(rollupConfig);
    }
    if (rollupConfig.targets) {
      const multi = _.map(rollupConfig.targets, target =>
        bundle.write(_.assign({}, rollupConfig, target)));
      return Promise.all(multi);
    }
    throw new Error('Oops!');
  }).then(() =>
    gulp.src(packageJson.main)
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify(uglifyConfig))
      .pipe(rename({ suffix: '.min' }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/')),
  ),
);

const cleanCssConfig = {
};

gulp.task('build:css', () =>
  gulp.src('src/pipeline.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ importer: sassModuleImporter() }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/'))
    .pipe(ignore.exclude('*.map'))
    .pipe(cleanCss(cleanCssConfig))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/')),
);

gulp.task('build:demo', (done) => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new util.PluginError('webpack', err);
    }
    util.log('[webpack]', stats.toString(webpackConfig.devServer.stats));
    done();
  });
});

function remoteAccess() {
  if (!yargs.argv.server) {
    util.log('Skipping deployment,', util.colors.red('--server is not specified.'));
    return null;
  }

  const uo = url.parse(yargs.argv.server);
  const auth = (uo.auth || 'anonymous:anonymous@').split(':');

  const conn = ftp.create({
    host: uo.host,
    user: auth[0],
    password: auth[1],
    log: util.log,
    timeOffset: yargs.argv.serverTime ? yargs.argv.serverTime : 0,
  });
  return { conn, path: uo.pathname };
}

gulp.task('deploy', ['build:demo'], () => {
  const remote = remoteAccess();
  if (!remote) {
    return util.noop();
  }

  return gulp.src(['dist/demo.bundle.js', 'src/index.html'], { buffer: false })
    .pipe(remote.conn.dest(remote.path));
});

gulp.task('deploy:docs', () => {
  const remote = remoteAccess();
  if (!remote) {
    return util.noop();
  }

  return gulp.src(['docs/auto/**/*', '!*.md'], { buffer: false })
    .pipe(remote.conn.dest(remote.path));
});

gulp.task('show:cover', () =>
  open('./coverage/lcov-report/index.html'),
);

gulp.task('show:docs', () =>
  open('./docs/auto/index.html'),
);

const servePort = 8080;

gulp.task('serve', () => {
  const webpackDevConfig = _.merge({}, webpackConfig, {
    entry: {
      demo: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/app.js',
      ],
    },
  });
  new WebpackDevServer(webpack(webpackDevConfig), webpackDevConfig.devServer)
    .listen(servePort, 'localhost', (err) => {
      if (err) {
        throw new util.PluginError('[WDS]', err);
      }
      const uri = `http://localhost:${servePort}/webpack-dev-server/`;
      util.log('[WDS]', uri);
      open(uri);
    });
});
