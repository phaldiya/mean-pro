'use strict';
global.ManageUserPage = {
  get: function () {
    Helper.clickHomeLink();
    element(by.css('.home-page')).element(by.cssContainingText('a', 'Manage Users')).click();
    return this;
  },
  clickAddUser: function() {
    element(by.css('.user-info-page header')).element(by.cssContainingText('a', 'Add User')).click();
    return this;
  },
  clickList: function() {
    element(by.css('.user-info-page header')).element(by.cssContainingText('a', 'List')).click();
    return this;
  },
  enterName: function(name) {
    element(by.model('user.name')).sendKeys(name);
    return this;
  },
  enterEmail: function(email) {
    element(by.model('user.email')).sendKeys(email);
    return this;
  },
  enterAddress: function(address) {
    element(by.model('user.address')).sendKeys(address);
    return this;
  },
  enterZipCode: function(zipcode) {
    element(by.model('user.zip')).sendKeys(zipcode);
    return this;
  },
  enterPhone: function(phone) {
    element(by.model('user.phone')).sendKeys(phone);
    return this;
  },
  enterDateOfBirth: function(dob) {
    element(by.model('user.dateOfBirth')).sendKeys(dob);
    return this;
  },
  clickSubmit: function() {
    element(by.buttonText('Submit')).click();
    return this;
  },
  clickCancel: function() {
    element(by.buttonText('Cancel')).click();
    return this;
  }
};
