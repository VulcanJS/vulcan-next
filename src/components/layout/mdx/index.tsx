// Default layout for MDX files
import MDXMuiLayout from "../MDXMuiLayout";

// The layout is a function that returns a React component,
// with the frontMatter as a closure
const MDXDefaultLayout = (frontMatter) => {
  return MDXMuiLayout;
};
export default MDXDefaultLayout;
