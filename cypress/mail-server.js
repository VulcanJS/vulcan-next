// @see https://www.cypress.io/blog/2021/05/11/testing-html-emails-using-cypress/
const ms = require("smtp-tester");
const port = 7777;
const mailServer = ms.init(port);
console.log("mail server at port %d", port);

// process all emails
mailServer.bind((addr, id, email) => {
  console.log("--- email ---");
  console.log(addr, id, email);
});
