// import Link from "next/link";
// We have a custom link for material UI + next
import { Link } from "@vulcanjs/next-material-ui";
import { Typography } from "@material-ui/core";
// Default layout for MDX files
import MDXMuiLayout from "../MDXMuiLayout";

const indexLink = (
  <div style={{ margin: "32px auto", maxWidth: "1000px" }}>
    <Link href="/docs">
      <Typography>Back to documentation index</Typography>
    </Link>
  </div>
);
// The layout is a function that returns a React component,
// with the frontMatter as a closure
const MDXDocPageLayout = ({ children, frontMatter }) => (
  <div>
    {indexLink}
    <MDXMuiLayout>{children}</MDXMuiLayout>
    {indexLink}
  </div>
);
export default MDXDocPageLayout;
