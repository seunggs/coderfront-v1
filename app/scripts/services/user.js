'use strict';

angular.module('coderfrontApp')
  .factory('User', function ($firebase, FIREBASE_URL) {

    var usersRef = new Firebase(FIREBASE_URL + 'users');
    var users = $firebase(usersRef);

    var User = {
      all: users,
      create: function(userUid, userData) {
        return users.$set(userUid, userData);
      },
      find: function(userUid) {
        return users[userUid];
      },
      update: function(userUid, userData) {
        return users[userUid].$update(userData);
      },
      delete: function(userUid) {
        return users.$remove(userUid);
      }
    };

    return User;

  });
