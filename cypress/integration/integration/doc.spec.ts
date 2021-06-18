/**
 * Here we test nested markdown files with src/content/docs/features/not-yet-implemented-features.md file
 */
describe("doc", () => {
    it("navigate through folders", () => {
        cy.visit("/docs");
        cy.findByText(/Features/i).click();
        cy.url().should('include', '/docs/features');
    });
    it("access to the nested markdown file", () => {
        cy.visit("/docs/features");
        cy.findByText(/Not Yet Implemented Features/i).click();
        cy.url().should('include', '/docs/features/not-yet-implemented-features');
        cy.findByText(/NOT YET IMPLEMENTED:/i).should("exist");
    });
    it("files and folders contains indexLink", () => {
        cy.visit("/docs/features");
        cy.findAllByText(/Back to documentation index/i).should("exist");
        cy.visit("/docs/features/not-yet-implemented-features");
        cy.findAllByText(/Back to documentation index/i).first().click();
        cy.url().should('not.include', '/docs/features/not-yet-implemented-features');

    });
    it("previousPageLink is where it should", () => {
        cy.visit("/docs/features");
        cy.findByText(/Previous page/i).should("not.exist");
        cy.visit("/docs/features/not-yet-implemented-features");
        cy.findAllByText(/Previous page/i).first().click();
        cy.url().should('not.include', '/docs/features/not-yet-implemented-features');
    });
});