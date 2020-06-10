const { extendWebpackConfig } = require("../webpack"); // TODO: load from @vulcan/webpack NPM package

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
    // Use .env instead
    //env: {
    //  ROOT_URL: process.env.ROOT_URL || "http://localhost:3000",
    //  GRAPHQL_URL:
    //    process.env.NEXT_PUBLIC_GRAPHQL_URI ||
    //    "http://localhost:3000/api/graphql",
    //  ...nextConfig.env,
    //},
    webpack: (config, options) => {
      if (!options.isServer) {
        config = extendWebpackConfig("client")(config);
      } else {
        config = extendWebpackConfig("server")(config);
      }

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }
      const debug = require("debug")("webpack");
      debug("extended config", config);

      return config;
    },
  });
};
