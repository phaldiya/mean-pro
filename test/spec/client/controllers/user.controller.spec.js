'use strict';

describe('UserInfoController', function() {
  var createController, userService, $location, $rootScope;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function ($controller, _$rootScope_, _$location_, _UserService_) {
    $location = _$location_;
    $rootScope= _$rootScope_;
    userService= _UserService_;

    createController = function(users) {
        return $controller('UserInfoController', {
          users: users || {}
        });
    };
  }));

  it("verify $rootScope is defined", function () {
    expect($rootScope.$new()).toBeDefined();
  });

  it("current panel should be list at the first time", function () {
    var controller = createController();

    expect(controller.PANEL.CURRENT).toBe(controller.PANEL.LIST);
  });

  it("set panel should set PANEL.CURRENT to be PANEL.ADD_USER", function () {
    var controller = createController();
    controller.setPanel(controller.PANEL.ADD_USER);

    expect(controller.PANEL.CURRENT).toBe(controller.PANEL.ADD_USER);
    expect($location.search().panel).toBe(controller.PANEL.ADD_USER);
  });

  it("should be able to save user", function () {
    var controller = createController({});
    userService.save = sinon.spy();
    controller.save({name: 'spec-user'});

    expect(userService.save.calledOnce);
  });

  it("cancelUserForm should set PANEL.CURRENT to LIST", function () {
    var controller = createController({});
    controller.cancelUserForm({});

    expect(controller.PANEL.CURRENT).toBe(controller.PANEL.LIST);
  });

});
