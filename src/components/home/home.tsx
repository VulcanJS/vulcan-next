import "~/types/mdx.d.ts"; // TODO: load this automatically
import Readme from "../../../README.md";
import { Typography } from "@material-ui/core";

export default () => (
  <div>
    <Typography>
      <em>
        Below, find Vulcan Next Readme loaded from an MD file using{" "}
        <a href="https://mdxjs.com/">MDXJS</a>
      </em>
    </Typography>
    <Readme />
  </div>
);
