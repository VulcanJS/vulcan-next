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
    it("should render text in English", () => {
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
    it("should render text in English", () => {
      cy.setLanguage("en");
      cy.visit("/vns/debug/i18n");
      cy.contains("Hi", { matchCase: false, timeout: 0 }).should("exist"); // TODO: should "NEVER" exist
    });
  });
  describe("document", () => {
    beforeEach(() => {
      cy.resetDefaultLanguage();
    });
    // @see https://glebbahmutov.com/blog/ssr-e2e/ for testing recipes
    it("should add fr as language and pass correct language direction", () => {
      cy.setLanguage("fr");
      // request instead of visit prevents client rehydratation, we just test the static code
      // => faster test when we don't need to test rehydration
      cy.visitAsHtml("/vns/debug/i18n");
      cy.get("html")
        .should("have.attr", "lang", "fr")
        .should("have.attr", "dir", "ltr");
    });
    // FIXME: https://github.com/VulcanJS/vulcan-next-starter/issues/40
    // Only one test can run correctly
    it.skip("should add en as language and pass correct language direction", () => {
      cy.setLanguage("en");
      cy.visitAsHtml("/vns/debug/i18n");
      //cy.visit("/vns/debug/i18n");
      cy.get("html")
        .should("have.attr", "lang", "en")
        .should("have.attr", "dir", "ltr");
    });
  });
});
