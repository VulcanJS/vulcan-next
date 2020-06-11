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
      cy.contains("loading", { timeout: 0 }).should("not.exist");
      cy.contains("data").should("exist");
    });
  });
  describe("apollo ssr disabled", () => {
    it("does server-side render in loading state", () => {
      cy.visit("/vns/debug/noApolloSsr");
      cy.contains("loading", { timeout: 0 }).should("exist");
      // NOTE: the query will fail client-side, since we don't have CORS
      // It's normal
      cy.contains("error").should("exist");
    });
  });
});
