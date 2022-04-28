after(() => {
  console.info("Running after hook from 'cypress/support/after.ts'");
  // disable debugging
  window.localStorage.removeItem("debug");
});
