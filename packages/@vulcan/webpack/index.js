const extendWebpackConfig = require('./extendWebpackConfig')
const withVulcan = require('./withVulcan')

extendWebpackConfig.withVulcan = withVulcan

module.exports = extendWebpackConfig
