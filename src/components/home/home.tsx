import "~/types/mdx.d.ts"; // TODO: load this automatically
import Readme from "../../../README.md";
export default () => (
  <div>
    <em>
      Below, find Vulcan Next Starter Readme loaded from an MD file using{" "}
      <a href="https://mdxjs.com/">MDXJS</a>
    </em>
    <Readme />
  </div>
);
