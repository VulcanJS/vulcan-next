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
      // TODO: remove JS from Next
      // html = html.replace('<script src="/bundle.js"></script>', "");
      // https://github.com/cypress-io/cypress/issues/4771
      // @see https://github.com/cypress-io/cypress-documentation/issues/108
      // cy.state is not currently documented nor typed
      (cy as any).state("document").write(html);
    });
  // now we can use "normal" Cypress api on the page
});
