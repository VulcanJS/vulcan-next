// TODO: use `loadConfig` from `packages/next/next-server/server/config.ts` to load local next config
// Put the config for storybook here
// @see https://github.com/zeit/next.js/issues/11143
module.exports = function getConfig() {
  return {
    publicRuntimeConfig: {},
    serverRuntimeConfig: {},
  };
};
