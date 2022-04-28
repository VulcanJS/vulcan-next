/**
 * Initialize debug with NPM debug
 *
 * Note: this is a client-side file, prefix environment variables with CYPRESS_ if necessary
 */
before(() => {
  console.info("Running Cypress before hook from 'cypress/support/before.ts'");
  const debugEnv = Cypress.env("DEBUG"); // Set CYPRESS_DEBUG if you want this variable to be defined (the CYPRESS_ prefix is scrapped out automatically)
  if (!(debugEnv && debugEnv === "false")) {
    const debugLevel = debugEnv || "vns:*";
    console.info("Enabling debug with namespace", debugLevel);
    console.info(
      "Run Cypress with CYPRESS_DEBUG=false to disable, or CYPRESS_DEBUG=<your-namespace> to change the debug namespace"
    );
    window.localStorage.setItem("debug", debugLevel);
  }
});
