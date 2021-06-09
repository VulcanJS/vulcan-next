describe("material-ui", () => {
  describe("ssr", () => {
    it("does render a page", () => {
      cy.visit("/vns/debug/mui");
      cy.contains("material ui", { matchCase: false, timeout: 0 }).should(
        "exist"
      );
    });
  });
  describe("client-side", () => {
    it("does render a page", () => {
      cy.visit("/vns/debug/mui");
      cy.contains("material ui", { matchCase: false }).should("exist");
    });
  });
});
