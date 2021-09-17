//**** API TESTS
// TODO: those tests should be replaced by tests against API routes when this is more mature in Next (no need to use a browser here)
import { apiRoutes } from "~/lib/api/apiRoutes";
describe("auth - API", () => {
  beforeEach(() => {
    // NOTE: those operations are expensive! When testing less-critical part of your UI,
    // prefer mocking API calls! We do this only because auth is very critical
    cy.exec("yarn run db:test:reset");
    cy.exec("yarn run db:test:seed");
    cy.task("resetEmails");
  });
  after(() => {
    // clean the db when done
    cy.exec("yarn run db:test:reset");
    cy.exec("yarn run db:test:seed");
  });

  // TODO: verification not yet implemented, to be done
  it("cannot login if not verified", () => {
    const email = "test-user@vulcanjs.org";
    const password = "!cypress-test1234";
    const newMember = { email, password };
    cy.request("POST", apiRoutes.account.signup.href, {
      ...newMember,
    })
      .its("status")
      .should("equal", 200);
    cy.request({
      method: "POST",
      url: apiRoutes.account.login.href,
      body: {
        ...newMember,
      },

      failOnStatusCode: false,
    })
      .its("status")
      .should("equal", 401);
  });
  it("admin can login  even if not verified", () => {
    const email = Cypress.env("ADMIN_EMAIL");
    const password = Cypress.env("ADMIN_INITIAL_PASSWORD");
    const admin = { email, password };
    cy.request({
      method: "POST",
      url: apiRoutes.account.login.href,
      body: {
        ...admin,
      },

      failOnStatusCode: false,
    })
      .its("status")
      .should("equal", 200);
  });
});
