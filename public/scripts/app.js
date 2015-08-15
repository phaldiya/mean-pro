'use strict';

angular.module('app', ['ngResource', 'ngRoute', 'ngCookies', 'ngAnimate', 'ngMessages', 'ngTouch', 'ngAria', 'ui.bootstrap'])
    .config(function ($httpProvider, $routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: './scripts/controllers/home.html',
                controller: 'HomeCtrl'
            })
            .when('/home', {
                templateUrl: './scripts/controllers/home.html',
                controller: 'HomeCtrl'
            })
          .when('/user', {
            templateUrl: './scripts/controllers/user/user.html',
            controller: 'UserInfoController',
            controllerAs: 'userCtrl',
            resolve: {
              users: function(UserService) {
                return UserService.query().$promise;
              }
            },
            reloadOnSearch: false
          })
          .otherwise({
                redirectTo: '/deny'
            });
    });
