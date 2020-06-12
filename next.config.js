const { extendNextConfig } = require("./packages/@vulcan/next"); // TODO: load from @vulcan/next when it's on NPM
const debug = require("debug")("next");

// @see https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
module.exports = (phase, { defaultConfig }) => {
  let extendedConfig;
  extendedConfig = extendNextConfig(defaultConfig);

  extendedConfig.serverRuntimeConfig = {};
  extendedConfig.publicRuntimeConfig = {};

  // Enable Webpack analyzer
  if (process.env.ANALYZE && process.env.ANALYZE !== "false") {
    const debug = require("debug")("webpack");
    debug("Enabling Webpack bundle analyzer");
    const withBundleAnalyzer = require("@next/bundle-analyzer")({
      enabled: process.env.ANALYZE === "true",
    });
    extendedConfig = withBundleAnalyzer(extendedConfig);
  }

  debug("Extended next config FINAL " + JSON.stringify(extendedConfig));

  return extendedConfig;
};
