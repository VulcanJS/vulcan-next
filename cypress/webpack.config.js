// @see https://github.com/cypress-io/cypress-webpack-preprocessor/tree/master/examples/use-ts-loader
const path = require("path");
const extendWebpackConfig = require("../packages/@vulcanjs/webpack/extendWebpackConfig");

const config = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: ["node_modules"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};

const extended = extendWebpackConfig()(config);

// TODO: does not seem reckognized by Cypress, right now we still use webpack 4
delete extended.resolve.fallback;

module.exports = extended;
