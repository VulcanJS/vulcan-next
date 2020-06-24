describe("private pages", () => {
  describe("server side", () => {
    it("redirects when accessing private page", () => {
      cy.visit("/vns/debug/private");
      cy.get("h1").contains("public", { timeout: 0 }).should("exist");
      cy.get("h1").contains("private", { timeout: 0 }).should("not.exist");
    });
    it("do not redirect when accessing allowed private page", () => {
      cy.visit("/vns/debug/private?allowed=true");
      cy.get("h1").contains("public", { timeout: 0 }).should("not.exist");
      cy.get("h1").contains("private", { timeout: 0 }).should("exist");
    });
  });
  describe("client side", () => {
    it("redirects back to public page when accessing private page", () => {
      cy.visit("/vns/debug/public");
      cy.get(".private").click();
      cy.url().should("not.match", /private/);
      cy.url().should("match", /public/);
      cy.get("h1").contains("public").should("exist");
    });
    it("do not redirect when accessing allowed  private page", () => {
      cy.visit("/vns/debug/public");
      cy.get(".private-allowed").click();
      cy.url().should("not.match", /public/);
      cy.url().should("match", /private/);
      cy.get("h1").contains("private").should("exist");
    });
  });
  describe("shallow", () => {
    it("redirects back to public page when accessing private page", () => {
      cy.visit("/vns/debug/public");
      cy.get(".private-shallow").click();
      cy.url().should("not.match", /private/);
      cy.url().should("match", /public/);
      cy.get("h1").contains("public").should("exist");
    });
    it("do not redirect when accessing allowed  private page", () => {
      cy.visit("/vns/debug/public");
      cy.get(".private-allowed-shallow").click();
      cy.url().should("not.match", /public/);
      cy.url().should("match", /private/);
      cy.get("h1").contains("private").should("exist");
    });
  });
});
