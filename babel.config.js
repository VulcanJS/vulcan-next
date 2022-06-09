const plugins = [
  // @see https://mui.com/guides/minimizing-bundle-size/
  [
    "babel-plugin-import",
    {
      libraryName: "@mui/material",
      libraryDirectory: "",
      camel2DashComponentName: false,
    },
    "core",
  ],
  [
    "babel-plugin-import",
    {
      libraryName: "@mui/icons-material",
      libraryDirectory: "",
      camel2DashComponentName: false,
    },
    "icons",
  ],
  // @see https://github.com/ant-design/babel-plugin-import
  [
    "babel-plugin-import",
    {
      libraryName: "lodash",
      libraryDirectory: "",
      camel2DashComponentName: false, // default: true
    },
  ],
];

// We need babel for code instrumentation
const enableCoverage = process.env.COVERAGE && process.env.COVERAGE !== "false";
if (enableCoverage) {
  const debug = require("debug")("coverage");
  debug("Enabling istanbul plugin in babel"); // eslint-disable-line no-console
  plugins.push("istanbul");
}

// Add support of styled components
/*
plugins.push([
  "styled-components",
  {
    ssr: true,
    displayName: true,
    preprocess: false,
  },
]);
*/

// // Fix for pragmaFrag issue @see https://github.com/vercel/next.js/issues/11230
// 05/2022/ breaks Jest, it has been removed
// plugins.push([
//   "@babel/plugin-transform-react-jsx",
//   {
//     runtime: "classic",
//   },
// ]);

module.exports = {
  // we also need next/babel preset to work with Next
  presets: [
    [
      "next/babel",
      {
        "styled-jsx": {
          plugins: ["styled-jsx-plugin-postcss"],
        },
        "preset-react": {
          // runtime: "classic",
        },
      },
    ],
  ],
  plugins,
  // ESM support in Jest
  babelrc: false,
  env: {
    // @see https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs
    // @see https://bl.ocks.org/rstacruz/511f43265de4939f6ca729a3df7b001c
    test: {
      plugins: ["@babel/plugin-transform-modules-commonjs"],
      presets: [
        [
          "next/babel",
          {
            "styled-jsx": {
              plugins: ["styled-jsx-plugin-postcss"],
            },
            "preset-react": {
              //needed somehow to avoid React messing the import
              runtime: "automatic",
            },
          },
        ],
      ],
    },
  },
};
