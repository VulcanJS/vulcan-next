import { Box } from "@mui/material";
import Head from "next/head";
export const GitHubButtonsHeader = () => (
  <>
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
  </>
);
