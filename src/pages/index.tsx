import Home from "~/components/home";
//import { useForm } from "react-hook-form";
import path from "path";
import { promises as fsPromises } from "fs";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import { muiMdComponents } from "~/components/layout/muiMdComponents";
import { PageLayout } from "~/components/layout";
import { Box } from "@mui/material";

// inject both the custom components + default components like h1, p, etc.
const components = { ...muiMdComponents };
const HomePage = ({ source }) => {
  const readMeContent = hydrate(source, {
    components,
  }); //, { components });
  return (
    <PageLayout>
      <main>
        <Home />
        <Box
          sx={{
            borderLeft: "1px solid",
            paddingLeft: "24px",
            borderImageSource: "linear-gradient(10deg, #e1009855, #3f77fa55)",
            borderImageSlice: 1,
            borderColor: "#3f77fa",
          }}
        >
          {readMeContent}
        </Box>
      </main>
    </PageLayout>
  );
};

export async function getStaticProps() {
  const filePath = path.resolve("./README.md");
  const source = await fsPromises.readFile(filePath, { encoding: "utf8" });
  // MDX text - can be from a local file, database, anywhere
  // Does a server-render of the source and relevant React wrappers + allow to inject React components
  const mdxSource = await renderToString(source, { components });
  return { props: { source: mdxSource } };
}

export default HomePage;
