const extendWebpackConfig = require("../webpack/extendWebpackConfignfig"); // TODO: load from @vulcan/webpack NPM package

// type NextConfig = {
//   webpack?: Object | Function
// }

// type WebpackConfig = {
//   resolve: {
//     mainFiles: Array<string>
//   }
// }

// type WebpackOptions = {
//   isServer: Boolean
// }

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    env: {
      ROOT_URL: process.env.ROOT_URL || "http://localhost:3000",
      GRAPHQL_URL:
        process.env.GRAPHQL_URL || "http://localhost:3000/api/graphql",
      ...nextConfig.env,
    },
    webpack: (config, options) => {
      if (!options.isServer) {
        config = extendWebpackConfig("client")(config);
      } else {
        config = extendWebpackConfig("server")(config);
      }

      //config.resolve.alias = {
      //  ...config.resolve.alias,
      //  components: path.join(__dirname, "..", "..", "..", "components/"),
      //  lib: path.join(__dirname, "..", "..", "..", "lib/"),
      //};

      //config.resolve.modules = [
      //  ...(config.resolve.modules || []),
      //  path.join(__dirname, "..", "..", "..", "packages"),
      //  "node_modules",
      //];

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }
      const debug = require("debug")("webpack");
      debug("extended config", config);

      return config;
    },
  });
};
