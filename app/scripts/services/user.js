'use strict';

angular.module('coderfrontApp')
  .factory('User', function ($firebase, FIREBASE_URL) {

    var usersRef = new Firebase(FIREBASE_URL + 'users');
    var users = $firebase(usersRef).$asObject();

    var User = {
      all: users,
      create: function(userData, userUid) {
        return users[userUid].$update(userData);
      },
      find: function(userId) {
        return users[userId];
      },
      update: function(userId, userDataObj) {
        return users[userId].$update(userDataObj);
      },
      findPurchases: function(userId) {
        return users[userId].purchases;
      }
    };

    return User;

  });
