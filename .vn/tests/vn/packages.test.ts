import { execSync } from "child_process";
describe("package.json consistency", () => {
  test("do not duplicate styled-jsx", () => {
    const why = execSync("yarn why styled-jsx").toString();
    const matches = why.match(/found "styled-jsx/gi);
    expect(matches).toHaveLength(1);
  });
});
