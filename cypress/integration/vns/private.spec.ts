describe("private pages", () => {
  describe("server side", () => {
    it("redirects when accessing private page", () => {
      cy.request("/vns/debug/private").then((res) => {
        // you won't see the 302 in Cypress, only the end result of the redirection
        expect(res.status).to.equal(200);
        expect(res.body).to.include("<h1>public</h1>");
      });
    });
    it("do not redirect when accessing allowed private page", () => {
      cy.request("/vns/debug/private?allowed=true").then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.include("<h1>private</h1>");
      });
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
});
