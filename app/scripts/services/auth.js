'use strict';

angular.module('coderfrontApp')
  .factory('Auth', function (FIREBASE_URL, $firebaseSimpleLogin, $rootScope, $q) {

    var rootRef = new Firebase(FIREBASE_URL);
    var loginObj = $firebaseSimpleLogin(rootRef);

    var Auth = {
      getUser: function() {
        var deferred = $q.defer();

        loginObj.$getCurrentUser()
          .then(deferred.resolve(loginObj.user), deferred.reject(null));

        return deferred.promise;
      },
      signedIn: function() {
        var deferred = $q.defer();

        loginObj.$getCurrentUser()
          .then(function(authUser) {
            if (authUser === null) {
              deferred.reject();
            } else {
              deferred.resolve(true);
            }
          });
        // loginObj's user property is set to null if the user is not logged in
        
        return deferred.promise;
      },
      register: function(user) {
        var deferred = $q.defer();

        loginObj.$getCurrentUser()
          .then(function(authUser) {
            if (authUser === null) {
              deferred.reject();
            } else {
              loginObj.$createUser(user.email, user.password)
                .then(deferred.resolve, deferred.reject);
            }
          });

        return deferred.promise;
      },
      changePassword: function(user) {
        var deferred = $q.defer();

        loginObj.$getCurrentUser()
          .then(function() {
            loginObj.$changePassword(user.email, user.oldPassword, user.newPassword)
              .then(deferred.resolve, deferred.reject);
          });
        
        return deferred.promise;
      },
      sendPasswordResetEmail: function(userEmail) {
        var deferred = $q.defer();

        loginObj.$getCurrentUser()
          .then(function() {
            loginObj.$sendPasswordResetEmail(userEmail)
              .then(deferred.resolve, deferred.reject);
          });

        return deferred.promise;
      },
      login: function(user) {
        var deferred = $q.defer();

        loginObj.$getCurrentUser()
          .then(function() {
            loginObj.$login('password', {email: user.email, password: user.password, rememberMe: true})
              .then(deferred.resolve, deferred.reject);
          });

        return deferred.promise;
      },
      logout: function() {
        loginObj.$logout();
      },
      delete: function(user) {
        var deferred = $q.defer();

        loginObj.$getCurrentUser()
          .then(function() {
            loginObj.$removeUser(user.email, user.password)
              .then(deferred.resolve, deferred.reject);
          });

        return deferred.promise;
      }
    };

    $rootScope.$on('$firebaseSimpleLogin:login', function() {
      Auth.getUser = function() {
        var deferred = $q.defer();

        loginObj.$getCurrentUser()
          .then(deferred.resolve(loginObj.user), deferred.reject(null));

        return deferred.promise;
      };

      Auth.signedIn = function() {
        var deferred = $q.defer();

        loginObj.$getCurrentUser()
          .then(function(authUser) {
            if (authUser === null) {
              deferred.reject();
            } else {
              deferred.resolve(true);
            }
          });
        // loginObj's user property is set to null if the user is not logged in
        
        return deferred.promise;
      };
    });

    $rootScope.$on('$firebaseSimpleLogin:logout', function() {
      Auth.getUser = function() {
        var deferred = $q.defer();

        loginObj.$getCurrentUser()
          .then(deferred.resolve(loginObj.user), deferred.reject(null));

        return deferred.promise;
      };

      Auth.signedIn = function() {
        var deferred = $q.defer();

        loginObj.$getCurrentUser()
          .then(function(authUser) {
            if (authUser === null) {
              deferred.reject();
            } else {
              deferred.resolve(true);
            }
          });
        // loginObj's user property is set to null if the user is not logged in
        
        return deferred.promise;
      };
    });

    return Auth;

  });
