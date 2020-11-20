// type WebpackConfig = {
//   resolve: {
//       mainFiles: Array<string>
//   }
// }
// type Environment = "server" | "client"

const path = require("path");

const withMagicImports = (config = {}) => {
  if (!config.resolve) config.resolve = {};
  // This is still needed for Storybook or 3rd party Webpack baseds tools
  // However Next is able to resolve based just on the tsconfig.json
  // @see https://github.com/vercel/next.js/issues/19345 for progress on this
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    "~": path.join(__dirname, "../../../", "src"),
  };
  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.join(__dirname, "../../../", "packages"),
  ];
  return config;
};

/**
 * Extend a webpack config to resolve environment specific index files as a default
 * @see https://github.com/comus/react-vulcan-proposal/blob/master/src/withVulcan.js
 * @param environment
 */
const extendWebpackConfig = (environment) => (webpackConfig) => {
  // NOTE: you still need to have an "index" file for TypeScript, because it can't tell your environment
  if (environment === "server") {
    if (!webpackConfig.resolve) webpackConfig.resolve = {};
    webpackConfig.resolve.mainFiles = [
      "index.server.ts",
      "index.server.tsx",
      "index.server.js",
      "index.server.jsx",
      "index.ts",
      "index.tsx",
      "index.js",
      "index.jsx",
    ];
  } else if (environment === "client") {
    if (!webpackConfig.resolve) webpackConfig.resolve = {};
    webpackConfig.resolve.mainFiles = [
      "index.client.ts",
      "index.client.tsx",
      "index.client.js",
      "index.client.jsx",
      "index.ts",
      "index.tsx",
      "index.js",
      "index.jsx",
    ];
  }

  withMagicImports(webpackConfig);
  return webpackConfig;
};

module.exports = extendWebpackConfig;
