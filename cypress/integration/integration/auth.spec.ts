/**
 * NOTE: those are integration test, so actual requests can be mocked
 * See e2e folder for testing against the actual api
 */
import { apiRoutes } from "~/core/server/apiRoutes";
import { routes } from "~/core/routes";
it("redirect back to from page after login", () => {
  // TODO: mock the auth request with MSW and Cypress instead of actually login in
  cy.intercept(
    apiRoutes.account.login.method as any,
    `${apiRoutes.account.login.href}`,
    {
      statusCode: 200,
      headers: {
        "Set-Cookie":
          "token=fake-token; Max-Age=28800; Path=/; Expires=Thu, 02 Dec 2021 01:32:07 GMT; HttpOnly; SameSite=Lax",
      },
      body: { done: true },
    }
  );
  cy.intercept(
    apiRoutes.account.user.method as any,
    `${apiRoutes.account.user.href}`,
    {
      statusCode: 200,
      body: { user: null },
    }
  );
  cy.visit(`${routes.account.login.href}?from=%2Fvn%2Fadmin`);
  cy.findByLabelText(/email/i).type(Cypress.env("ADMIN_EMAIL"));
  cy.findByLabelText(/password/i).type(Cypress.env("ADMIN_INITIAL_PASSWORD"));
  cy.findByRole("button").click();
  cy.url().should("match", /admin$/);
  // NOTE: since we do a fake auth its ok that user is redirected back to login at the end
});
