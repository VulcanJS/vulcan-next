// @see https://glebbahmutov.com/blog/ssr-e2e/#removing-application-bundle
/**
 * Load the server rendered page, with no JavaScript
 * Allows to test SSR rendering with normal Cypress methods (cy.get etc.),
 * without having to mess around with jQuery
 */
Cypress.Commands.add("visitAsHtml", (route: string) => {
  cy.request(route)
    .its("body")
    .then((html) => {
      // remove the application code JS bundle
      html = html.replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        ""
      );
      // FIXME: https://github.com/cypress-io/cypress/issues/1611
      // It doesn't actually work if you run this command multiple times
      console.log("setting html", html.slice(0, 300));
      cy.document().invoke({ log: false }, "write", html);
    });
  // now we can use "normal" Cypress api on the page
});
