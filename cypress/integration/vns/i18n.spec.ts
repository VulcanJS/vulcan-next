describe("i18n", () => {
  describe("client side", () => {
    // TODO: we do not yet detect language
    it.skip("should render text in French", () => {
      cy.visit("/vns/debug/i18n");
      cy.contains("Bonjour", { matchCase: false }).should("exist");
    });
    it("should render text in French", () => {
      cy.visit("/vns/debug/i18n");
      cy.contains("Hi", { matchCase: false }).should("exist"); // TODO: should "NEVER" exist
    });
  });
});
