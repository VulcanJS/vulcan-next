import "~/types/mdx.d.ts"; // TODO: load this automatically
import Readme from "../../../README.md";
import { Typography } from "@material-ui/core";

export const Home = () => (
  <div>
    <div className="welcome-message">
      <Typography>
        Hi there! You are running Vulcan Next! You are doing great so far.
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
    </div>
    <Readme />
    <style jsx>
      {`
        .welcome-message {
          padding: 32px 32px;
          font-size: 110%;
          background: linear-gradient(10deg, #e1009811, #3f77fa11);
          backbround-color: #3f77fa5533;
          border-image-slice: 1;
          border: 8px dotted #3f77fa11;
        }
      `}
    </style>
  </div>
);

export default Home;
