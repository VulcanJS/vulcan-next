import path from "path";
import { Link } from "@vulcanjs/next-material-ui"; // "next/link";
import { listMdxFiles } from "@vulcanjs/mdx";
import { List, ListItem, Typography } from "@material-ui/core";

const DocIndex = ({ pages = [] }) => (
  <div style={{ margin: "32px auto", maxWidth: "1000px" }}>
    <Typography variant="h1">
      <img src="/img/vns-logo-96.png" style={{ marginRight: "32px" }} />
      VNS Live Documentation
    </Typography>
    <List>
      {pages.map((pageName) => (
        <Link href={`/docs/${pageName}`}>
          <ListItem button key={pageName}>
            <Typography style={{ textTransform: "capitalize" }}>
              {
                pageName.replace(
                  /-/g,
                  " "
                ) /* we don't use the front matter of the file at this point to simplify loading, so we have to cleanup the name manually */
              }
            </Typography>
          </ListItem>
        </Link>
      ))}
      <hr></hr>
      <Link href="/">
        <Typography>Back to home</Typography>
      </Link>
    </List>
  </div>
);

export const getStaticProps = async () => {
  // list the .md(x) files in the docs folder
  // we suppose that the page name is always the file name without extension (no frontmatter URL customization)
  // NOTE: if frontMatter is needed, an alternative would be using https://github.com/jescalan/babel-plugin-import-glob-array
  // to import all frontMatters
  const docsDir = path.resolve("./src/pages/docs"); // relative to the project root
  const files = await listMdxFiles({ dir: docsDir });
  const pageNames = files.map((f) =>
    f.fileName.split(".").slice(0, -1).join(".")
  );
  const pages = pageNames.sort();
  return { props: { pages } };
};

export default DocIndex;
