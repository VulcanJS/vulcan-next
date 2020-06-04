module.exports = {
  extends: "@istanbuljs/nyc-config-typescript",
  "report-dir": "coverage-e2e",
  all: true,
  include: ["src/**/*.{js,jsx,ts,tsx}"],
};
