'use strict';

angular.module('coderfrontApp')
  .factory('Mailchimp', function ($http, $q) {
    var ENDPOINT = 'https://coderfront.herokuapp.com/';

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
            console.log(res);
            deferred.resolve(res);
          }, function(res) {
            console.log(res.data.error);
            deferred.reject(res.data.error);
          });

        return deferred.promise;
      }
    };

    return Mailchimp;

  });
