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
              //transpileOnly: true, // FIXME: this option is mandatory for "basic.spec.js" to run correctly. But this is a palliative, there is an underlying issue.
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
