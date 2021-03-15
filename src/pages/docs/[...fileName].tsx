import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import path from "path";
import { listMdxFiles } from "@vulcanjs/mdx";
import { promises as fsPromises } from "fs";

// Define components to allow them in your mdx files
// import Test from '../components/test'
//
// const components = { Test }

export default function DocPage({ source }) {
  const content = hydrate(source); //, { components });
  return <div className="wrapper">{content}</div>;
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
  // MDX text - can be from a local file, database, anywhere
  // const source = "Some **mdx** text, with a component Test";
  const fileName = params.fileName[0];
  // TODO: supports only .md at this point
  const filePath = path.resolve("./src/content/docs", fileName + ".md"); // get file
  const source = await fsPromises.readFile(filePath, { encoding: "utf8" });
  const mdxSource = await renderToString(source); //, { components });
  return { props: { source: mdxSource } };
}
