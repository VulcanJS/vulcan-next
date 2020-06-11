const { extendNextConfig } = require("./packages/@vulcan/next"); // TODO: load from @vulcan/next when it's on NPM

// @see https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
module.exports = (nextConfig = {}) => {
  let extendedConfig;
  extendedConfig = extendNextConfig(nextConfig);

  extendNextConfig.serverRuntimeConfig = {};
  extendNextConfig.publicRuntimeConfig = {};

  // Enable Webpack analyzer
  if (process.env.ANALYZE && process.env.ANALYZE !== "false") {
    const debug = require("debug")("webpack");
    debug("Enabling Webpack bundle analyzer");
    const withBundleAnalyzer = require("@next/bundle-analyzer")({
      enabled: process.env.ANALYZE === "true",
    });
    extendedConfig = withBundleAnalyzer(extendedConfig);
  }

  return extendedConfig;
};
