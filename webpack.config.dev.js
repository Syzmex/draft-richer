
// eslint-disable-next-line
import { paths, getEntry, getOutput, getSVGRules, loaders, plugins, combine } from 'kiwiai';
import theme from './antd.config.js';

const { styleLoader, cssLoader, postcssLoader, lessLoader, urlLoader,
  babelLoader, jsonLoader, getDefaultLoaderOptions } = loaders;

const staticFileName = 'static/[name].$[hash:4].[ext]';
const cssOptions = {
  importLoaders: 1
};
const lessOptions = {
  modifyVars: theme
};
const svgRules = Object.values( getSVGRules({
  fileName: staticFileName
}));

const babelOptions = getDefaultLoaderOptions( 'babel' );
babelOptions.plugins.push( 'lodash' );
babelOptions.plugins.push( 'transform-class-properties' );
// babelOptions.plugins.push([ 'transform-es2015-classes', { loose: true }]);
// babelOptions.plugins.push( 'transform-proto-to-assign' );
babelOptions.plugins.push( 'transform-decorators-legacy' );
babelOptions.plugins.push( 'transform-runtime' );
babelOptions.plugins.push([ 'import', { libraryName: 'antd', style: true }]);

const srcInclude = [
  paths.appSrc,
  paths.resolveApp( 'examples' )
];

export default {
  devtool: 'cheap-module-source-map',
  entry: getEntry(['./examples/server.js']),
  output: getOutput(),
  resolve: {
    modules: [
      paths.ownNodeModules,
      paths.appNodeModules
    ],
    extensions: [ '.js', '.json', '.jsx' ]
  },
  module: {
    noParse: [/moment.js/],
    rules: [{
      exclude: [
        /\.html$/,
        /\.jsx?$/,
        /\.(css|less)$/,
        /\.json$/,
        /\.svg$/
      ],
      use: [urlLoader({ name: staticFileName })]
    }, {
      test: /\.jsx?$/,
      include: srcInclude,
      use: [babelLoader( babelOptions )]
    }, {
      test: /\.css$/,
      include: srcInclude,
      use: [
        styleLoader(),
        cssLoader( cssOptions ),
        postcssLoader()
      ]
    }, {
      test: /\.less$/,
      include: srcInclude,
      use: [
        styleLoader(),
        cssLoader( cssOptions ),
        postcssLoader(),
        lessLoader( lessOptions )
      ]
    }, {
      test: /\.css$/,
      include: paths.appNodeModules,
      use: [
        styleLoader(),
        cssLoader( cssOptions ),
        postcssLoader()
      ]
    }, {
      test: /\.less$/,
      include: paths.appNodeModules,
      use: [
        styleLoader(),
        cssLoader( cssOptions ),
        postcssLoader(),
        lessLoader( lessOptions )
      ]
    }, {
      test: /\.json$/,
      use: [jsonLoader()]
    }]
    .concat( svgRules )
  },
  plugins: combine(
    plugins.Define(),
    plugins.HotModuleReplacement(),
    plugins.CaseSensitivePaths(),
    plugins.WatchMissingNodeModules(),
    plugins.SystemBellWebpack(),
    plugins.CopyPublic(),
    plugins.CommonsChunk(),
    // plugins.DllReferencePlugin(),
    plugins.HtmlWebpack({
      favicon: ''
    })
  ),
  // externals: config.externals,
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
