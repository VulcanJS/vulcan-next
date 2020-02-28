// type WebpackConfig = {
//   resolve: {
//       mainFiles: Array<string>
//   }
// }
// type Environment = "server" | "client"

/**
* Extend a webpack config to resolve environment specific index files as a default
* @see https://github.com/comus/react-vulcan-proposal/blob/master/src/withVulcan.js
* @param environment 
*/
const extendWebpackConfig = (environment) => (webpackConfig) => {
  const extended = { ...webpackConfig }
  if (environment === 'server') {
    extended.resolve.mainFiles = ['index.server.ts', 'index.server.js', 'index.ts', 'index.js']
  } else if (environment === 'client') {
    extended.resolve.mainFiles = ['index.client.ts', 'index.client.js', 'index.ts', 'index.js']
  }
  return extended
}

module.exports = extendWebpackConfig
