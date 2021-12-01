import { Container, Box } from "@mui/material";
import { ReactElement } from "react";
import Head from "next/head";

/**
 * Default layout, to be used in pages
 *
 */
interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => (
  <Container sx={{ mx: "auto", my: 2 }}>
    <Head>
      <script async defer src="https://buttons.github.io/buttons.js"></script>
    </Head>

    <header>
      <Box sx={{ textAlign: "center" }}>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=VulcanJS&repo=vulcan-next&type=star&count=true&size=large"
          frameBorder="0"
          scrolling="0"
          width="170"
          height="30"
          title="GitHub"
        ></iframe>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=VulcanJS&repo=vulcan-next&type=fork&count=true&size=large"
          frameBorder="0"
          scrolling="0"
          width="170"
          height="30"
          title="GitHub"
        ></iframe>
      </Box>
    </header>
    {children}
  </Container>
);

/**
 * To be used in pages
 * @example  const MyPageComponent.getLayout = getDefaultPageLayout
 */
export const getDefaultPageLayout = function (page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default PageLayout;
