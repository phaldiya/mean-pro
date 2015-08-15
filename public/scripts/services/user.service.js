'use strict';

angular.module('app').service('UserService', function($resource) {
  var service =  $resource('/api/user/:id', {id: '@id'}, {

  });

  return service;
});
