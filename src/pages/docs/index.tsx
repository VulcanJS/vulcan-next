import Link from "next/link";
import fsSync, { promises as fs } from "fs";
import path from "path";
const DocIndex = ({ mdFiles = [] }) => (
  <ul>
    {mdFiles.map(({ fileName, pageName }) => (
      <li key={pageName}>
        <Link href={`/docs/${fileName}`}>{pageName}</Link>
      </li>
    ))}
  </ul>
);

export const getStaticProps = async () => {
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
  return { props: { mdFiles } };
};

export default DocIndex;
