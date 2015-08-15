'use strict';

angular.module('app').controller('UserInfoController', function ($rootScope, $location, UserService, users) {
  var userCtrl = this;
  userCtrl.users = users;
  userCtrl.userForm = {};
  userCtrl.opened = {};
  userCtrl.PANEL = {LIST: 'LIST', ADD_USER: 'ADD_USER', CURRENT: undefined};
  userCtrl.PANEL.CURRENT = users && users.length > 0 ? userCtrl.PANEL.LIST : userCtrl.PANEL.ADD_USER;
  userCtrl.predicate = 'name';
  userCtrl.reverse = true;
  userCtrl.order = function(predicate) {
    userCtrl.reverse = (userCtrl.predicate === predicate) ? !userCtrl.reverse : false;
    userCtrl.predicate = predicate;
  };

  userCtrl.save = function(user) {
    if (userCtrl.userForm.$valid) {
      UserService.save(user, function(data) {
        userCtrl.users.push(angular.copy(data));
        userCtrl.resetUserForm(user, userCtrl.PANEL.LIST);
      });
    }
  };

  userCtrl.cancelUserForm = function(user) {
    userCtrl.resetUserForm(user, userCtrl.PANEL.LIST);
  };

  userCtrl.resetUserForm = function(user, nextPanel) {
    angular.copy({}, user);
    userCtrl.userForm.$submitted = false;
    userCtrl.setPanel(nextPanel);
  };

  userCtrl.setPanel = function(panel) {
    userCtrl.PANEL.CURRENT = panel;
    $location.search({panel: userCtrl.PANEL.CURRENT});
  };

  userCtrl.open = function($event, formElement) {
    $event.preventDefault();
    $event.stopPropagation();
    userCtrl.opened[formElement] = true;
  };

  userCtrl.init = function() {
    var searchPanel = $location.search().panel;
    userCtrl.setPanel(searchPanel && userCtrl.PANEL[searchPanel] ? userCtrl.PANEL[searchPanel] : userCtrl.PANEL.LIST);
  };
  $rootScope.$on("$locationChangeStart", function() {
    // This will run on every location change, before the
    // whole route is processed. Good for things like Identity
    // management.
    userCtrl.init();
  });

  userCtrl.init();
});
