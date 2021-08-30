const { extendNextConfig } = require("../../packages/@vulcanjs/next-config");
const flowRight = require("lodash/flowRight");
const debug = require("debug")("vns:next");
const packageJSON = require("../../package.json");

// fooBar => FOO_BAR
const camelToTitle = (camelStr: string): string => {
  return camelStr
    .replace(/[A-Z]/g, " $1") // fooBar => foo Bar
    .split(" ")
    .map((t) => t.toUpperCase())
    .join("_");
};

const withPkgInfo = (nextConfig) => {
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

// @see https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
module.exports = ({ defaultConfig }) => {
  let extendedConfig;
  extendedConfig = extendNextConfig(defaultConfig);

  extendedConfig.env = {
    NEXT_PUBLIC_IS_USING_DEMO_DATABASE: !!(process.env.MONGO_URI || "").match(
      /lbke\-demo/
    ),
    NEXT_PUBLIC_IS_USING_LOCAL_DATABASE: !!(process.env.MONGO_URI || "").match(
      /localhost/
    ),
  };

  // Enable Webpack analyzer
  if (process.env.ANALYZE && process.env.ANALYZE !== "false") {
    const debug = require("debug")("webpack");
    debug("Enabling Webpack bundle analyzer");
    const withBundleAnalyzer = require("@next/bundle-analyzer")({
      enabled: process.env.ANALYZE === "true",
    });
    extendedConfig = withBundleAnalyzer(extendedConfig);
  }

  // To support markdown import
  extendedConfig.pageExtensions = ["js", "jsx", "md", "mdx", "ts", "tsx"];
  extendedConfig = flowRight([
    withPkgInfo,
    // add other wrappers here
  ])(extendedConfig);

  debug("Extended next config FINAL " + JSON.stringify(extendedConfig));

  return extendedConfig;
};
