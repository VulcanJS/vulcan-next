#! /usr/bin/node

const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

/**
 * Script used to access statistics about your page.
 * Modify the url and use "yarn run audit".
 * See https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically
 */
(async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    // logLevel: 'info', // Detailed logs
    output: 'html',
    maxWaitForLoad: 30000, // More time isn't useful for md files. An error will raise even with 5 minutes, without better result.
    // onlyCategories: ['performance'], // Test only some things beetween performance/accessibility/best-practices/seo
    port: chrome.port
  };
  const runnerResult = await lighthouse('http://localhost:3000', options);

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  fs.writeFileSync('lhreport.html', reportHtml);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log('\nReport is done for', runnerResult.lhr.finalUrl);
  if (!runnerResult.lhr.categories.performance.score && !runnerResult.lhr.categories.accessibility.score && !runnerResult.lhr.categories['best-practices'].score && !runnerResult.lhr.categories.seo.score) {
    console.error("It seems that this page isn't reachable.\nIf you intent to audit a localhost page, be sure to run the app first.\n");
  } else {
    console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);
    console.log('Accessibility score was', runnerResult.lhr.categories.accessibility.score * 100);
    console.log('Best Practices score was', runnerResult.lhr.categories['best-practices'].score * 100);
    console.log('SEO score was', runnerResult.lhr.categories.seo.score * 100);
    console.log('See the detailed results again by opening the lhreport.html root file.\n');
  }
  await chrome.kill();
})();