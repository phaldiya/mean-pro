'use strict';

var appRoot = require('app-root-path');
var TEST_TYPE = require(appRoot + '/test/config/constants').TEST_TYPE;
var testHelper = require('../../resources/helpers/test.helper.js');
var protractorConf = appRoot + '/test/integration/config/protractor.conf.js';

module.exports = {
  getConfig: function(envType, browserName, args) {
    return testHelper.getConfig(protractorConf, TEST_TYPE.INTEGRATION, envType, browserName, args);
  }
};
