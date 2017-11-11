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
    // new PurifyCSSPlugin({
    //   minimize: true,
    //   purifyOptions: { info: true, minify: true },
    //   paths: glob.sync(`${__dirname}/**/*.js`,
    //     {
    //       nodir: true,
    //     }),
    // }),
    // new ExtractTextPlugin('[name].[contenthash].css'),
    // Make sure this is after ExtractTextPlugin!
    // new PurifyCSSPlugin({
    //   // Give paths to parse for rules. These should be absolute!
    //   paths: glob.sync(path.join(__dirname, '/index.html')),
    // }),
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true,
    //   debug: false,
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     screw_ie8: true,
    //     conditionals: true,
    //     unused: true,
    //     comparisons: true,
    //     sequences: true,
    //     dead_code: true,
    //     evaluate: true,
    //     if_return: true,
    //     join_vars: true,
    //   },
    //   output: {
    //     comments: false,
    //   },
    //   sourceMap: true,
    // }),
  ],
};
