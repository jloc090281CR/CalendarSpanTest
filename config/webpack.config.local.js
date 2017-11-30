'use strict'

const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')
const base = require('./webpack.config.base.js')

module.exports = Object.assign({}, base, {
  devtool: '#eval-source-map',
  entry: Object.assign(base.entry, {
    app: base.entry.app.concat(
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server'
    )
  }),
  module: Object.assign(base.module, {
    rules: base.module.rules.concat(
      // "postcss" loader applies autoprefixer (S&D use cssNext) to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // in development "style" loader enables hot editing of CSS.
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: false, // change to true for debug css
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                require('stylelint-webpack-plugin'),
                require('postcss-cssnext'),
                require('postcss-reporter')
              ]
            }
          }
        ]
      }
    )
  }),
  plugins: base.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new DashboardPlugin()
  )
})
