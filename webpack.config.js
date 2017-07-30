// TODO const ExtractTextPlugin = require('extract-text-webpack-plugin');
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

  // TODO loaders

  // TODO HtmlWebpackPlugin
  // TODO webpack-dev-server
  plugins: [
    new UglifyJSPlugin(),

    // new ExtractTextPlugin('styles.[contentHash].css'),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'index',
      filename: 'index-[hash].min.js'
    })
  ]

};

//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//
//         options: {
//           presets: ['es2015']
//         }
//       },
//       {
//         test: /\.(scss|css)$/,
//
//         use: ExtractTextPlugin.extract({
//           use: [
//             {
//               loader: 'css-loader',
//               options: {
//                 sourceMap: true
//               }
//             },
//             {
//               loader: 'sass-loader',
//               options: {
//                 sourceMap: true
//               }
//             }
//           ],
//           fallback: 'style-loader'
//         })
//       }
//     ]
//   },