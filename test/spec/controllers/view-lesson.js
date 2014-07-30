'use strict';

describe('Controller: ViewLessonCtrl', function () {

  // load the controller's module
  beforeEach(module('coderfrontApp'));

  var ViewLessonCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewLessonCtrl = $controller('ViewLessonCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
