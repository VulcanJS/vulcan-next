// We need babel for code instrumentation
const plugins = [];
if (process.env.COVERAGE) {
  console.debug("Enabling istanbul plugin in babel"); // eslint-disable-line no-console
  plugins.push("istanbul");
}

module.exports = {
  // we also need next/babel preset to work with Next
  presets: ["next/babel"],
  plugins,
  babelrc: false,
};
