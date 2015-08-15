'use strict';

var appRoot = require('app-root-path');

module.exports = {
  browsers: ['PhantomJS'],
  frameworks: ['jasmine', 'sinon'],
  reporters: ['spec'],
  basePath: appRoot + '/',
  files: [
    'public/lib/angular.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'public/lib/angular-*.js',
    'public/lib/angulartics.min.js',
    'public/lib/angulartics-ga.min.js',
    'public/lib/ui-bootstrap.js',
    'public/lib/ui-bootstrap.js',
    'public/lib/lodash.js',
    'public/scripts/app.js',
    'public/scripts/**/*.js',
    'test/spec/client/**/*.spec.js'
  ],
  exclude: [
    'public/lib/vendor.js'
  ]
};
