'use strict';

describe('Controller: EditLessonCtrl', function () {

  // load the controller's module
  beforeEach(module('coderfrontApp'));

  var EditLessonCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditLessonCtrl = $controller('EditLessonCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
