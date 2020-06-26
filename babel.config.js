const plugins = [];

// We need babel for code instrumentation
const enableCoverage = process.env.COVERAGE && process.env.COVERAGE !== "false";
if (enableCoverage) {
  const debug = require("debug")("coverage");
  debug("Enabling istanbul plugin in babel"); // eslint-disable-line no-console
  plugins.push("istanbul");
}

module.exports = {
  // we also need next/babel preset to work with Next
  presets: [
    [
      "next/babel",
      {
        "styled-jsx": {
          plugins: ["styled-jsx-plugin-postcss"],
        },
      },
    ],
  ],
  plugins,
  babelrc: false,
};
