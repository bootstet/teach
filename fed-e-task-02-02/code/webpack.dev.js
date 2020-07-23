const common = require('./webpack.common')
const path = require('path')
const { merge }  = require('webpack-merge')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    contentBase: './dist',
    port: 9001,
    watchContentBase: true
  },
})
