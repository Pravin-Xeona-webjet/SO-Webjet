const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const buildUtils = require('../buildUtils')
const buildEnv = buildUtils.getBuildEnv()
const srcDir = path.resolve(__dirname, '../../src/')
const outputDir = path.join(srcDir, '../build')

module.exports = {
  mode: 'production',
  entry: ['core-js/stable', path.join(srcDir, 'app')],
  output: {
    publicPath: '',
    path: outputDir,
    filename: 'app.[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        sideEffects: true
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  target: ['web', 'es5'],
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(buildEnv.environment)
      }
    }),
    new MiniCssExtractPlugin({
      filename: buildEnv.environment === 'development' ? 'app.css' : 'app.[contenthash].css'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: ['.js', '.jsx', '.react.js', '.ico']
  },
  externals: {
    jquery: 'jQuery',
    appConfig: 'WEBAPP_CONFIG'
  }
}
