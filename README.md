# webpack-migrate-poc

## Overview
This repository is for testing and documenting **webpack-cli**'s [`migrate`](https://github.com/webpack/webpack-cli#migration-from-webpack-v1-to-v2) 
command and documenting the steps to resolve this [issue](https://github.com/webpack/webpack-cli/issues/166), which is to document the migration process for developers.

## Objectives
The objectives of this repo will be a "live" aid to support the goal of documenting the migration process.  The steps will include:

1.  A basic JavaScript "Hello World" example (to verify the before / after)
1.  Using a single [webpack 1](http://webpack.github.io/docs/) based configration reflecting common development and production configuration options
1.  Running the migration tast against that configuration
1.  Documenting the results in [MIGRATE.md](https://github.com/webpack/webpack-cli/blob/master/MIGRATE.md) in a fork
1.  Submitting a PR
1.  ???
1.  Profit

## Testing
Validation oppourtunites include
1.  Making sure the basic sample application works
1.  Observing what webpack-cli generates and using that as a basis for creating our configuration here

### webpack-cli prompts
Running the **webpack-cli** and seeing the questions asked will provide the initial context for the configuration used in 
this project.  So here in (IMO) would be a typical set of answers to running `webpack-cli init`, selecting all the defaults
where possible.

```bash
? Will your application have multiple bundles? Yes
? Type the name you want for your modules (entry files), separated by comma index
? What is the location of 'index'? src/index
? Which folder will your generated bundles be in? [default: dist]:
? Are you going to use this in production? Yes
? Will you be using ES2015? Yes
? Will you use one of the below CSS solutions? SASS
? If you want to bundle your CSS files, what will you name the bundle? (press enter to skip) styles
? Name your 'webpack.[name].js?' [default: 'prod']:
```

### webpack-cli config
This is the generated config (minus comments)

```javascript
  const webpack = require('webpack');
  const path = require('path');
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  
  module.exports = {
    entry: {
      index: 'src/index.js'
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
          loader: 'babel-loader',
  
          options: {
            presets: ['es2015']
          }
        },
        {
          test: /\.(scss|css)$/,
  
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ],
            fallback: 'style-loader'
          })
        }
      ]
    },
  
    plugins: [
      new UglifyJSPlugin(),
      new ExtractTextPlugin('styles.[contentHash].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'index',
        filename: 'index-[hash].min.js'
      })
    ]
  };
```

### Dependencies
This is the dependencies section of a _package.json_ file updated after running `webpack-cli init` 

```javascript
  "devDependencies": {
    "babel-core": "^6.25.0",
    "babel-loader": "^7.1.1",
    "babel-preset-es2015": "^6.24.1",
    "css-loader": "^0.28.4",
    "extract-text-webpack-plugin": "^3.0.0",
    "node-sass": "^4.5.3",
    "sass-loader": "^6.0.6",
    "style-loader": "^0.18.2",
    "uglifyjs-webpack-plugin": "^0.4.6",
    "webpack": "^3.4.1"
  }
```

It will also be used as a starting point for configuring this project's dependencies, but modified slightly in instances 
where dependencies are backwards incompatible with webpack v1, like:

### Testing Strategy
Given the above prompts and the generated config, w, we will make a simple app with styles and create a similar config.  In addition, we will add a 
configuration for [**webpack-dev-server**](https://webpack.github.io/docs/webpack-dev-server.html), as that is a 
common feature item found in a lot of projects.