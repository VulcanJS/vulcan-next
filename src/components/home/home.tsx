import "~/types/mdx.d.ts"; // TODO: load this automatically
import Readme from "../../../README.md";
export default () => (
  <div>
    <h1>Welcome to Vulcan Next Starter</h1>
    <p>
      Below, find the readme loaded from an MD file using{" "}
      <a href="https://mdxjs.com/">MDXJS</a>
    </p>
    <Readme />
  </div>
);
