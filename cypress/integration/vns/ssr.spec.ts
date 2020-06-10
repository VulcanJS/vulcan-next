describe("ssr", () => {
  // TODO: this test needs a running backend on localhost:3001, we should be able to test SSR on a public API instead
  // it needs to be able to switch graphql URI more easily
  it("does not server-side render in loading state (either error or data)", () => {
    cy.visit("/vns/ssrDebug");

    // TODO: test is slower to fail because it will retry the should continuously, did not find an option to avoid this in should
    // @see https://github.com/cypress-io/cypress/issues/7651
    // TODO: it also give false positive after rehydratation
    // cy.contains("loading").should("not.exist");
    // escape hatch that bypass should default behaviour
    cy.get("div")
      .first()
      .then(($div) => {
        expect($div.text()).to.not.equal("loading");
      });
  });
});
