'use strict';

describe('Controller: AdminSidebarCtrl', function () {

  // load the controller's module
  beforeEach(module('coderfrontApp'));

  var AdminSidebarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminSidebarCtrl = $controller('AdminSidebarCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
