import { /*fsSync, */ promises as fs } from "fs";
import path from "path";
interface ListMdxFileArgs {
  dir: string;
  extensions?: Array<string>;
}
interface MdxFile {
  fileName: string; // filename with extension
  relativePath: string;
}
/**
 * Get all MD/MDX files of a folder, in order to generate indexes without imports
 */
export const listMdxFiles = async ({
  dir,
}: ListMdxFileArgs): Promise<Array<MdxFile>> => {
  const fileNames = await fs.readdir(dir);
  const files = fileNames.map((fileName) => ({
    relativePath: path.join(dir, fileName),
    fileName,
  }));
  let mdFiles = [];
  //let folders = [];
  files.forEach((file) => {
    if (file.fileName.match(/.mdx?$/)) {
      const mdFile = {
        ...file,
        //pageName: file.fileName.split(".").slice(0, -1).join("."),
      };
      mdFiles.push(mdFile);
    } /*else if (fsSync.lstatSync(file.relativePath).isDirectory()) {
      folders.push(file);
    }*/
  });
  return mdFiles;
};
