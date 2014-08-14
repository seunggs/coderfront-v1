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
      update: function(usersObj, userUid, userData) {
        console.log(usersObj[userUid]);
        usersObj[userUid] = userData;
        return usersObj.$save();
      },
      delete: function(userUid) {
        return users.$remove(userUid);
      }
    };

    return User;

  });
