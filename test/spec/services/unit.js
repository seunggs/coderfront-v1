'use strict';

describe('Service: unit', function () {

  // load the service's module
  beforeEach(module('coderfrontApp'));

  // instantiate service
  var unit;
  beforeEach(inject(function (_unit_) {
    unit = _unit_;
  }));

  it('should do something', function () {
    expect(!!unit).toBe(true);
  });

});
