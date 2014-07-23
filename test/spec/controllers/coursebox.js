'use strict';

describe('Controller: CourseboxCtrl', function () {

  // load the controller's module
  beforeEach(module('coderfrontApp'));

  var CourseboxCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CourseboxCtrl = $controller('CourseboxCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
