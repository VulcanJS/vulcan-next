Cypress.Commands.add("setLanguage", (language: string) => {
  cy.setCookie("next-i18next", language);
});
Cypress.Commands.add("resetDefaultLanguage", () => {
  cy.clearCookie("next-i18next");
});
