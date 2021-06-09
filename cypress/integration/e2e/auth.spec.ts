/**
 * We suppose that there is at least one admin user, with credential in .env,
 * and that it is seeded on app start
 *
 * NOTE: this is an e2e test
 * When writing an integration test, instead you should mock calls to the API and return a fake user
 */
describe("auth", () => {
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
  it.skip("signin", () => {});
  it.skip("logout", () => {});
});
