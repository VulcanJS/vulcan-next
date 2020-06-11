describe("i18n", () => {
  describe("client side", () => {
    afterEach(() => {
      cy.resetDefaultLanguage();
    });
    it("should render text in French", () => {
      cy.setLanguage("fr");
      cy.visit("/vns/debug/i18n");
      cy.contains("Bonjour", { matchCase: false }).should("exist");
    });
    it("should render text in French", () => {
      cy.setLanguage("en");
      cy.visit("/vns/debug/i18n");
      cy.contains("Hi", { matchCase: false }).should("exist"); // TODO: should "NEVER" exist
    });
  });
  describe("ssr", () => {
    // those are actually the same test as client-side, but with timeout: 0
    // so we can differentiate i18n issues happening server-side, or client-side
    afterEach(() => {
      cy.resetDefaultLanguage();
    });
    it("should render in French", () => {
      cy.setLanguage("fr");
      cy.visit("/vns/debug/i18n");
      cy.contains("Bonjour", { matchCase: false, timeout: 0 }).should("exist");
    });
    it("should render text in French", () => {
      cy.setLanguage("en");
      cy.visit("/vns/debug/i18n");
      cy.contains("Hi", { matchCase: false, timeout: 0 }).should("exist"); // TODO: should "NEVER" exist
    });
  });
});
