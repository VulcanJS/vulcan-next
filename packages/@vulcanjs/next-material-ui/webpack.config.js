const merge = require("webpack-merge");
const path = require("path");
const baseConfig = require("../../webpack/webpack.config.base.common.prod");
// @see https://stackoverflow.com/questions/46010926/how-to-use-webpack-with-a-monorepo-yarnpkg-workspaces

//const merge = require('webpack-merge')
module.exports = merge(baseConfig, {
  entry: path.resolve(__dirname, "./index.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
  },
});
