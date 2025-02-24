const { merge } = require('webpack-merge')
const common = require('./webpack.base')
const TerserPlugin = require('terser-webpack-plugin')
const buildUtils = require('../buildUtils')

module.exports = merge(common, {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  },
  plugins: buildUtils.configHtmlPlugins()
})
