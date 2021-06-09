// plugins/index.js
// pure dotenv version
// require('dotenv').config()
const { loadEnvConfig } = require("@next/env");
module.exports = async (on, config) => {
  // Please leave this message (and update it if it has gone stales), it explains why the testing environment
  // might have some difference with the real code
  console.info(
    `Loading environment variables in Cypress, from Next .env files`
  );
  // @see https://github.com/vercel/next.js/issues/17903#issuecomment-708902413
  const { combinedEnv } = await loadEnvConfig(
    // needed to find the files
    process.env.PWD,
    // will load either from .env.development or .env.production
    process.env.NODE_ENV === "development"
  );
  config.env = { ...config.env, ...combinedEnv };
};
