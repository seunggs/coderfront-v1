'use strict';

describe('Controller: AddLessonCtrl', function () {

  // load the controller's module
  beforeEach(module('coderfrontApp'));

  var AddLessonCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddLessonCtrl = $controller('AddLessonCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
