'use strict';

var webpack = require('webpack');
var webpackFailPlugin = require('webpack-fail-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');
var webpackConfig = require('./webpack.config.base.js');
var packageJson = require('./package.json');

module.exports = function() {
  var myDevConfig = webpackConfig;
  myDevConfig.devtool = 'inline-source-map';

  myDevConfig.plugins = myDevConfig.plugins.concat(
      new webpack.DefinePlugin({
          __IN_DEBUG__: true,
          __VERSION__: JSON.stringify(packageJson.version + '.' + Date.now()),
          __CONNECTION_URL__: JSON.stringify('https://proverb-api.azurewebsites.net/')
          // __CONNECTION_URL__: JSON.stringify('http://localhost:5000/')
      }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
    new WebpackNotifierPlugin({ title: 'Webpack build', excludeWarnings: true })
  );

  return myDevConfig;
};
