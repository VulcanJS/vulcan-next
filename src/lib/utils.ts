/**
 * Example:
 * APOLLO_SERVER_CORS_WHITELIST=http://localhost:5000,https://www.my-client.org
 * => parse the string and makes it an array
 * @param {*} variable Env array variables, with values separated by a comma (spaces allowed)
 */
export const parseEnvVariableArray = (variable = "") => {
  return variable.split(",").map((s) => s.trim());
};
