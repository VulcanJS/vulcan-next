// NOTE: we are currently (02/2022) using Jest+Babel setup instead of Jest+SWC,
// as we are still waiting for the SWC ecosystem to bring more mature plugins
// (for code coverage, i18n token parsing etc. etc.)

const { loadEnvConfig } = require("@next/env");
const extendEnv = require('../nextConfig/extendEnv');

module.exports = async () => {
  console.info('Jest setupTests script will:');
  console.info("Loading environment variables in Jest from .env files");
  // @see https://github.com/vercel/next.js/issues/17903#issuecomment-708902413
  await loadEnvConfig(
    // PWD will not be defined on windows, using cwd() instead
    process.env.PWD || process.cwd());
  // Compute next.config env => it defines the constructed variables, so we need
  // to run it in Jest for the config to work correctly
  console.info("Loading derived variables in Jest");
  const envVariables = extendEnv({}).env;
  Object.entries(envVariables).forEach(([varName, varValue]) => {
    process.env[varName] = varValue;
  });
};
