describe("ssr", () => {
  describe("apollo ssr enabled", () => {
    before(() => {
      // check that the API call is ok before testing
      // other
      cy.visit("/vns/debug/apolloSsr");
      cy.contains("data").should("exist");
    });
    it("does not server-side render in loading state", () => {
      cy.visit("/vns/debug/apolloSsr");
      // TODO: test is slower to fail because it will retry the should continuously, did not find an option to avoid this in should
      // @see https://github.com/cypress-io/cypress/issues/7651
      // TODO: it also give false positive after rehydratation
      // cy.contains("loading").should("not.exist");

      // escape hatch that bypass should default behaviour, it behaves like a "should("never.exist")"" assertion (Cypress does not have such an assertion)
      cy.get("div")
        .first()
        .then(($div) => {
          expect($div.text()).to.not.equal("loading");
        });
      cy.contains("data").should("exist");
    });
  });
  describe("apollo ssr disabled", () => {
    it("does server-side render in loading state", () => {
      cy.visit("/vns/debug/noApolloSsr");
      cy.contains("loading").should("exist");
      // NOTE: the query will fail client-side, since we don't have CORS
      // It's normal
      cy.contains("error").should("exist");
    });
  });
});
