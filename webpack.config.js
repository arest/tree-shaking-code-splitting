/*eslint-disable no-var */
var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin');

var dir_js = path.resolve(__dirname, 'src');
var dir_html = path.resolve(__dirname, 'html');
var dir_build = path.resolve(__dirname, 'build');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';
const isDev = !isProd;

var entry = {
        app: path.resolve(dir_js, 'app.js'),
        vendor: ['react','react-dom', 'react-router'] // And other vendors
};

var plugins = [
      new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(nodeEnv)
      }),
        // Simply copies the files over
        new CopyWebpackPlugin([
            { from: dir_html } // to: output.path
        ]),
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
]

if (isDev) {
  entry = {
        application: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            'webpack/hot/only-dev-server',
            './src/app.js'
        ]
  }
  plugins.push( new webpack.HotModuleReplacementPlugin() )
}

if (isProd) {

  plugins.push (
        new webpack.SourceMapDevToolPlugin({
          filename: null, 
          lineToLine: true,
          module: false,
          test: /\.(ts|map|js|jsx)($|\?)/i 
        })
  )
  plugins.push (
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
        })
  )
  plugins.push (
        new webpack.optimize.CommonsChunkPlugin({ 
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.bundle.js' 
        })
  )
}

// this regex should be modified to match your setup.
// in this app, we know route components are any files
// matching routes/*.js or routes/SOMETHING/*.js
// routes/components/*.js will be ignored
var routeComponentRegex = /routes\/([^\/]+\/?[^\/]+).js/

module.exports = {

  devtool: isDev ? 'inline-source-map' : null,

  entry: entry,

  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/build/'
  },

  module: {
    loaders: [
      // make sure to exclude route components here
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: routeComponentRegex,
        loader: 'babel'
      },
      // lazy load route components
      {
        test: routeComponentRegex,
        include: path.resolve(__dirname, 'src'),
        loaders: ['bundle?lazy', 'babel']
      }
    ]
  },
  plugins: plugins,
  cache: true,
  debug: isDev

}
