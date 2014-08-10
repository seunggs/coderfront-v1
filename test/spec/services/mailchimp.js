'use strict';

describe('Service: mailchimp', function () {

  // load the service's module
  beforeEach(module('coderfrontApp'));

  // instantiate service
  var mailchimp;
  beforeEach(inject(function (_mailchimp_) {
    mailchimp = _mailchimp_;
  }));

  it('should do something', function () {
    expect(!!mailchimp).toBe(true);
  });

});
