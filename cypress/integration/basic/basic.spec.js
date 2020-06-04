/// <reference path="../../support/index.d.ts" />

describe("basic (vanilla JavaScript test file)", () => {
  it("runs the app on port 3000", () => {
    cy.visit("http://localhost:3000");
    expect(true).to.equal(true);
  });
  it("runs a custom command", () => {
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`Hello`);
    });
    cy.openAlert("Hello");
  });
});
