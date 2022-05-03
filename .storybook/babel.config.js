// @see https://github.com/storybookjs/storybook/issues/12952
// Needed to get back React classic runtime
const config = require("../babel.config");
module.exports = {
  ...config,
  presets: ["@babel/preset-env", "@babel/preset-typescript"],
};
