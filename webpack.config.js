/* eslint-env node */
/* global require */

const path = require('path');
const webpack = require('webpack');
const version = require('./version');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    demo: ['./src/app.js'],
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['env', { modules: false }]],
        },
      }],
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    }],
  },
  resolve: {
    alias: {
      underscore: 'lodash',
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      PACKAGE_VERSION: JSON.stringify(version.combined),
    }),
  ],
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, './src'),
    publicPath: '/',
    compress: true,
    clientLogLevel: 'info',
    stats: {
      colors: true,
      cached: false,
      cachedAssets: false,
    },
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};
