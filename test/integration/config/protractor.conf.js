'use strict';

var SpecReporter = require('jasmine-spec-reporter');
var appRoot = require('app-root-path');
var environmentConfig = require(appRoot + '/test/config/environment.config');
var ENVIRONMENT_TYPE = require(appRoot + '/test/config/constants').ENVIRONMENT_TYPE;
var BROWSER_TYPE = require(appRoot + '/test/config/constants').BROWSER_TYPE;
var TEST_TYPE = require(appRoot + '/test/config/constants').TEST_TYPE;
var childProcess;

exports.config = {
    // ---------------------------------------------------------------------------
    // ----- Set up browsers -----------------------------------------------------
    // ---------------------------------------------------------------------------
    /*multiCapabilities: [
      {
        'browserName': 'chrome'
      }*/
      /*, {
       'browserName': 'firefox'
       }*/
      /*,{
        'browserName': 'phantomjs',

        /!*
         * Can be used to specify the phantomjs binary path.
         * This can generally be ommitted if you installed phantomjs globally.
         *!/
        'phantomjs.binary.path': require('phantomjs').path,

        /!*
         * Command line args to pass to ghostdriver, phantomjs's browser driver.
         * See https://github.com/detro/ghostdriver#faq
         *!/
        'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
      }*/
/*    ],*/

    capabilities: {
      'browserName': 'chrome'
    },

    // ---------------------------------------------------------------------------
    // ----- What tests to run ---------------------------------------------------
    // ---------------------------------------------------------------------------

    // Spec patterns are relative to the location of this config.
    specs: [
      appRoot + '/test/resources/data/_dbinit.js',
      appRoot + '/test/integration/**/*.integration.js'
    ],

    // ---------------------------------------------------------------------------
    // ----- Global test information ---------------------------------------------
    // ---------------------------------------------------------------------------

    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: 'http://localhost:'+ process.env.PORT +'/#/',

    // A callback function called once protractor is ready and available, and
    // before the specs are executed
    // You can specify a file containing code to run by setting onPrepare to
    // the filename string.
    onPrepare: function () {
        // At this point, global 'protractor' object will be set up, and
        // add jasmine spec reporter
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'summary', displayFailuresSummary: true}));

        browser.driver.manage().window().setSize(1200, 1024);
        browser.driver.get(exports.config.baseUrl);
    },

    beforeLaunch: function () {
      var envType = process.env.TYPE || ENVIRONMENT_TYPE.LOCAL;
      var browserType = process.env.BROWSER_TYPE || BROWSER_TYPE.CHROME;

      childProcess = require(appRoot + '/test/resources/utils/process')(environmentConfig.getConfig(TEST_TYPE.INTEGRATION, envType, browserType));
      childProcess.startup(function() {
        exports.config.baseUrl = process.env.SITE_URL;
      });
    },

    // exitCode is 0 if the tests passed
    onCleanUp: function (exitCode) {
      console.log(exitCode);
      /*if (exitCode === 0) {*/
      childProcess.shutdown();
      /*}*/
    },

    // ---------------------------------------------------------------------------
    // ----- The test framework --------------------------------------------------
    // ---------------------------------------------------------------------------
    framework: 'jasmine2',

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
      showColors: true,               // If true, print colors to the terminal.
      defaultTimeoutInterval: 50000,   // Default time to wait in ms before a test fails.
      print: function () {
      }           // Function called to print jasmine results.
      // grep: 'pattern',                // If set, only execute specs whose names match the pattern, which is internally compiled to a RegExp.
      // invertGrep: false               // Inverts 'grep' matches
    }
};
