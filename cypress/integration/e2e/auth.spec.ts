/**
 * NOTE: this is an e2e test, because login in is a critical part of the application
 *
 * Writing e2e tests, maintaining them and running them is expensive!
 *
 * When writing an integration test, instead you should mock calls to the API and return a fake user!
 *
 * NOTE: APP SHOULD BE RUNNING IN DEV+TEST MODE or PRODUCTION
 * yarn run dev:test
 * or
 * yarn run start
 *
 * yarn run dev won't suffice because it doesn't spawn a mail server yet.
 *
 * @see https://docs.cypress.io/guides/getting-started/testing-your-app#Logging-in
 */
import { apiRoutes } from "~/lib/api/apiRoutes";
import { routes } from "~/lib/routes";
describe("auth", () => {
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

  // NOTE: for integration testing, prefer short, unit test
  // but for e2e it's ok to test small user-centric scenarios like login then logout
  it("login as admin from home and logout", () => {
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
  /*
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
  });*/
  it("signup from home and verify email", () => {
    /**
     * SIGNUP
     */
    cy.visit("/");
    const email = "test-user@vulcanjs.org";
    const password = "!cypress-test1234";
    const newMember = {
      email,
      password,
    };
    //intercept signup request
    cy.intercept("POST", apiRoutes.account.signup.href).as("signupRequest");

    cy.findByText(/signup/i).click();
    cy.url().should("match", /signup/);
    cy.findByLabelText(/email/i).type(email);
    cy.findByLabelText(/^password/i).type(password);
    cy.findByLabelText(/repeat password/i).type(password);
    cy.findByRole("button", { name: /signup/i }).click();

    cy.wait("@signupRequest");
    cy.get("@signupRequest").its("response.body").should("exist");

    // Signing up doesn't automatically log you in
    // cy.url().should("match", /login?s=need-verification/);
    cy.url().should("match", /verify-email/i);
    cy.findByText(/sent you an email/i).should("exist");
    // Get an error message because you didn'nt verify your email yet

    /**
     * VERIFICATION
     */
    // by now the SMTP server has probably received the email
    const verificationLinkRegex = new RegExp(
      `http://(?<domain>.+)${routes.account.verifyEmail.href}/(?<token>\\w+)`
    );
    // Then, we check for the verification email to be sent
    cy.task("getLastEmail", email).then((emailBody: string) => {
      const verificationLinkMatch = emailBody.match(verificationLinkRegex);
      cy.wrap(verificationLinkMatch).should("exist");
      const verificationLink = verificationLinkMatch?.[0] as string;
      const token = verificationLinkMatch?.groups?.token; // equivalent to getting the 2nd item
      // token = resetLink.groups.token

      // 3. Access verification link, get a success message and redirect to login
      cy.intercept("POST", apiRoutes.account.verifyEmail.href).as(
        "verifyEmail"
      );

      cy.visit(verificationLink);

      cy.wait("@verifyEmail");
      cy.get("@verifyEmail")
        .its("request.body")
        .should("deep.equal", { token });
      cy.get("@verifyEmail").its("response.body").should("exist"); // wait for the response to be there

      // User is redirected quickly so no need to check for this text
      //cy.findByText(/successfully verified/i).should("exist");

      // 4. Login will now succeed
      // (NOTE: since login is already tested, we can simply test that we can access the login UI + send a request)
      cy.url().should("match", /login\?s=verified/);
      cy.findByLabelText(/email/i).type(email);
      cy.findByLabelText(/password/i).type(password);
      cy.findByRole("button").click();
      cy.url().should("match", /\/$/);
    });
  });
  it("login as admin, changes password", () => {
    cy.visit("/account/login");
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
    // TODO: logout and login again with new password
  });
  it("reset forgotten password", () => {
    const email = Cypress.env("ADMIN_EMAIL");
    cy.intercept("POST", apiRoutes.account.sendResetPasswordEmail.href).as(
      "sendLink"
    );
    // 1. Access password reset interface
    cy.visit("/account/login");
    cy.findByRole("link", { name: /forgot/i }).click();
    cy.url().should("match", /forgotten/i);
    cy.findByLabelText(/email/).type(email);
    cy.findByRole("button", {
      name: /send password reset email/i,
      exact: false,
    }).click();
    // 2. Send email
    cy.wait("@sendLink").its("request.body").should("deep.equal", {
      email,
    });
    /**
       * We wait for the reponse to be there, so that there are greater chances that the mail has been sent by the mail server
       * 
       * If this test is flaky (works locally but sometimes fails in other context for no reason), use this tip to retry the call
       * using cypress-recurse:
       * 
        // call the task every second for up to 20 seconds
        // until it returns a string result
        recurse(
          () => cy.task('getLastEmail', 'joe@acme.io'),
          Cypress._.isString,
          {
            log: false,
            delay: 1000,
            timeout: 20000,
          },
        ).then(email => ...)
       */
    cy.get("@sendLink").its("response.body").should("exist");
    // by now the SMTP server has probably received the email
    const resetLinkRegex = new RegExp(
      `http://(?<domain>.+)${routes.account.resetPassword.href}/(?<token>\\w+)`
    );

    cy.task("getLastEmail", email).then((emailBody: string) => {
      const resetLinkMatch = emailBody.match(resetLinkRegex);
      cy.wrap(resetLinkMatch).should("exist");
      const resetLink = resetLinkMatch?.[0] as string;
      //const token = resetLinkMatch?.groups?.token; // equivalent to getting the 2nd item
      // token = resetLink.groups.token
      // 3. Access reset interface and change password
      cy.visit(resetLink);
      const newPassword = "DHJAZHDJ873824$$1£_hello";
      cy.findByLabelText(/new password/i).type(newPassword);
      cy.findByRole("button", { name: /reset password/i }).click();
      cy.findByText(/password reset successfully/i).should("exist");
      // 4. Login with new password
      // (NOTE: since login is already tested, we can simply test that we can access the login UI + send a request)
      cy.url().should("match", /login/);
      cy.findByLabelText(/email/i).type(email);
      cy.findByLabelText(/password/i).type(newPassword);
      cy.findByRole("button").click();
      cy.url().should("match", /\/$/);
    });
  });
});
