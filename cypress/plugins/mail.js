/// <reference types="cypress" />
// @see https://www.cypress.io/blog/2021/05/11/testing-html-emails-using-cypress/
const ms = require("smtp-tester");

const getRecipientKey = (recipientEmailAddress) => {
  if (Array.isArray(recipientEmailAddress)) {
    return recipientEmailAddress.join(",");
  }
  return recipientEmailAddress;
};
/**
 * Will start a mail server on port 7777
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // starts the SMTP server at localhost:7777
  const port = 7777;
  const mailServer = ms.init(port);
  console.log("mail server at port %d", port);

  let lastEmailPerRecipient = {};
  let lastEmail = null;
  mailServer.bind((addr, id, email) => {
    console.log("--- email ---");
    console.log(addr, id, email);
    // store the body for the email adress
    // If there is a least of expeditors, store the list
    const to = getRecipientKey(email.headers.to);
    console.log("Set last email", to);
    lastEmail = email.html || email.body;
    lastEmailPerRecipient[to] = lastEmail;
  });
  on("task", {
    resetEmails(recipientEmail) {
      console.log("Reset all emails");
      if (recipientEmail) {
        const key = getRecipientKey(recipientEmail);
        delete lastEmailPerRecipient[key];
      } else {
        // reset for all users
        lastEmail = null;
        lastEmailPerRecipient = {};
      }
      return null;
    },
    /**
     * Get last email sent for a given user
     * @param {*} email User's email
     * @returns The email HTML body
     */
    getLastEmail(recipientEmail) {
      console.log("\tGet last email", recipientEmail, lastEmail);
      // cy.task cannot return undefined
      // thus we return null as a fallback
      if (recipientEmail) {
        const key = getRecipientKey(recipientEmail);
        return lastEmailPerRecipient[key] || null;
      }
      return lastEmail || null;
    },
  });
};
