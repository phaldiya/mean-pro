'use strict';

describe("UserService", function () {
  var userService, $httpBackend;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function (_UserService_, _$httpBackend_) {
    userService = _UserService_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should be able to get list of users", function () {
    $httpBackend.expectGET('/api/user').respond(200);

    userService.query();
    $httpBackend.flush();
  });

  it("should be able to get person by id", function () {
    $httpBackend.expectGET('/api/user/1').respond(200);

    userService.get({id: 1});
    $httpBackend.flush();
  });

  it("should be able to save user", function () {
    var dataRequest = {name: 'spec-user'};
    var expectedResponse = {id:1, name: 'spec-user'};

    $httpBackend.expectPOST('/api/user', dataRequest).respond(200, expectedResponse);

    userService.save({name: 'spec-user'}, function(data) {
      expect(angular.equals(data, expectedResponse)).toBeTruthy();
    });
    $httpBackend.flush();
  });

  it("should be able to delete person by id", function () {
    $httpBackend.expectDELETE('/api/user/1').respond(200);

    userService.delete({id: 1});
    $httpBackend.flush();
  });

});
