'use strict';

describe('Directive: scProgressbarTop', function () {

  // load the directive's module
  beforeEach(module('coderfrontApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sc-progressbar-top></sc-progressbar-top>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the scProgressbarTop directive');
  }));
});
