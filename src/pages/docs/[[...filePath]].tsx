import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import path from "path";
import { getMdxPaths } from "@vulcanjs/mdx";
import { Link as NextLink } from "@vulcanjs/next-material-ui";
import { promises as fsPromises, lstatSync, existsSync } from "fs";
import { List, ListItem, Link, Typography } from "@material-ui/core";
import matter from "gray-matter";
import { muiMdComponents } from "~/components/layout/muiMdComponents";
import { MdxRemote } from "next-mdx-remote/types";

// Define components to allow them in your mdx files
// You can also replace HTML tags (components is passed to MDXProvider )
// @see https://mdxjs.com/table-of-components
const components = {
  ...muiMdComponents,
};

const indexLink = (
  <div style={{ margin: "32px auto", maxWidth: "1000px" }}>
    <Link href="/docs">
      <Typography>Back to documentation index</Typography>
    </Link>
  </div>
);

const homeLink = (
  <div style={{ margin: "32px auto", maxWidth: "1000px" }}>
    <Link href="/">
      <Typography>Back to home</Typography>
    </Link>
  </div>
);

const header = <Typography variant="h1">
  <Link href="/">
    <img src="/img/vns-logo-96.png" style={{ marginRight: "32px" }} />
  </Link>
  VN Live Documentation
</Typography>;

interface PageArguments {
  pages: Array<string>,
  filePath: string,
  source: MdxRemote.Source
}
export default function DocPage({ pages, filePath, source }: PageArguments) {
  if (source) { // It's a file, not a folder
    const content = hydrate(source, {
      components,
    });
    return (
      <div className="MDXProvider root">
        {header}
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
  else { // It's a folder
    return (
      <div style={{ margin: "32px auto", maxWidth: "1000px" }}>
        {header}
        <Typography style={{ textTransform: "capitalize" }} variant="h2"> {filePath} </Typography> {/* Print the subfolders we're in */}
        <List>
          {
            pages.map((pageName) => (
              <NextLink key={pageName} href={`/docs/${filePath}${pageName}`}>
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
              </NextLink>
            ))
          }
          <hr></hr>
          {filePath === '' /* Back home if we're in /docs, back to /docs if we're in a subfolder */
            ? homeLink
            : indexLink
          }
        </List>
      </div>
    )
  }
}

interface PathsProps {
  params: { filePath: Array<string> }
}
export async function getStaticPaths() {
  const docsDir = path.resolve("./src/content/docs"); // relative to the project root
  const files = await getMdxPaths(docsDir);
  const pageNames = files.map((f) =>
    f.params.fileName.join('/')
  );
  // paths is the file without the extension, shaped as [{ params: { filePath: [ 'subdirectory', 'file' ] } } ]
  let paths: Array<PathsProps> = [{ params: { filePath: [''] } }];
  pageNames.forEach(name => {
    const splittedName = name.split('/');
    splittedName.forEach( (item, index, array) => {
      paths.push({ params: { filePath: array.slice(0, index + 1) } });
    })
  })
  return {
    paths,
    fallback: false,
  };
}

/**
 * Get the mdx files if the paths leads to a folder, or the content of the mdx file if it is.
 * Be sure that a folder returns two elements and a file returns three, or change the implementation of the page consequently.
 */
export async function getStaticProps({ params }) {
  // Check if the filePath is a file or a directory
  if (!params.filePath) { // We're in /docs
    return (await getMdxPages(path.resolve("./src/content/docs"), '')); // relative to the project root
  }
  else { // we're in a file or a subfolder
    let resolvedPath = path.resolve("./src/content/docs/" + params.filePath.join('/'));
    if (existsSync(resolvedPath) && lstatSync(resolvedPath).isDirectory()) { // We're in a subfolder
      return (await getMdxPages(resolvedPath, params.filePath.join('/')));
    }
    else { // We're in a file
      resolvedPath = resolvedPath + '.md'
      // TODO: handle no .md files
      const source = await fsPromises.readFile(resolvedPath, { encoding: "utf8" });
      // MDX text - can be from a local file, database, anywhere
      const { content, data } = matter(source);
      // Does a server-render of the source and relevant React wrappers + allow to inject React components
      const mdxSource = await renderToString(content, { components });
      return { props: { pages: [], filePath: params.filePath.join('/'), source: mdxSource } };
    }
  }
}

/**
 * list the .md(x) files in the docs folder
 * /!\ Be sure that this function returns only two elements.
 */
const getMdxPages = async (resolvedPath: string, filePath: string) => {
  // 
  // we suppose that the page name is always the file name without extension (no frontmatter URL customization)
  // NOTE: if frontMatter is needed, an alternative would be using https://github.com/jescalan/babel-plugin-import-glob-array
  // to import all frontMatters
  const files = await getMdxPaths(resolvedPath);
  const pageNames = files.map((f) =>
    f.params.fileName[0]
  );
  const pages = [...new Set(pageNames.sort())]; // delete duplicates
  if (filePath) {
    filePath = filePath + '/';
  }
  return { props: { pages, filePath: filePath } };
};
