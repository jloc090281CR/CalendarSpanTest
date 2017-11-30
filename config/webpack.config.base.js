'use strict'

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ignoreVendors = []
const extraVendors = [ 'material-ui/svg-icons' ]
const CopyWebpackPlugin = require('copy-webpack-plugin')
const pkg = require('../package.json')
const path = require('path')

const PATHS = {
  app: path.resolve(__dirname, '../app'),
  build: path.resolve(__dirname, '../dist')
}

module.exports = {
  context: PATHS.app,
  entry: {
    app: [PATHS.app],
    vendor: Object.keys(pkg.dependencies)
      .filter(function (vendor) { return !~ignoreVendors.indexOf(vendor) })
      .concat(extraVendors)
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [ PATHS.app, 'node_modules' ]
  },
  output: {
    path: PATHS.build,
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    exprContextCritical: false,
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        exclude: [
          /node_modules/
        ],
        use: [{
          loader: 'eslint-loader',
        }]
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 1024
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/
        ],
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        eslint: {
          failOnWarning: false,
          failOnError: true,
          fix: false
        }
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.min.js'
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      favicon: '',
      template: `${PATHS.app}/index.html`,
      hash: true
    }),
    new CopyWebpackPlugin([{
      from: 'static',
      to: 'static'
    }])
  ],
  devServer: {
    compress: true,
    disableHostCheck: true
  }
}
