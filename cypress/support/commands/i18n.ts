// NOTE: this will set the language cookie but won't automatically redirect users
Cypress.Commands.add("setLanguage", (language: string) => {
  cy.setCookie("NEXT_LOCALE", language);
});
Cypress.Commands.add("resetDefaultLanguage", () => {
  cy.clearCookie("NEXT_LOCALE");
});
