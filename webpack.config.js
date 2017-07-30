const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {

  entry: {
    index: './src/index.js'
  },

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      }
    ]
  },

  // TODO HtmlWebpackPlugin
  // TODO webpack-dev-server
  plugins: [
    new UglifyJSPlugin(),

    new ExtractTextPlugin('styles-[contentHash].css'),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'index',
      filename: 'index-[hash].min.js'
    })
  ]

};