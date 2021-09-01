/**
 * NOTE: this is an e2e test, because login in is a critical part of the application
 * When writing an integration test, instead you should mock calls to the API and return a fake user
 * For testing signup, a more advanced stategy would be required with database cleaning
 *
 *
 * @see https://docs.cypress.io/guides/getting-started/testing-your-app#Logging-in
 */
describe("auth", () => {
  beforeEach(() => {
    cy.request("/api/debug/db/reset");
    cy.request("/api/debug/db/seed");
  });
  it("login", () => {
    cy.visit("/login");
    cy.findByLabelText(/email/i).type(Cypress.env("ADMIN_EMAIL"));
    // if you have changed ADMIN_INITIAL_PASSWORD in .env.development, please add the new
    // value in your local .env.development.local (it's safe, it's not tracked by git)
    // this is necessary for this test to pass
    cy.findByLabelText(/password/i).type(Cypress.env("ADMIN_INITIAL_PASSWORD"));
    cy.findByRole("button").click();
    cy.url().should("match", /\/$/);
  });
  it.skip("logout", () => {});
});
