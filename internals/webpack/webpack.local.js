const { merge } = require('webpack-merge')
const common = require('./webpack.base')
const HtmlWebpackStringReplacePlugin = require('html-replace-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')
const buildUtils = require('../buildUtils')
const buildEnv = buildUtils.getBuildEnv()
const srcDir = path.resolve(__dirname, '../../src/')
const siteDir = path.join(srcDir, `sites/${buildEnv.siteName}`)
const htmlTemplateParamsPath = path.join(siteDir, `index.html.params.${buildEnv.env}.json`)
const htmlTemplateParams = require(htmlTemplateParamsPath)
const localConfig = path.join(srcDir, `sites/${buildEnv.siteName}/config.local.js`)
const buildTime = { buildTime: new Date() }

const config = (htmlReplace) =>
  merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
      compress: true,
      port: 9000,
      open: 'http://localhost:9000',
      historyApiFallback: true
    },
    plugins: [
      new HtmlWebpackStringReplacePlugin(htmlReplace),
      new CopyWebpackPlugin({
        patterns: [
          { from: localConfig, to: './config/config.js' }
        ]
      }),
      new HtmlWebpackPlugin({
        template: path.join(siteDir, 'index.html'),
        templateParameters: { ...htmlTemplateParams, ...buildTime },
        hash: false
      })
    ]
  })

const template = {
  '<!--# block name="footer" --><!--# endblock -->': '',
  '<!--#include virtual="/web/ui/resources/footer.html" stub="footer"-->': 'https://services.webjet.com.au/web/ui/resources/footer.html',
  '<!--# block name="header" --><!--# endblock -->': '',
  '<!--#include virtual="/web/ui/resources/header.html" stub="header"-->': 'https://services.webjet.com.au/web/ui/resources/header.html',
  '<div id="webview"></div>': ''
}

// function to fetch content from given url and return a promise
const fetchContent = ([placeHolder, url]) => {
  const defaultContent = { placeHolder, content: '' }

  return new Promise(resolve => {
    if (url) {
      console.log(`fetch content from: ${url}`)

      fetch(url)
        .then(response => response.ok ? response.text() : '')
        .then(content => resolve({ placeHolder, content }))
        .catch(() => resolve(defaultContent))
    } else {
      resolve(defaultContent)
    }
  })
}

module.exports = () => {
  return new Promise((resolve) => {
    const fetchContentPromises = Object.entries(template).map(fetchContent)

    Promise.all(fetchContentPromises)
      .then((contentList) => {
        const htmlReplace = []
        contentList.forEach((item) => {
          htmlReplace.push({
            pattern: item.placeHolder,
            replacement: item.content
          })
        })

        resolve(config(htmlReplace))
      })
      .catch(e => {
        console.log('Error: error generating template')
        console.log(e)
      })
  })
}
