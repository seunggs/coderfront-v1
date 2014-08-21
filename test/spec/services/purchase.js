'use strict';

describe('Service: purchase', function () {

  // load the service's module
  beforeEach(module('coderfrontApp'));

  // instantiate service
  var purchase;
  beforeEach(inject(function (_purchase_) {
    purchase = _purchase_;
  }));

  it('should do something', function () {
    expect(!!purchase).toBe(true);
  });

});
