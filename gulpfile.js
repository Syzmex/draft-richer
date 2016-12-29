/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var babel = require('gulp-babel');
var del = require('del');
var cleanCSS = require('gulp-clean-css');
var concatCSS = require('gulp-concat-css');
var derequire = require('gulp-derequire');
var flatten = require('gulp-flatten');
var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var header = require('gulp-header');
var packageData = require('./package.json');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var through = require('through2');
var webpackStream = require('webpack-stream');

var fbjsConfigurePreset = require('babel-preset-fbjs/configure');
var gulpCheckDependencies = require('fbjs-scripts/gulp/check-dependencies');

var paths = {
  dist: 'dist',
  lib: 'lib',
  src: [
    'src/**/*.js',
    'src/**/*.jsx'
    // '!src/**/__tests__/**/*.js',
    // '!src/**/__mocks__/**/*.js',
  ],
  css: [
    'src/**/*.less',
  ],
};

var babelOptsJS = {
  presets: [
    require.resolve('babel-preset-es2015-ie'),
    require.resolve('babel-preset-react'),
    require.resolve('babel-preset-stage-0')
  ],
  plugins: [
    require.resolve('babel-plugin-add-module-exports'),
    require.resolve('babel-plugin-transform-decorators-legacy'),
    'lodash',
    'dev-expression',
    'transform-runtime',
    [ 'import', [ {
      libraryName: 'antd',
      style: true
    } ] ]
  ]
};

var babelOptsFlow = {
  presets: [
    fbjsConfigurePreset({
      target: 'flow',
      rewriteModules: {},
    }),
  ],
};

var COPYRIGHT_HEADER = ``;

var buildDist = function(opts) {
  var webpackOpts = {
    debug: opts.debug,
    externals: {
      immutable: 'Immutable',
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    output: {
      filename: opts.output,
      libraryTarget: 'var',
      library: 'Draft',
    },
    plugins: [
      new webpackStream.webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          opts.debug ? 'development' : 'production'
        ),
      }),
      new webpackStream.webpack.optimize.OccurenceOrderPlugin(),
      new webpackStream.webpack.optimize.DedupePlugin(),
    ],
  };
  if (!opts.debug) {
    webpackOpts.plugins.push(
      new webpackStream.webpack.optimize.UglifyJsPlugin({
        compress: {
          hoist_vars: true,
          screw_ie8: true,
          warnings: false,
        },
      })
    );
  }
  return webpackStream(webpackOpts, null, function(err, stats) {
    if (err) {
      throw new gulpUtil.PluginError('webpack', err);
    }
    if (stats.compilation.errors.length) {
      gulpUtil.log('webpack', '\n' + stats.toString({colors: true}));
    }
  });
};

gulp.task('clean', function() {
  return del([paths.dist, paths.lib]);
});

gulp.task('modules', ['styles'], function() {
  return gulp
    .src(paths.src)
    .pipe(babel(babelOptsJS))
    // .pipe(flatten())
    .pipe(gulp.dest(paths.lib));
});

gulp.task('styles', function() {
  return gulp
    .src(paths.css)
    // .pipe(flatten())
    .pipe(gulp.dest(paths.lib));
});


gulp.task('dist', ['modules'], function() {
  var opts = {
    debug: true,
    output: 'index.js',
  };
  return gulp.src('./lib/index.js')
    .pipe(buildDist(opts))
    .pipe(derequire())
    .pipe(header(COPYRIGHT_HEADER, {version: packageData.version}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('dist:min', ['modules'], function() {
  var opts = {
    debug: false,
    output: 'index.min.js',
  };
  return gulp.src('./lib/index.js')
    .pipe(buildDist(opts))
    .pipe(header(COPYRIGHT_HEADER, {version: packageData.version}))
    .pipe(gulp.dest(paths.dist));
});


gulp.task('watch', function() {
  gulp.watch(paths.src, ['modules']);
});

gulp.task('dev', function() {
  gulp.watch(paths.src, ['modules', 'dist']);
});

gulp.task('default', function(cb) {
  runSequence('clean', 'modules', ['dist'], cb);
});
