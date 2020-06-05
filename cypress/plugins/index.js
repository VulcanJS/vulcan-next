/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

const cypressTypeScriptPreprocessor = require("./cy-webpack-preprocessor");

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const fileProcessors = [];
  fileProcessors.push(cypressTypeScriptPreprocessor);
  const hasCoverage = process.env.COVERAGE && process.env.COVERAGE !== "false";
  const debug = require("debug")("coverage");
  debug("hasCoverage " + hasCoverage + " " + process.env.COVERAGE);
  if (hasCoverage) {
    debug("adding coverage task in Cypress");
    fileProcessors.push(
      require("@cypress/code-coverage/use-browserify-istanbul")
      //require("@cypress/code-coverage/use-babelrc") // on the fly instrumentation
    );
    require("@cypress/code-coverage/task")(on, config);
  }

  on("file:preprocessor", ...fileProcessors);

  return config;
};
