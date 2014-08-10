'use strict';

angular.module('coderfrontApp')
  .factory('Mailchimp', function ($http, $q) {
    var MAILCHIMP_API_KEY = '2ec660bd237953b4e690e5752e61f40c-us8';
    var MAILCHIMP_ENDPOINT = 'us8.api.mailchimp.com/2.0/';

    var Mailchimp = {
      subscribe: function(listId, subscriber) {
        var deferred = $q.defer();
        
        $http({
          method: 'post',
          url: MAILCHIMP_ENDPOINT,
          data: {
            'apikey': MAILCHIMP_API_KEY,
            'id': listId,
            'email': subscriber.email,
            'merge_vars': {
              fullname: subscriber.fullname,
            }
          }
        }).then(deferred.resolve, deferred.reject);

        return deferred.promise;
      }
    };

    return Mailchimp;

  });
