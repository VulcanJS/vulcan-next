const edits = [
  [
    "node_modules/ts-invariant/package.json",
    {
      type: "module",
      exports: {
        ".": "./lib/invariant.esm.js",
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
      exports: {
        ".": "./index.js",
        "./link/error": "./link/error/index.js",
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
  const currentPackage = JSON.parse(fs.readFileSync(fullPath));
  const editedPackage = { ...currentPackage, ...fieldsToAdd };
  fs.writeFileSync(fullPath, JSON.stringify(editedPackage, null, 2));
  // Drop .next folder to force a rebuild
  console.log(
    "Edited, will drop '.next' folder to avoid build issues (only during dev)"
  );
  if (process.NODE_ENV !== "production") {
    const dotNextFolder = path.resolve(__dirname, "../../", ".next");
    fs.rmdirSync(dotNextFolder, { recursive: true });
  }
});
