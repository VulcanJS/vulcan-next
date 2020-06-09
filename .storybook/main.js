const { extendWebpackConfig } = require("../packages/@vulcan/webpack"); // TODO: load from @vulcan/webpack NPM package
module.exports = {
  stories: [
    "../stories/**/*.stories.@(js|ts|jsx|tsx)",
    "../src/**/*.stories.@(js|ts|jsx|tsx)",
  ],
  addons: ["@storybook/addon-actions", "@storybook/addon-links"],
  // https://github.com/storybookjs/storybook/blob/next/docs/src/pages/configurations/custom-webpack-config/index.md#debug-the-default-webpack-config
  webpackFinal: async (config, { configType }) => {
    // add magic imports and isomorphic imports to Storybook
    const withVulcan = extendWebpackConfig("client")(config);
    return withVulcan;
  },
};
