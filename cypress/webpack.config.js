// https://webpack.js.org/guides/typescript/
const path = require("path");
const extendWebpackConfig = require("../packages/@vulcan/webpack/extendWebpackConfig");

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
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};

const extended = extendWebpackConfig()(config);

module.exports = extended;
