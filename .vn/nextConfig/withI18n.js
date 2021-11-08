// @see https://github.com/isaachinman/next-i18next
// This is equivalent to next-config.js default export,
// but we wrap it as an HOC to avoid being locked with a specific
// i18n library
const i18nConfig = require("../../next-i18next.config");

const withI18n = (nextConfig = {}) => {
  return { ...nextConfig, ...i18nConfig };
};
module.exports = withI18n;
