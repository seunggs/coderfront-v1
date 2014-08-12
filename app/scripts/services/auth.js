'use strict';

angular.module('coderfrontApp')
  .factory('Auth', function (FIREBASE_URL, $firebaseSimpleLogin, $rootScope) {

    var rootRef = new Firebase(FIREBASE_URL);
    var loginObj = $firebaseSimpleLogin(rootRef);

    var Auth = {
      getUser: function() {
        return loginObj.user;
      },
      register: function(user) {
        return loginObj.$createUser(user.email, user.password);
      },
      changePassword: function(user) {
        return loginObj.$changePassword(user.email, user.oldPassword, user.newPassword);
      },
      sendPasswordResetEmail: function(userEmail) {
        return loginObj.$sendPasswordResetEmail(userEmail);
      },
      signedIn: function() {
        // loginObj's user property is set to null if the user is not logged in
        return loginObj.user !== null;
      },
      login: function(user) {
        return loginObj.$login('password', {email: user.email, password: user.password, rememberMe: true});
      },
      logout: function() {
        loginObj.$logout();
      },
      delete: function(user) {
        return loginObj.$removeUser(user.email, user.password);
      }
    };

    $rootScope.$on('$firebaseSimpleLogin:login', function() {
      Auth.getUser = function() {
        return loginObj.user;
      };

      Auth.signedIn = function() {
        return loginObj.user !== null;
      };
    });

    $rootScope.$on('$firebaseSimpleLogin:logout', function() {
      Auth.getUser = function() {
        return loginObj.user;
      };

      Auth.signedIn = function() {
        return loginObj.user !== null;
      };
    });

    return Auth;

  });
