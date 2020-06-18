declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<Element>;
    openAlert(message: string): void;

    // i18n commands
    setLanguage(language: string): void;
    resetDefaultLanguage(): void;

    visitAsHtml(route: string): void;
  }
}
