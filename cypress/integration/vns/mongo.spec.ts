describe("connect to mongo", () => {
  it("get the best restaurants in town", () => {
    cy.visit("/vns/debug/mongo");
    cy.get("li").should("have.length", 5);
  });
});
