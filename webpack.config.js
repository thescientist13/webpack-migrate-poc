const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {

  entry: {
    index: './src/index.js',
    vendor: './src/vendor.js'
  },

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }],
        options: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style',
          use: 'css!sass'
        })
      }
    ]
  },

  plugins: [
    new UglifyJSPlugin(),

    new ExtractTextPlugin('styles-[contentHash].css'),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common-[hash].min.js'
    }),

    new HtmlWebpackPlugin()
  ]

};