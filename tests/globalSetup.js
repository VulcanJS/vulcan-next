const { loadEnvConfig } = require("@next/env");
module.exports = async () => {
  console.log("Loading environment variables in Jest from .env files");
  // @see https://github.com/vercel/next.js/issues/17903#issuecomment-708902413
  await loadEnvConfig(process.env.PWD);
  // Compute next.config env => it defines the constructed variables, so we need
  // to run it in Jest for the config to work correctly
  /*
  const envVariables = extendEnv({}).env; // TODO: we need to refactor next.config.js slightly to extract this "extendEnv" code
  Object.entries(envVariables).forEach(([varName, varValue]) => {
    process.env[varName] = varValue;
  });
  */
};
