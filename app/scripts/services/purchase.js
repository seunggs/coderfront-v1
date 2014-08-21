/*jshint loopfunc: true */
'use strict';

angular.module('coderfrontApp')
  .factory('Purchase', function (FIREBASE_URL, $firebase, $firebaseSimpleLogin, $q) {
    var rootRef = new Firebase(FIREBASE_URL);
    var loginObj = $firebaseSimpleLogin(rootRef);

    var Purchase = {
      courses: function() {
        var deferred = $q.defer();

        loginObj.$getCurrentUser()
          .then(function(authUser) {
            if (authUser === null) {
              deferred.reject();
            } else {
              // Get all courses the user has purchased
              var purchasesRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid + '/courses');
              var purchases = $firebase(purchasesRef);
              var purchasesArray = purchases.$asArray();

              var tempCoursesObj = {};

              purchasesArray.$loaded()
                .then(function() {
                  for (var i=0; i<purchasesArray.length; i++) {
                    var userCourseRef = new Firebase(FIREBASE_URL + 'courses/' + purchasesArray[i].$id);
                    var userCourse = $firebase(userCourseRef);
                    var userCourseObj = userCourse.$asObject();

                    tempCoursesObj[userCourseObj.$id] = userCourseObj;

                    if (i === purchasesArray.length-1) {
                      deferred.resolve(tempCoursesObj);
                    }
                  }
                }, function() {
                  deferred.reject();
                });
            }
          });

        return deferred.promise;
      }
    };

    return Purchase;
  });
