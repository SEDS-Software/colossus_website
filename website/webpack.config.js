/*
    ./webpack.config.js
*/

//I have no idea whats going on this file tbh,  this is all copy and paste from like 60 stack overflow questions
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});

let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
      loaders: [
          { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
          { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
          { test: /\.css$/, loader: "style-loader!css-loader" },
          {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract('css-loader!sass-loader')
          },
          {
              test: /\.(png|jpg)$/,
              use: [{
                  loader: 'url-loader',
                  options: { limit: 10000 } // Convert images < 10k to base64 strings
              }]
          },
      ]
  },

  plugins: [
      HtmlWebpackPluginConfig,
      new ExtractTextPlugin('dist/styles/main.css', {
          allChunks: true
      })
  ]
};
