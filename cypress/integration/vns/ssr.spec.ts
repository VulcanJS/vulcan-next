describe("ssr", () => {
    it("does not server-side render in loading state (either error or data)", () => {
        cy.visit("/vns/ssrDebug")
        // TODO: test is slower because it will retry the should continuously, did not find an option to avoid this in should
        cy.contains("loading", { timeout: 1 }).should("not.exists")
    })
});
