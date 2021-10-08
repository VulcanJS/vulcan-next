/**
 * Layout for MDX pages
 *
 * NOTE: you may want to use next-mdx-remote for more advanced use cases, see the docs
 */
import { MDXProvider } from "@mdx-js/react";

import { muiMdComponents } from "./muiMdComponents";

const components = { ...muiMdComponents };

export const MuiMdxLayout = (props) => {
  return (
    <MDXProvider components={components}>
      <div {...props} />
    </MDXProvider>
  );
};
