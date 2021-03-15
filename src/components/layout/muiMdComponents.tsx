/**
 * MDX Layout, to be used with markdown file known in advance, for instance README.md
 *
 * For dynamic content, use next-mdx-remote setup instead (see how docs are handled)
 */
import {
  Typography,
  Table,
  TableBody,
  TableHead,
  // TableCell,
  TableRow,
  Link,
} from "@material-ui/core";

// @see https://mdxjs.com/table-of-components
// NOTE: those components are also used by next-mdx-remote based pages
export const muiMdComponents = {
  p: (props) => <Typography {...props} />,
  h1: (props) => <Typography variant="h1" {...props} />,
  h2: (props) => <Typography variant="h2" {...props} />,
  h3: (props) => <Typography variant="h3" {...props} />,
  h4: (props) => <Typography variant="h4" {...props} />,
  h5: (props) => <Typography variant="h5" {...props} />,
  h6: (props) => <Typography variant="h6" {...props} />,
  //thematicBreak: Typography,
  //blockquote: Typography,
  //ul: List,
  // ol: (props) => (
  //   <p>
  //     - <Typography component={"span"} variant="body2" {...props} />
  //   </p>
  // ),
  li: (props) => (
    <p>
      - <Typography component={"span"} variant="body2" {...props} />
    </p>
  ),
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  // th/td will give SyntaxError: Arg string terminates parameters early for unknown reasons
  // "th/td": TableCell,
  // pre: Typography,
  // code: Typography,
  // em: Typography,
  // strong: Typography,
  //del: Typography,
  //inlineCode: Typography,
  //hr: Typography,
  a: Link,
  // TODO: didn't find a way to override image styling...
  img: (props) => <img {...props} style={{ maxWidth: "100%" }} />,
};
