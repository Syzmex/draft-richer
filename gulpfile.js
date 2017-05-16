/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var del = require( 'del' );
var gulp = require( 'gulp' );
var babel = require( 'gulp-babel' );
var runSequence = require( 'run-sequence' );
var modules = require( 'postcss-modules' );
var { writeFileSync } = require( 'fs' );
var path = require( 'path' );
var postcss = require('gulp-postcss')
var less = require('postcss-less')
var rucksack = require( 'rucksack-css' );
var autoprefixer = require( 'autoprefixer' );
var { dirname } = path;


function getJSONFromCssModules ( cssFileName, json ) {
  const jsonFilePath = path.resolve( './lib', path.relative( './src', cssFileName ) );
  const jsonFileName = path.resolve( './lib', `${jsonFilePath}.js` );
  writeFileSync( jsonFileName, `export default ${JSON.stringify( json )}` );
}


var paths = {
  lib: 'lib',
  src: [
    'src/**/*.js',
    'src/**/*.jsx'
    // '!src/**/__tests__/**/*.js',
    // '!src/**/__mocks__/**/*.js',
  ],
  css: [
    'src/**/*.less'
  ],
  fonts: [
    'src/**/*.eot',
    'src/**/*.svg',
    'src/**/*.ttf',
    'src/**/*.woff'
  ]
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
    [ 'import', [ {
      libraryName: 'antd',
      style: true
    } ] ]
  ]
};


gulp.task( 'clean', () => {
  return del( [ paths.lib ] );
} );

gulp.task( 'fonts', () => {
  return gulp
    .src( paths.fonts )
    .pipe( gulp.dest( paths.lib ) );
} );

gulp.task( 'styles', [ 'fonts' ], () => {
  return gulp
    .src( paths.css )
    .pipe( gulp.dest( paths.lib ) )
    .pipe( postcss( [
      modules( {
        generateScopedName: '[local]___[hash:base64:5]',
        getJSON: getJSONFromCssModules
      } ),
      rucksack(),
      autoprefixer( {
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9'
        ]
      } )
    ], { syntax: less } ) )
    .pipe( gulp.dest( paths.lib ) );
} );

gulp.task( 'modules', [ 'styles' ], () => {
  return gulp
    .src( paths.src )
    .pipe( babel( babelOptsJS ) )
    .pipe( gulp.dest( paths.lib ) );
} );

gulp.task( 'default', ( cb ) => {
  runSequence( 'clean', 'modules', cb );
} );

