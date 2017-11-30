'use strict'

const base = require('./webpack.config.base.js')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = Object.assign({}, base, {
  module: Object.assign(base.module, {
    rules: base.module.rules.concat(
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('stylelint-webpack-plugin'),
                  require('postcss-cssnext'),
                  require('postcss-reporter')
                ]
              }
            }
          ],
          fallback: 'style-loader'
        })
      }
    )
  }),
  plugins: base.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
      }
    }),
    new ExtractTextPlugin({ filename: 'styles.css', allChunks: true }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  )
})
