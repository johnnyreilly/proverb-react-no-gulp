'use strict';

var webpack = require('webpack');
var webpackFailPlugin = require('webpack-fail-plugin');
var webpackConfig = require('./webpack.config.base.js');
var packageJson = require('./package.json');

module.exports = function() {
  var myProdConfig = webpackConfig;
  myProdConfig.output.filename = '[name].[hash].js';

  myProdConfig.plugins = myProdConfig.plugins.concat(
    new webpack.DefinePlugin({
      __IN_DEBUG__: false,
      __VERSION__: JSON.stringify(packageJson.version + '.' + Date.now()),
      __CONNECTION_URL__: JSON.stringify('https://proverb-api.azurewebsites.net/'),
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.[hash].js' }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    }),
    webpackFailPlugin
  );

  return myProdConfig;
};
