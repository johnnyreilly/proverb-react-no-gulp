/* eslint-disable no-var, strict, prefer-arrow-callback */
'use strict';

var path = require('path');
var webpack = require('webpack');

var packageJson = require('./package.json');
var vendorDependencies = Object.keys(packageJson['dependencies']);

var babelOptions = {
  "presets": [
    "react",
    [
      "es2015",
      {
        "modules": false
      }
    ],
    "es2016"
  ]
};

module.exports = {
  cache: true,
  entry: {
    main: './src/main.tsx',
    vendor: ['babel-polyfill'].concat(vendorDependencies).filter(function (dependency) {
       return dependency !== 'bootstrap' && dependency !== 'font-awesome';
    })
  },
  output: {
    path: path.resolve(__dirname, './dist/scripts'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions
        },
        {
          loader: 'ts-loader'
        }
      ]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions
        }
      ]
    }]
  },
  plugins: [ // Check webpack.config.dev.js / webpack.config.prod.js for build specific plugins
      new webpack.ProvidePlugin({
          "window.jQuery": "jquery",
          "jQuery": "jquery",
          "$": "jquery"
      })
  ],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js']
  },
};
