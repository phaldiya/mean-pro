'use strict';
var http = require('http');

global.Helper = {
  clickHomeLink: function() {
    element(by.css('nav')).element(by.cssContainingText('.nav a', 'Home')).click();
  }
};
