const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

/**
 * Script used to access statistics of your page.
 * Modify the url, run the script and see the result html file 'lhreport.html'.
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
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);
  console.log('Accessibility score was', runnerResult.lhr.categories.accessibility.score * 100);
  console.log('Best Practices score was', runnerResult.lhr.categories['best-practices'].score * 100);
  console.log('SEO score was', runnerResult.lhr.categories.seo.score * 100);
  console.log('See the detailed results by opening the lhreport.html file\n');

  await chrome.kill();
})();