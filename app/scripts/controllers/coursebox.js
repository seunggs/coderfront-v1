'use strict';

angular.module('coderfrontApp')
  .controller('CourseboxCtrl', function ($scope, Course, FIREBASE_URL, $firebase, $firebaseSimpleLogin) {

		// Wrapper object
		$scope.courseBox = {};

    $scope.courseBox.courses = Course.all;

    // See if the user is admin
    var rootRef = new Firebase(FIREBASE_URL);
    var loginObj = $firebaseSimpleLogin(rootRef);

    loginObj.$getCurrentUser()
      .then(function(user) {
        if (user === null) {
          return;
        }
        
        // Then get userData
        var userDataRef = new Firebase(FIREBASE_URL + 'users/' + user.uid);
        var userData = $firebase(userDataRef);
        var userDataObj = userData.$asObject();

        userDataObj.$loaded()
          .then(function() {
            $scope.courseBox.userDataObj = userDataObj;
          });
      });

    // Modal control
    $scope.courseBox.deleteModalOpen = false;

    $scope.courseBox.deleteCourse = function(courseId) {
			Course.remove(courseId);
    };
  });
