const edits = [
  [
    "node_modules/ts-invariant/package.json",
    {
      type: "module",
      exports: {
        // 0.9
        //".": "./lib/invariant.esm.js",
        // 0.10
        ".": "./lib/invariant.js",
        "./process/index.js": "./process/index.js",
      },
    },
  ],
  [
    "node_modules/ts-invariant/process/package.json",
    {
      type: "module",
    },
  ],
  [
    "node_modules/@apollo/client/package.json",
    {
      type: "module",
      exports: {
        ".": "./index.js",
        "./link/error": "./link/error/index.js",
        "./testing": "./testing/index.js",
        "./core": "./core/index.js",
        "./cache": "./cache/index.js",
        "./utilities": "./utilities/index.js",
      },
    },
  ],
  ,
  [
    "node_modules/@apollo/client/link/error/package.json",
    {
      exports: {
        ".": "./index.js",
      },
    },
  ],
];

const fs = require("fs");
const path = require("path");

edits.forEach(([packageJsonPath, fieldsToAdd]) => {
  const fullPath = path.resolve(__dirname, "../../", packageJsonPath);
  console.log("Add fields", fieldsToAdd, "to", fullPath);
  try {
    const currentPackage = JSON.parse(fs.readFileSync(fullPath));
    const editedPackage = { ...currentPackage, ...fieldsToAdd };
    fs.writeFileSync(fullPath, JSON.stringify(editedPackage, null, 2));
  } catch (err) {
    console.warn("Could not read/write file", fullPath);
    console.warn("Maybe the package has been bootstraped via Lerna?");
    console.error(err);
  }
  // Drop .next folder to force a rebuild
  console.log(
    "Edited, will drop '.next' folder to avoid build issues (only during dev)"
  );
  const dotNextFolder = path.resolve(__dirname, "../../", ".next");
  if (process.NODE_ENV !== "production" && fs.existsSync(dotNextFolder)) {
    fs.rmdirSync(dotNextFolder, { recursive: true });
  }
});
