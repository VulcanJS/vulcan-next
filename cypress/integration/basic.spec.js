describe("basic", () => {
  it("runs the app on port 3000", () => {
    cy.visit("http://localhost:3000");
    expect(true).to.equal(true);
  });
});
