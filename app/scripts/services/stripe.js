/* global StripeCheckout */
'use strict';

angular.module('coderfrontApp')
  .factory('Stripe', function ($q, $http, $rootScope) {

    var CHARGE_ENDPOINT = 'https://www.coderfront.com';
    var STRIPE_API = 'pk_test_iTfgLvUHP4hUc9IDg9QAlD5o';
    // var ON_HST = 0.13;

    return {
      buy: function(options) {
        // options object: courseName, price, email
        var deferred = $q.defer();
        
        var handleToken = function(token) {
          $http.post(
            CHARGE_ENDPOINT + '/charge',
            {
              stripeToken: token.id,
              description: options.courseName,
              amount: Math.round(options.price * 100)
            }
          ).then(deferred.resolve, deferred.reject);
        };
        
        var handler = StripeCheckout.configure({
          key: STRIPE_API,
          image: 'https://s3.amazonaws.com/coderfront/images/stripe_logo.jpg',
          token: handleToken,
          name: options.courseName,
          email: options.email,
          currency: 'usd',
          amount: Math.round(options.price * 100),
          opened: function() {
            $rootScope.$broadcast('stripeCheckoutClosed', false);
          }
        });

        handler.open();
        return deferred.promise;
      }
    };

  });
