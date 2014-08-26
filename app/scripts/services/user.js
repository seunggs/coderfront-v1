'use strict';

angular.module('coderfrontApp')
  .factory('User', function ($firebaseSimpleLogin, $firebase, FIREBASE_URL, $q) {

    var rootRef = new Firebase(FIREBASE_URL);
    var loginObj = $firebaseSimpleLogin(rootRef);

    var usersRef = new Firebase(FIREBASE_URL + 'users');
    var users = $firebase(usersRef);
    var usersObj = users.$asObject();

    var User = {
      getAll: function() {
        var deferred = $q.defer();

        loginObj.$getCurrentUser()
          .then(function(authUser) {
            if (authUser === null) {
              deferred.reject();
            } else {
              usersObj.$loaded()
                .then(function() {
                  deferred.resolve(usersObj);
                }, function() {
                  deferred.reject();
                });
            }
          });

        return deferred.promise;
      },
      thisUser: function() {
        var deferred = $q.defer();

        loginObj.$getCurrentUser()
          .then(function(authUser) {
            if (authUser === null) {
              deferred.reject();
            } else {
              usersObj.$loaded()
                .then(function() {
                  deferred.resolve(usersObj[authUser.uid]);
                }, function() {
                  deferred.reject();
                });
            }
          });

        return deferred.promise;
      },
      create: function(userId, userData) {
        return users.$set(userId, userData);
      },
      update: function(userData) {
        var deferred = $q.defer();

        loginObj.$getCurrentUser()
          .then(function(authUser) {
            if (authUser === null) {
              deferred.reject();
            } else {
              usersObj.$loaded()
                .then(function() {
                  usersObj[authUser.uid] = userData;
                  usersObj.$save()
                    .then(deferred.resolve, deferred.reject);
                }, function() {
                  deferred.reject();
                });
            }
          });

        return deferred.promise;

      },
      delete: function() {
        var deferred = $q.defer();

        loginObj.$getCurrentUser()
          .then(function(authUser) {
            if (authUser === null) {
              deferred.reject();
            } else {
              usersObj.$loaded()
                .then(function() {
                  users.$remove(authUser.uid)
                    .then(deferred.resolve, deferred.reject);
                }, function() {
                  deferred.reject();
                });
            }
          });

        return deferred.promise;
      }
    };

    return User;

  });
