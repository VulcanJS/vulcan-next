const mainConfig = require("../jest.config");
const newConfig = {
  ...mainConfig,
  //rootDir: "../", // TODO: moving this file in .vn folder doesn't work, rootDir is never correct
  projects: mainConfig.projects.map((p) => ({
    ...p,
    rootDir: "./", // = the folder where "jest" is run
    testPathIgnorePatterns: [
      "/node_modules/",
      "/cypress/",
      "/storybook/",
      "/.next/",
      "/stories/",
    ],
  })),
};

module.exports = newConfig;
