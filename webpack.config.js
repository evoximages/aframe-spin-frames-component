const path = require('path');
const webpack = require('webpack');
const webpack_rules = [];
const webpackOption = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'aframe-spin-frames-component.min.js'
  },
  module: {
    rules: webpack_rules
  }
};
let babelLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
};
webpack_rules.push(babelLoader);
module.exports = webpackOption;
