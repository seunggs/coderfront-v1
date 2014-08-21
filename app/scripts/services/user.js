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
                .then(deferred.resolve(usersObj), deferred.reject());
            }
          });

        return deferred.promise;
      },
      find: function(userUid) {
        var deferred = $q.defer();

        loginObj.$getCurrentUser()
          .then(function(authUser) {
            if (authUser === null) {
              deferred.reject();
            } else {
              usersObj.$loaded()
                .then(deferred.resolve(usersObj[userUid]), deferred.reject());
            }
          });

        return deferred.promise;
      },
      create: function(userUid, userData) {
        var deferred = $q.defer();

        loginObj.$getCurrentUser()
          .then(function(authUser) {
            if (authUser === null) {
              deferred.reject();
            } else {
              usersObj.$loaded()
                .then(function() {
                  users.$set(userUid, userData)
                    .then(deferred.resolve, deferred.reject);
                }, function() {
                  deferred.reject();
                });
            }
          });

        return deferred.promise;
      },
      update: function(userUid, userData) {
        var deferred = $q.defer();

        loginObj.$getCurrentUser()
          .then(function(authUser) {
            if (authUser === null) {
              deferred.reject();
            } else {
              usersObj.$loaded()
                .then(function() {
                  usersObj[userUid] = userData;
                  usersObj.$save()
                    .then(deferred.resolve, deferred.reject);
                }, function() {
                  deferred.reject();
                });
            }
          });

        return deferred.promise;

      },
      delete: function(userUid) {
        var deferred = $q.defer();

        loginObj.$getCurrentUser()
          .then(function(authUser) {
            if (authUser === null) {
              deferred.reject();
            } else {
              usersObj.$loaded()
                .then(function() {
                  users.$remove(userUid)
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
