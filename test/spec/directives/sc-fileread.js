'use strict';

describe('Directive: scFileread', function () {

  // load the directive's module
  beforeEach(module('coderfrontApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sc-fileread></sc-fileread>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the scFileread directive');
  }));
});
