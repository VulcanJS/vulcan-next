const { extendWebpackConfig } = require("../packages/@vulcanjs/webpack");
const debug = require("debug");
const debugWebpack = debug("vns:webpack");
const path = require("path");

const plugins = [];
if (process.env.ANALYZE === "true") {
  debugWebpack("Enabling bundle analysis for Storybook"); // eslint-disable-line no-console
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  plugins.push(new BundleAnalyzerPlugin());
}
module.exports = {
  stories: [
    "../stories/**/*.stories.@(js|ts|jsx|tsx|mdx)",
    "../src/**/*.stories.@(js|ts|jsx|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-docs", // it seems that MDX is enabled as a default
    "@storybook/addon-backgrounds",
    // "@storybook/addon-knobs", // Knob is not installed as a default anymore, we prefer to use the more intuitive "controls" addon
    // @see https://medium.com/storybookjs/storybook-controls-ce82af93e430
    "@storybook/addon-controls",
    "@storybook/addon-a11y",
    // @see https://github.com/vercel/next.js/issues/19345
    // "@next/plugin-storybook",
    // handle CSS modules (until we have a Next plugin that does it for us)
    "storybook-css-modules-preset",
  ],
  // https://github.com/storybookjs/storybook/blob/next/docs/src/pages/configurations/custom-webpack-config/index.md#debug-the-default-webpack-config
  webpackFinal: async (config, { configType }) => {
    // add magic imports and isomorphic imports to Storybook
    const withVulcan = extendWebpackConfig("client")(config);
    // add mdx support, in components
    // @see https://mdxjs.com/getting-started/webpack
    withVulcan.module.rules.push({
      test: /\.mdx?$/,
      exclude: /\.stories.mdx?$/, // ignore stories themselves, that should be handled by addon-docs
      use: ["babel-loader", "@mdx-js/loader"],
    });
    // Bypass interference with Storybook doc, which already set a conflicting rule for .md import
    // @see https://github.com/storybookjs/storybook/issues/7644#issuecomment-592536159
    withVulcan.module.rules = [
      ...withVulcan.module.rules.filter(
        // rules do not necessarily have a test, it can be a "oneOf"
        (rule) => !rule.test || rule.test.source !== "\\.md$"
      ),
    ];

    // add mocks for NPM imports, eg next/router and next/config
    withVulcan.resolve.alias = {
      ...(withVulcan.resolve.alias || {}),
      "next/config": path.join(__dirname, "./mocks/packages/next-config.js"),
      "next/router": path.join(__dirname, "./mocks/packages/next-router.js"),
    };

    // load optional plugins (eg bundle analyzer)
    withVulcan.plugins = (withVulcan.plugins || []).concat(plugins);

    return withVulcan;
  },
};
