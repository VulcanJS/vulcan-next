import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import path from "path";
import { listMdxFiles } from "@vulcanjs/mdx";
import { promises as fsPromises } from "fs";
import { Link, Typography } from "@material-ui/core";

import matter from "gray-matter";
import { muiMdComponents } from "~/components/layout/muiMdComponents";

// Define components to allow them in your mdx files
// import Test from '../components/test'
//
// You can also replace HTML tags (components is passed to MDXProvider )
// @see https://mdxjs.com/table-of-components
const components = {
  //Test,
  ...muiMdComponents,
};

const indexLink = (
  <div style={{ margin: "32px auto", maxWidth: "1000px" }}>
    <Link href="/docs">
      <Typography>Back to documentation index</Typography>
    </Link>
  </div>
);

export default function DocPage({ source, frontMatter /*, filePath*/ }) {
  const content = hydrate(source, {
    components,
  });
  return (
    <div className="MDXProvider root">
      {indexLink}
      {content}
      {indexLink}
      <style jsx>{`
        .MDXProvider.root {
          margin: 32px auto;
          max-width: 1000px;
        }
      `}</style>
    </div>
  );
}

export async function getStaticPaths() {
  const docsDir = path.resolve("./src/content/docs"); // relative to the project root
  // TODO: doesn't handle nesting yet, we suppose the file are locaed at the root
  const files = await listMdxFiles({ dir: docsDir });
  const pageNames = files.map((f) =>
    f.fileName.split(".").slice(0, -1).join(".")
  );
  // path is the file without the extension
  const paths = pageNames.map((name) => ({ params: { fileName: [name] } }));
  return {
    paths,
    fallback: false, // See the "fallback" section below
  };
}
export async function getStaticProps({ params }) {
  const fileName = params.fileName[0];
  // TODO: supports only .md at this point
  const filePath = path.resolve("./src/content/docs", fileName + ".md"); // get file
  const source = await fsPromises.readFile(filePath, { encoding: "utf8" });
  // MDX text - can be from a local file, database, anywhere
  const { content, data } = matter(source);
  // Does a server-render of the source and relevant React wrappers + allow to inject React components
  const mdxSource = await renderToString(content, { components });
  return { props: { source: mdxSource, frontMatter: data, filePath } };
}
