import nextConfig from "../../next.config";
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

describe("extend next config", () => {
  test("return a valid object", () => {
    const extendedConfig = nextConfig(PHASE_DEVELOPMENT_SERVER, {
      defaultConfig: {},
    });
    expect(extendedConfig).toHaveProperty("publicRuntimeConfig");
    expect(extendedConfig).toHaveProperty("serverRuntimeConfig");
    expect(extendedConfig).toHaveProperty("webpack");
  });
  test("include next default config", () => {
    const extendedConfig = nextConfig(PHASE_DEVELOPMENT_SERVER, {
      defaultConfig: { foobar: true },
    });
    // NOTE: not very robust test, I try to test that our extended config still include the props of the default config
    expect(extendedConfig).toHaveProperty("foobar", true);
  });
});
