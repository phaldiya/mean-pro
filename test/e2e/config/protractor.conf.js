'use strict';

var SpecReporter = require('jasmine-spec-reporter');
var appRoot = require('app-root-path');

exports.config = {
    capabilities: {
      'browserName': 'chrome'
    },

    plugins: [{
      path: appRoot + '/node_modules/protractor/plugins/accessibility',
      chromeA11YDevTools: {
        treatWarningsAsFailures: true
      }
    }],
    specs: [
      appRoot + '/test/resources/data/_dbinit.js',
      appRoot + '/test/e2e/helper.js',
      appRoot + '/test/e2e/pageobject/**/*.pageobject.js',
      appRoot + '/test/e2e/**/*.e2e.js'
    ],
    baseUrl: 'http://localhost:'+ process.env.PORT +'/#/',
    onPrepare: function () {
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'summary', displayFailuresSummary: true}));

        browser.driver.manage().window().setSize(1200, 1024);
        browser.driver.get(exports.config.baseUrl);
    },

    framework: 'jasmine2',

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
      showColors: true,               // If true, print colors to the terminal.
      defaultTimeoutInterval: 50000,  // Default time to wait in ms before a test fails.
      print: function () {}           // Function called to print jasmine results.
    }
};
