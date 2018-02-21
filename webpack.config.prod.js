const path = require('path')
const webpack = require('webpack')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

const merge = require('webpack-merge')
const common = require('./webpack.config.common.js')

const output = path.resolve('./public')

module.exports = merge(common, {
  output: {
    path: output,
    filename: '[name].[chunkhash].js',
    chunkFilename: 'chunk.[chunkhash].preload.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new OptimizeCssAssetsPlugin(),
    new UglifyJSPlugin({
      uglifyOptions: {
        ecma: 5
      },
      cache: true,
      parallel: false
    }),
    //new CopyWebpackPlugin([
      //{
        //from: path.resolve('./static'),
        //to: path.join(output + '/assets'),
        //ignore: ['.*']
      //}
    //]),
    new SWPrecacheWebpackPlugin({
      cacheId: 'pwa-experiments',
      filename: 'service-worker.js',
      staticFileGlobs: [output + '/**/*.{js,html,css}'],
      minify: true,
      stripPrefix: 'output/',
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
          handler: 'networkFirst'
        },
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
          handler: 'networkFirst'
        }
      ]
    })
  ]
})
