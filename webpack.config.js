const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const PurifyCSSPlugin = require('purifycss-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
console.log(`BuildPath ${__dirname}/build/`);

module.exports = {
  entry: [
    './src/index.js',
    // './src/auth/index.js',
  ],
  // output configuration
  output: {
    path: `${__dirname}/build/`,
    publicPath: 'build/',
    filename: 'build.js',
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract({
      //     fallbackLoader: 'style-loader',
      //     loader: 'css-loader',
      //   }),
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }],
          ],
        },
      },
    ],
  },
  plugins: [

  ],
};
