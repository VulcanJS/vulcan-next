Cypress.Commands.add("dataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});
Cypress.Commands.add("openAlert", (message) => {
  cy.window().then((w) => w.alert(message));
});
