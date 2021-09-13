/// <reference types="cypress" />
// @see https://www.cypress.io/blog/2021/05/11/testing-html-emails-using-cypress/
const ms = require("smtp-tester");

/**
 * Will start a mail server on port 7777
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // starts the SMTP server at localhost:7777
  const port = 7777;
  const mailServer = ms.init(port);
  console.log("mail server at port %d", port);

  let lastEmail = {};
  // process all emails
  mailServer.bind((addr, id, email) => {
    console.log("--- email ---");
    console.log(addr, id, email);
    // store the body for the email adress
    lastEmail[email.headers.to] = email.html || email.body;
  });
  on("task", {
    resetEmails(email) {
      console.log("Reset all emails");
      if (email) {
        delete lastEmail[email];
      } else {
        // reset for all users
        lastEmail = {};
      }
      return null;
    },
    /**
     * Get last email sent for a given user
     * @param {*} email User's email
     * @returns The email HTML body
     */
    getLastEmail(email) {
      // cy.task cannot return undefined
      // thus we return null as a fallback
      return lastEmail[email] || null;
    },
  });
};
