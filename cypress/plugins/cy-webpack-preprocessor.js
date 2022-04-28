const wp = require("@cypress/webpack-preprocessor");
const config = require("../webpack.config");

const options = {
  webpackOptions: config,
};

module.exports = wp(options);
