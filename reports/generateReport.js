const reporter = require('multiple-cucumber-html-reporter');

reporter.generate({
  jsonDir: 'reports/json', 
  reportPath: 'reports/html', 
  metadata: {
    browser: {
      name: 'chromium',
      version: 'latest'
    },
    device: 'Local test machine',
    platform: {
      name: 'Windows',
      version: '10'
    }
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'SauceDemo Automation' },
      { label: 'Framework', value: 'Playwright + CucumberJS' },
      { label: 'Tester', value: 'Priyanka Reddy' }
    ]
  }
});
