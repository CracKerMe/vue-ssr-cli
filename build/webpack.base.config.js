const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
class ServerMiniCssExtractPlugin extends MiniCssExtractPlugin {
  getCssChunkObject(mainChunk) {
    return {}
  }
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  // devtool: isProd ? 'source-map' : '#cheap-module-source-map',
  devtool: isProd ? '' : '#cheap-module-source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true },
          mergeLonghand: false,
          discardComments: {
            removeAll: true
          }
        },
        canPrint: true
      })
    ],

    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          name: 'vendors-chunk',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          priority: 20
        },
        common: {
          name: 'common-chunk',
          chunks: 'all',
          minChunks: 2,
          test: path.resolve(__dirname, './../src/components'),
          priority: 10,
          enforce: true,
          reuseExistingChunk: true
        }
      }
    }
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.scss'],
    alias: {
      public: resolve('public'),
      '@': resolve('src'),
      '~components': resolve('src/components'),
      '~views': resolve('src/views'),
      '~utils': resolve('src/utils'),
      '~base': resolve('src/base')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.scss$/,
        // use: ['vue-style-loader', 'css-loader', 'sass-loader']
        use: isProd
          ? [
              {
                loader: ServerMiniCssExtractPlugin.loader
              },
              {
                loader: 'css-loader'
              },
              {
                loader: 'sass-loader'
              }
            ]
          : ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        // use: ['vue-style-loader', 'css-loader']
        use: isProd
          ? [
              {
                loader: ServerMiniCssExtractPlugin.loader
              },
              {
                loader: 'css-loader'
              }
            ]
          : ['vue-style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ServerMiniCssExtractPlugin({
      filename: '[name].min.css',
      allChunks: false
    })
  ]
}
