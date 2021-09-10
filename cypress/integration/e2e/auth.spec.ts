/**
 * NOTE: this is an e2e test, because login in is a critical part of the application
 *
 * Writing e2e tests, maintaining them and running them is expensive!
 *
 * When writing an integration test, instead you should mock calls to the API and return a fake user!
 *
 * @see https://docs.cypress.io/guides/getting-started/testing-your-app#Logging-in
 */
describe("auth", () => {
  beforeEach(() => {
    // NOTE: those operations are expensive! When testing less-critical part of your UI,
    // prefer mocking API calls! We do this only because auth is very critical
    cy.exec("yarn run db:test:reset");
    cy.exec("yarn run db:test:seed");
  });
  after(() => {
    // clean the db when done
    cy.exec("yarn run db:test:reset");
    cy.exec("yarn run db:test:seed");
  });

  // NOTE: for integration testing, prefer short, unit test
  // but for e2e it's ok to test small user-centric scenarios like login then logout
  it("login from home and logout", () => {
    // 1. can visit the page
    cy.visit("/");
    cy.findByText(/login/i).click();
    cy.url().should("match", /login/);
    // 2. can login
    cy.findByLabelText(/email/i).type(Cypress.env("ADMIN_EMAIL"));
    // if you have changed ADMIN_INITIAL_PASSWORD in .env.development, please add the new
    // value in your local .env.development.local (it's safe, it's not tracked by git)
    // this is necessary for this test to pass
    cy.findByLabelText(/password/i).type(Cypress.env("ADMIN_INITIAL_PASSWORD"));
    cy.findByRole("button").click();
    cy.url().should("match", /\/$/);
    // 3. logout
    cy.findByText(/logout/i).click();
    cy.findByText(/logout/i).should("not.exist");
    cy.findByText(/login/i).should("exist");
  });
  it("signup from home", () => {
    cy.visit("/");
    const newMember = {
      email: "test-user@vulcanjs.org",
      password: "!cypress-test1234",
    };
    cy.findByText(/signup/i).click();
    cy.url().should("match", /signup/);
    cy.findByLabelText(/email/i).type(newMember.email);
    cy.findByLabelText(/^password/i).type(newMember.password);
    cy.findByLabelText(/repeat password/i).type(newMember.password);
    cy.findByRole("button", { name: /signup/i }).click();
    // Signing up doesn't automatically log you in
    // TODO: in the future, we will add email verification as well
    cy.url().should("match", /login/);
  });
  it("login, changes password", () => {
    cy.visit("/login");
    cy.findByLabelText(/email/i).type(Cypress.env("ADMIN_EMAIL"));
    cy.findByLabelText(/password/i).type(Cypress.env("ADMIN_INITIAL_PASSWORD"));
    cy.findByRole("button").click();
    // Go to the password change page
    cy.findByText(/profile/i).click();
    cy.url().should("match", /profile/);
    // Change password
    cy.findByLabelText(/old password/i).type(
      Cypress.env("ADMIN_INITIAL_PASSWORD")
    );
    cy.findByLabelText(/^new password/i).type("!cypress-test1234");
    cy.findByLabelText(/confirm new password/i).type("!cypress-test1234");
    cy.findByRole("button", { name: /update password/i }).click();
    // Success message
    cy.findByText(/password successfully updated/i).should("exist");
  });

  // TODO: follow this tutorial to test email based workflows: password reset, email verification
});
