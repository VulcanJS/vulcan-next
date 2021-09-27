import "~/types/mdx.d.ts"; // TODO: load this automatically
import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const Home = () => {
  const [isLocal, setIsLocal] = useState(false); // during SSR
  useEffect(() => {
    if (window.location.hostname === "localhost") {
      setIsLocal(true);
    }
  }, []);
  if (!isLocal) return null;
  return (
    <Paper
      sx={{
        p: 3,
        background: "linear-gradient(10deg, #e1009811, #3f77fa11)",
        backgroundColor: "#e1009800",
        border: "8px dotted #3f77fa11",
      }}
      className="welcome-message"
    >
      <Typography>
        Hi there! You are running Vulcan Next locally! You are doing great so
        far.
      </Typography>
      <Typography>
        Below, find Vulcan Next Readme loaded from a markdown file using{" "}
        <a href="https://mdxjs.com/">MDXJS</a>.
      </Typography>
      <Typography>
        You can also read the rest of{" "}
        <a href="/docs">Vulcan documentation here.</a>
      </Typography>
      <Typography>Have fun!</Typography>
    </Paper>
  );
};

export default Home;
