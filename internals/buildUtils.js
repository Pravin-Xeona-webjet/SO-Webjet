/* eslint-disable no-restricted-syntax */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcDir = path.resolve(__dirname, '../')

const htmlplugins = []
const environments = ['dev', 'prod']
const sites = ['wjau', 'wjnz']
const buildTime = { buildTime: Date.now() }

module.exports.configHtmlPlugins = () => {
  for (const env of environments) {
    for (const site of sites) {
      const siteDir = path.join(srcDir, `src/sites/${site}`)
      const htmlTemplateParamsPath = path.join(siteDir, `index.html.params.${env}.json`)
      // eslint-disable-next-line global-require
      const htmlTemplateParams = require(htmlTemplateParamsPath) // eslint-disable-line import/no-dynamic-require
      htmlplugins.push(
        new HtmlWebpackPlugin({
          filename: `index.${env}-${site}.html`,
          template: path.join(siteDir, 'index.html'),
          templateParameters: { ...htmlTemplateParams, ...buildTime }
        })
      )
    }
  }

  return htmlplugins
}

module.exports.getBuildEnv = () => {
  const environment = (process.env.NODE_ENV || 'development').toLowerCase()
  const siteName = (process.env.SITE_NAME || 'wjau').toLowerCase()
  const siteId = process.env.SITE_ID || ''

  return {
    environment,
    siteName,
    siteId,
    env: environment === 'development' ? 'dev' : 'prod'
  }
}
