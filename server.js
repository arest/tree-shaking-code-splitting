/*eslint-disable no-console, no-var */
const path = require('path');
var express = require('express')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware');
var Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
var webpackConfig = require('./webpack.config')

const app = express();
const compiler = webpack(webpackConfig);

// Apply CLI dashboard for your webpack dev server
var dashboard = new Dashboard();
compiler.apply(new DashboardPlugin(dashboard.setData));

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

function log() {
  arguments[0] = '\nWebpack: ' + arguments[0];
  console.log.apply(console, arguments);
}

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true
  },
  historyApiFallback: true
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, host, (err) => {
  if (err) {
    log(err);
    return;
  }
});