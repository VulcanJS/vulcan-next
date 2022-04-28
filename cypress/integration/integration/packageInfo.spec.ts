describe("package.json info", () => {
  it("adds app version in the html header", () => {
    cy.visitAsHtml("/");
    cy.get("html").should("have.attr", "data-app-version");
  });
});
