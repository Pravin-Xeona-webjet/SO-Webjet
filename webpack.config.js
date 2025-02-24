const buildUtils = require('./internals/buildUtils')
const buildEnv = buildUtils.getBuildEnv()

module.exports = require(`./internals/webpack/webpack.${buildEnv.env}.js`)
