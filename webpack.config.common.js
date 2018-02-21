const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

const root = path.join(__dirname)
const app = path.join(root + '/app/')
const output = path.join(root + '/public')
const nodeModules = path.join(root, '/node_modules/')

module.exports = {
  entry: {
    app: [path.resolve(app + 'index.js')]
  },
  output: {
    path: output,
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [app, nodeModules],
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false,
          loaders: {
            scss: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader'
                },
                {
                  loader: 'sass-loader',
                  options: {
                    includePaths: [app, nodeModules]
                  }
                }
              ]
            })
          }
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
        options: {
          minimize: true
        }
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  resolve: {
    alias: {
      panels: path.resolve(app + '/panels/'),
      views: path.resolve(app + '/views/'),
      modules: path.resolve(app + '/store/modules/'),
      routes: path.resolve(app + '/router/routes/')
    },
    extensions: ['.js', '.json', '.css', '.scss', '.vue']
  },
  plugins: [
    new CleanWebpackPlugin(['public']),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      children: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(app + 'index.html'),
      chunksSortMode: 'dependency'
      // hash: true
    }),
    new ScriptExtHtmlWebpackPlugin({
      preload: {
        test: /\.preload\.js$/,
        chunks: 'async'
      }
    }),
    new WebpackPwaManifest({
      name: 'pwa-experiments',
      short_name: 'pwa',
      description: 'Creating a PWA with VueJS!',
      start_url: '/index.html',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#0277bd',
      icons: [
        {
          src: path.join(root + '/static/img/icons/android-chrome.png'),
          sizes: [192, 512],
          destination: '/assets/img/icons'
        },
        {
          src: path.join(root + '/static/img/icons/apple.png'),
          sizes: [60, 76, 120, 152, 180],
          destination: '/assets/img/icons',
          ios: true
        }
      ]
    }),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      allChunks: true
    })
  ],
  stats: {
    all: false,
    assets: true,
    chunkModules: true,
    chunkOrigins: true,
    errors: true,
    errorDetails: true,
    colors: true
  }
}
