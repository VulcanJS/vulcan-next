import Link from "next/link";
import fsSync, { promises as fs } from "fs";
import path from "path";
import MDXMuiLayout from "~/components/layout/MDXMuiLayout";
const DocPage = ({ Content }) => {
  return (
    <MDXMuiLayout>
      <Link href="/docs">Back to index</Link>
      <Content />
    </MDXMuiLayout>
  );
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const { fileName } = params;
  const docsDir = path.resolve("./docs"); // relative to the project root
  const filePath = path.join(docsDir, fileName);
  const Content = require(filePath);
  return {
    props: {
      Content,
    },
  };
};
export const getStaticPaths = async () => {
  const docsDir = path.resolve("./docs"); // relative to the project root
  const fileNames = await fs.readdir(docsDir);
  const files = fileNames.map((fileName) => ({
    relativePath: path.join(docsDir, fileName),
    fileName,
  }));
  let mdFiles = [];
  let folders = [];
  files.forEach((file) => {
    if (file.fileName.match(/.mdx?$/)) {
      const mdFile = {
        ...file,
        pageName: file.fileName.split(".").slice(0, -1).join("."),
      };
      mdFiles.push(mdFile);
    } else if (fsSync.lstatSync(file.relativePath).isDirectory()) {
      folders.push(file);
    }
  });
  //const files = fileNames.map((fileName) => ({
  //  relativePath: path.join(docsDir, fileName),
  //  fileName,
  //}));
  const mdFileRoutes = mdFiles.map((f) => `/docs/${f.fileName}`);
  return { paths: mdFileRoutes, fallback: false };
};

export default DocPage;
