describe("ssr", () => {
  // TODO: this test needs a running backend on localhost:3001, we should be able to test SSR on a public API instead
  // it needs to be able to switch graphql URI more easily
  it.skip("does not server-side render in loading state (either error or data)", () => {
    cy.visit("/vns/ssrDebug");
    // TODO: test is slower to fail because it will retry the should continuously, did not find an option to avoid this in should
    // @see https://github.com/cypress-io/cypress/issues/7651

    // alternative if contains raises issues
    //cy.get("div").first().should("have.text", "data");
    cy.contains("loading").should("not.exist");
  });
});
