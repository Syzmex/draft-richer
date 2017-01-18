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
const through2 = require('through2');
// const transformLess = require('atool-build/lib/transformLess');

var modules = require( 'postcss-modules' );
// var less = require( 'less' );
var { readFileSync, writeFileSync } = require( 'fs' );
var path = require( 'path' );
// var postcss = require( 'postcss' );
var postcss = require('gulp-postcss')
var less = require('postcss-less')

var rucksack = require( 'rucksack-css' );
var autoprefixer = require( 'autoprefixer' );
var NpmImportPlugin = require( 'less-plugin-npm-import' );
// var moduleResolver =  require( 'babel-plugin-module-resolver' );
var { dirname } = path;


function getJSONFromCssModules ( cssFileName, json ) {
  const jsonFilePath = path.resolve( './lib', path.relative( './src', cssFileName ) );
  const jsonFileName = path.resolve( './lib', `${jsonFilePath}.js` );
  writeFileSync( jsonFileName, `export default ${JSON.stringify( json )}` );
}


// function transformLess ( lessFile, config = {} ) {

//   const { cwd = process.cwd() } = config;
//   const resolvedLessFile = path.resolve( cwd, lessFile );

//   let data = readFileSync( resolvedLessFile, 'utf-8' );
//   data = data.replace( /^\uFEFF/, '' );

//   return new Promise( ( resolve, reject ) => {

//     // Do less compile
//     const lessOpts = {
//       paths: [ dirname( resolvedLessFile ) ],
//       filename: resolvedLessFile,
//       plugins: [
//         new NpmImportPlugin( { prefix: '~' } )
//       ]
//     };

//     less.render( data, lessOpts )
//       .then( ( result ) => {
//         // Do postcss compile
//         const plugins = [
//           modules( {
//             generateScopedName: '[local]___[hash:base64:5]',
//             getJSON: getJSONFromCssModules
//           } ),
//           rucksack(),
//           autoprefixer( {
//             browsers: [ 'last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8' ]
//           } )
//         ];
//         const source = result.css;
//         const postcssOpts = {};

//         postcss( plugins ).process( source, postcssOpts )
//           .then( ( r ) => {
//             resolve( r.css );
//           } )
//           .catch( ( err ) => {
//             reject( err );
//           } );
//       } )
//       .catch( ( err ) => {
//         reject( err );
//       } );
//   } );
// }


// var cleanCSS = require( 'gulp-clean-css' );
// var concatCSS = require( 'gulp-concat-css' );
// var derequire = require( 'gulp-derequire' );
// var flatten = require( 'gulp-flatten' );

// var gulpUtil = require( 'gulp-util' );
// var header = require( 'gulp-header' );
// var packageData = require( './package.json' );
// var rename = require( 'gulp-rename');

// var through = require( 'through2' );
// var webpackStream = require( 'webpack-stream' );


var paths = {
  // dist: 'dist',
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
    // 'dev-expression',
    // 'transform-runtime',
    [ 'import', [ {
      libraryName: 'antd',
      style: true
    } ] ]
  ]
};

// var COPYRIGHT_HEADER = ``;

// var buildDist = function ( opts ) {
//   var webpackOpts = {
//     debug: opts.debug,
//     externals: {
//       immutable: 'Immutable',
//       react: 'React',
//       'react-dom': 'ReactDOM'
//     },
//     output: {
//       filename: opts.output,
//       libraryTarget: 'var',
//       library: 'Draft'
//     },
//     plugins: [
//       new webpackStream.webpack.DefinePlugin( {
//         'process.env.NODE_ENV': JSON.stringify(
//           opts.debug ? 'development' : 'production'
//         )
//       } ),
//       new webpackStream.webpack.optimize.OccurenceOrderPlugin(),
//       new webpackStream.webpack.optimize.DedupePlugin()
//     ]
//   };
//   if ( !opts.debug ) {
//     webpackOpts.plugins.push(
//       new webpackStream.webpack.optimize.UglifyJsPlugin( {
//         compress: {
//           hoist_vars: true,
//           screw_ie8: true,
//           warnings: false
//         }
//       } )
//     );
//   }
//   return webpackStream( webpackOpts, null, ( err, stats ) => {
//     if ( err ) {
//       throw new gulpUtil.PluginError( 'webpack', err );
//     }
//     if ( stats.compilation.errors.length ) {
//       gulpUtil.log( 'webpack', '\n' + stats.toString( { colors: true } ) );
//     }
//   } );
// };

gulp.task( 'clean', () => {
  return del( [ /*paths.dist,*/ paths.lib ] );
} );

gulp.task( 'fonts', () => {
  return gulp
    .src( paths.fonts )
    // .pipe(flatten())
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
        browsers: [ 'last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8' ]
      } )
    ], { syntax: less } ) )
    .pipe( gulp.dest( paths.lib ) );
} );

gulp.task( 'modules', [ 'styles' ], () => {
  return gulp
    .src( paths.src )
    .pipe( babel( babelOptsJS ) )
    // .pipe(flatten())
    .pipe( gulp.dest( paths.lib ) );
} );

gulp.task( 'default', ( cb ) => {
  runSequence( 'clean', 'modules', cb );
} );

// gulp.task('dist', ['modules'], function() {
//   var opts = {
//     debug: true,
//     output: 'index.js',
//   };
//   return gulp.src('./lib/index.js')
//     .pipe(buildDist(opts))
//     .pipe(derequire())
//     .pipe(header(COPYRIGHT_HEADER, {version: packageData.version}))
//     .pipe(gulp.dest(paths.dist));
// });

// gulp.task('dist:min', ['modules'], function() {
//   var opts = {
//     debug: false,
//     output: 'index.min.js',
//   };
//   return gulp.src('./lib/index.js')
//     .pipe(buildDist(opts))
//     .pipe(header(COPYRIGHT_HEADER, {version: packageData.version}))
//     .pipe(gulp.dest(paths.dist));
// });


// gulp.task('watch', function() {
//   gulp.watch(paths.src, ['modules']);
// });

// gulp.task('dev', function() {
//   gulp.watch(paths.src, ['modules', 'dist']);
// });


