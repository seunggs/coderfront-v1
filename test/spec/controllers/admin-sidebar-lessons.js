'use strict';

describe('Controller: AdminSidebarLessonsCtrl', function () {

  // load the controller's module
  beforeEach(module('coderfrontApp'));

  var AdminSidebarLessonsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminSidebarLessonsCtrl = $controller('AdminSidebarLessonsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
