Cypress.Commands.add("dataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});
Cypress.Commands.add("openAlert", (message) => {
  cy.window().then((w) => w.alert(message));
});

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<Element>;
    openAlert(message: string): void;
  }
}
