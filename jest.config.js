// No need to use ts-jest https://github.com/vercel/next.js/discussions/13528#discussioncomment-22933

// configuration that must be set for each project but does not change
const commonConfig = {
  // A map from regular expressions to paths to transformers
  // transform: undefined,
  transform: {
    //"^.+\\.[jt]sx?$": "ts-jest",
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    // MDX support
    "^.+\\.(md|mdx)$": "jest-transformer-mdx",
  },

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    "/node_modules/",
    "/cypress/",
    "/storybook/",
    "/.next/",
    "/stories/",
    // also ignore Vulcan Next specific tests
    "tests/vn",
  ],

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],

  // A map from regular expressions to module names that allow to stub out resources with a single module
  // @see https://nextjs.org/docs/testing#setting-up-jest-with-babel
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/src/$1",
    // Also handles multi-entrypoints imports eg @vulcanjs/graphql/server
    "@vulcanjs/(.*)/(.*)": [
      "<rootDir>/node_modules/@vulcanjs/$1",
      "<rootDir>/packages/@vulcanjs/$1",
    ],
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': `<rootDir>/__mocks__/fileMock.js`,
  },

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage-unit",

  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after `n` failures
  // bail: 0,

  // Respect "browser" field in package.json when resolving modules
  // browser: false,

  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "/tmp/jest_rs",

  // Automatically clear mock calls and instances between every test
  // clearMocks: false,

  // Indicates whether the coverage information should be collected while executing the test
  // collectCoverage: false,

  // An array of regexp pattern strings used to skip coverage collection
  // coveragePathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // A list of reporter names that Jest uses when writing coverage reports
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: undefined,

  // Make calling deprecated APIs throw helpful error messages
  // errorOnDeprecated: false,

  // Force coverage collection from ignored files using an array of glob patterns
  // forceCoverageMatch: [],

  // A set of global variables that need to be available in all test environments
  //globals: {
  //  "ts-jest": {
  //    tsConfig: "./tsconfig.jest.json",
  //  },
  //},

  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  // maxWorkers: "50%",

  // An array of directory names to be searched recursively up from the requiring module's location
  // moduleDirectories: [
  //   "node_modules"
  // ],

  // A path to a custom dependency extractor
  // dependencyExtractor: undefined,

  // A path to a module which exports an async function that is triggered once before all test suites
  globalSetup: "./.vn/tests/globalSetup",

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // Activates notifications for test results
  // notify: false,

  // An enum that specifies notification mode. Requires { notify: true }
  // notifyMode: "failure-change",

  // A preset that is used as a base for Jest's configuration
  // preset: undefined,

  // Run tests from one or more projects
  // projects: undefined,

  // Use this configuration option to add custom reporters to Jest
  // reporters: undefined,

  // Automatically reset mock state between every test
  // resetMocks: false,

  // Reset the module registry before running each individual test
  // resetModules: false,

  // A path to a custom resolver
  // resolver: undefined,

  // Automatically restore mock state between every test
  // restoreMocks: false,

  // The root directory that Jest should scan for tests and modules within
  //rootDir: undefined,

  // A list of paths to directories that Jest should use to search for files in
  roots: ["<rootDir>/src", "<rootDir>/.vn/tests"],

  // Allows you to use a custom runner instead of Jest's default test runner
  // runner: "jest-runner",

  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: [],

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // snapshotSerializers: [],

  // The test environment that will be used for testing
  // testEnvironment: "jest-environment-jsdom",

  // Options that will be passed to the testEnvironment
  // testEnvironmentOptions: {},

  // Adds a location field to test results
  // testLocationInResults: false,

  // The regexp pattern or array of patterns that Jest uses to detect test files
  // testRegex: [],

  // This option allows the use of a custom results processor
  // testResultsProcessor: undefined,

  // This option allows use of a custom test runner
  // testRunner: "jasmine2",

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  // testURL: "http://localhost",

  // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
  // timers: "real",

  // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
  // unmockedModulePathPatterns: undefined,

  // Indicates whether each individual test should be reported during the run
  // verbose: undefined,

  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  // watchPathIgnorePatterns: [],

  // Whether to use watchman for file crawling
  // watchman: true,
};

module.exports = {
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/stor{y,ies}.{js,ts,jsx,tsx}",
    "!**/*.stor{y,ies}.{js,ts,jsx,tsx}",
    "!**/node_modules/**",
    "!**/cypress/**",
    "!**/.storybook/**",
    "!**/stories/**",
    "!**/storybook-static/**",
    "!jest.config.js",
    "!**/out/**",
    "!**/dist/**",
    "!**/public/**",
    "!**/build/**",
    "!**/coverage/**",
  ],

  // configuration for each environment (client or server)
  projects: [
    {
      ...commonConfig,
      name: "client",
      displayName: "client",
      // testEnvironment: "jsdom", // defautl already
      // The glob patterns Jest uses to detect test files
      testMatch: [
        "**/__tests__/(!server)/**/*.[jt]s?(x)",
        "**/__tests__/*.[jt]s?(x)",
        "**/!(*.server).test.[jt]s?(x)",
      ],
      // A list of paths to modules that run some code to configure or set up the testing framework before each test
      setupFilesAfterEnv: ["./.vn/tests/setupTests.ts"],
      modulePaths: ["<rootDir>"],
    },
    {
      ...commonConfig,
      name: "server",
      displayName: "server",
      testEnvironment: "node",
      // The glob patterns Jest uses to detect test files
      testMatch: [
        "**/__tests__/server/**/*.[jt]s?(x)",
        "**/*.server.test.[jt]s?(x)",
      ],
      setupFilesAfterEnv: ["./.vn/tests/setupTests.server.js"],
      modulePaths: ["<rootDir>"],
    },
  ],
};
