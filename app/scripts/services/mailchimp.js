'use strict';

angular.module('coderfrontApp')
  .factory('Mailchimp', function ($http, $q) {
    var ENDPOINT = 'https://coderfront.herokuapp.com';

    var Mailchimp = {
      subscribe: function(listId, subscriber) {
        var deferred = $q.defer();
        
        $http({
          method: 'post',
          url: ENDPOINT + '/mailchimp',
          data: {
            'listId': listId,
            'subscriber': subscriber
          }
        })
          .then(function(res) {
            console.log(res.error);
            deferred.resolve(res.error);
          }, function(res) {
            console.log(res.data);
            deferred.reject(res.data);
          });

        return deferred.promise;
      }
    };

    return Mailchimp;

  });
