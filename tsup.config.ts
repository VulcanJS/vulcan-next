/**
 * Tsup is used to bundle scripts outside of Next.js,
 * ie that will run on server "start".
 *
 * Those script can still import our models, or any non Next specific code.
 */
import { defineConfig } from "tsup";
import path from "path";

const commonConfig = {
  clean: true,
  splitting: false,
  // Skip until .d.ts.map is also supported https://github.com/egoist/tsup/issues/564
  // dts: true,
  sourcemap: true,
  tsconfig: path.resolve(__dirname, "./tsconfig.json"),
};
export default defineConfig([
  {
    // Register your TS scripts here
    entry: [
      "./.vn/scripts/ts-sources/db/seed.ts",
      "./.vn/scripts/ts-sources/db/reset.ts",
    ],
    ...commonConfig,
    format: ["esm"],
    outDir: "./.vn/scripts/js-generated",
    platform: "node",
    target: "node14",
  },
]);
