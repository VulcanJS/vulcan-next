// import Link from "next/link";
import { Link } from "@vulcan/next-material-ui"; // "next/link";
import MDXMuiLayout from "~/components/layout/MDXMuiLayout";

import entries from "../../../docs/entries";
import { Typography } from "@material-ui/core";

const indexLink = (
  <div style={{ margin: "32px auto", maxWidth: "1200px" }}>
    <Link href="/docs">
      <Typography>Back to documentation index</Typography>
    </Link>
  </div>
);
const DocPage = ({ /*Content,*/ pageName }) => {
  const Content = entries[pageName];
  return (
    <div>
      {indexLink}
      <MDXMuiLayout>
        <Content />
      </MDXMuiLayout>
      {indexLink}
    </div>
  );
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const { pageName } = params;
  return {
    props: {
      pageName,
    },
  };
};
export const getStaticPaths = async () => {
  const pages = Object.keys(entries);
  const paths = pages.map((page) => `/docs/${page}`);
  return { paths, fallback: false };
};

export default DocPage;
