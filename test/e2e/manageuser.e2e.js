'use strict';

var dbinit = require('../resources/utils/_dbinit');
var data = require('../resources/data/user.json.js');

describe('Manage User', function() {
  var page = null;
  beforeEach(function() {
    dbinit.seedData('user', data);
    page = ManageUserPage.get();
  });

  it("should be able to navigate to add user page", function(){
    page
      .clickAddUser();

    expect(element(by.css('.user-info-page header')).element(by.cssContainingText('a', 'List')).isPresent()).toBeTruthy();
    expect(element(by.name('userCtrl.userForm')).isPresent()).toBeTruthy();
  });

  it("should be able to navigate to List from add user page", function(){
    page
      .clickAddUser()
      .clickList();

    expect(element(by.css('.user-info-page header')).element(by.cssContainingText('a', 'List')).isDisplayed()).toBeFalsy();
    expect(element(by.name('userCtrl.userForm')).isPresent()).toBeFalsy();
    expect(element(by.css('.user-info-page header')).element(by.cssContainingText('a', 'Add User')).isDisplayed()).toBeTruthy();
  });

  it("should be able to add new user", function(){
    page
      .clickAddUser()
      .enterName('Pradeep K Haldiya')
      .enterEmail('phaldiya@ucdavis.edu')
      .enterAddress('Davis, CA')
      .enterZipCode(95616)
      .enterPhone(1234567890)
      .enterDateOfBirth('05/25/1983')
      .clickSubmit();

    expect(element(by.css('.user-info-page header')).element(by.cssContainingText('a', 'List')).isDisplayed()).toBeFalsy();
    expect(element(by.name('userCtrl.userForm')).isPresent()).toBeFalsy();
    expect(element(by.css('.user-info-page header')).element(by.cssContainingText('a', 'Add User')).isDisplayed()).toBeTruthy();

    expect(element.all(by.repeater('user in userCtrl.users | orderBy:userCtrl.predicate:userCtrl.reverse')).count()).toBe(3);
  });

});
