const path = require('path')
// const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: '[name]-[hash].bundle.js',
    path: path.join(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // contentBase: './dist',
    port: 9001,
    watchContentBase: true
  },
  module: {
    rules: [
      // {
      //   test: /.js$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env']
      //     }
      //   }
      {
        test: /.js$/,
        use: {
          loader: 'eslint-loader'
        },
        enforce: 'pre'
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader', {
          loader: 'style-resources-loader',
          options: {
            patterns: path.resolve(__dirname, 'path/to/less/variables/*.less')
            // injector: 'append'
          }
        }]
      },
      {
        test: /.vue$/,
        use: {
          loader: 'vue-loader'
        }
      },
      {
        test: /.(png|jpg|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            esModule: false,
            limit: 10
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack-vue',
      meta: {
        viewport: 'width=decice-width'
      },
      template: './public/index.html'
    }),
    new VueLoaderPlugin()
    // new webpack.DefinePlugin({
    //   BASE_URL: '""'
    // })
  ]
}
