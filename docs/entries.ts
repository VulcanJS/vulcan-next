/**
 * We register doc here, as MDX components
 */

// Get markdown as React component, by importing them
import features from "./features.md";
import fromVulcanV1 from "./from-vulcan-v1.md";
import learnings from "./learnings.md";
import recipes from "./recipes.md";
import release from "./release.md";
import vscode from "./vscode.md";
console.log(vscode.name);

const entries: { [key: string]: React.ComponentType } = {
  features,
  fromVulcanV1,
  learnings,
  recipes,
  release,
  vscode,
};
export default entries;
