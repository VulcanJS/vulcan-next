/**
 * Here we test nested markdown files
 */
const docsRoot = "/vn/docs";
describe("doc", () => {
  it("navigate through folders", () => {
    cy.visit(docsRoot + "/");
    cy.findByText(/Features/i).click();
    cy.url().should("include", "/docs/features");
  });
  /*
  Doc are now moved to Docusaurus so we only left the setup
  it("access to the nested markdown file", () => {
    cy.visit(docsRoot + "/features");
    cy.findByText(/Not Yet Implemented Features/i).click();
    cy.url().should("include", "/docs/features/not-yet-implemented-features");
    cy.findByText(/NOT YET IMPLEMENTED:/i).should("exist");
  });
  it("files and folders contains indexLink", () => {
    cy.visit(docsRoot + "/features");
    cy.findAllByText(/Back to documentation index/i).should("exist");
    cy.visit(docsRoot + "/features/not-yet-implemented-features");
    cy.findAllByText(/Back to documentation index/i)
      .first()
      .click();
    cy.url().should(
      "not.include",
      "/docs/features/not-yet-implemented-features"
    );
  });
  it("previousPageLink is where it should", () => {
    cy.visit(docsRoot + "/features");
    cy.findByText(/Previous page/i).should("not.exist");
    cy.visit(docsRoot + "/features/not-yet-implemented-features");
    cy.findAllByText(/Previous page/i)
      .first()
      .click();
    cy.url().should(
      "not.include",
      "/docs/features/not-yet-implemented-features"
    );
  });
  */
});
