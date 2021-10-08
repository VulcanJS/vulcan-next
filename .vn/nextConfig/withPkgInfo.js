//NOTE: keep this a node JS file, since next.config.js doesn't accept TS at the time of writing
// fooBar => FOO_BAR
const camelToTitle = (camelStr) => {
  return camelStr
    .replace(/[A-Z]/g, " $1") // fooBar => foo Bar
    .split(" ")
    .map((t) => t.toUpperCase())
    .join("_");
};

// NOTE: NEVER import package.json elswhere in your app!
// We can import it here because next.config is not in the client side bundle
// We then pass only the relevant values in the config
const packageJSON = require("../../package.json");

// Add package.json metadata to runtime configs and environment
const withPkgInfo = (nextConfig = {}) => {
  // Public
  // It's still unclear where such config should go
  // @see https://github.com/vercel/next.js/discussions/14308
  const publicPkgInfo = {
    version: packageJSON.version,
  };
  if (!nextConfig.publicRuntimeConfig) nextConfig.publicRuntimeConfig = {};
  nextConfig.publicRuntimeConfig.pkgInfo = publicPkgInfo;
  // Also enhance environment with the same infos
  Object.entries(publicPkgInfo).map(([key, value]) => {
    const envKey = `NEXT_PUBLIC_PKGINFO_${camelToTitle(key)}`;
    nextConfig.env[envKey] = `${value}`; // we convert to string
  });

  return nextConfig;
};
module.exports = withPkgInfo;
