/// <reference path="../../support/index.d.ts" />
import helper from "~/lib/example-helper";

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
  it("loads an helper from src/", () => {
    expect(helper()).to.equal("foobar");
  });
  it("uses a React Testing command", () => {
    cy.visit("http://localhost:3000");
    cy.findAllByText("Vulcan Next").should("exist");
  });
});
