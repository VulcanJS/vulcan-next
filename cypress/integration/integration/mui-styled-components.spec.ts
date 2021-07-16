//import colors from "~/lib/style/colors";
const orange = "rgb(255, 166, 22)"; // hex color will be translated to RGB during render so directly testing the HEX value won't work
describe("material-ui", () => {
  describe("ssr", () => {
    it("does render a button with emotion styles applied", () => {
      cy.visit("/vns/debug/emotion-mui");
      cy.get("button", { timeout: 0 }).should(
        "have.css",
        "background-color",
        orange
      ); //colors.orangeVulcan);
      cy.contains("material ui", { matchCase: false, timeout: 0 }).should(
        "exist"
      );
    });
  });
});
