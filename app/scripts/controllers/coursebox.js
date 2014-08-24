'use strict';

angular.module('coderfrontApp')
  .controller('CourseboxCtrl', function ($scope, Course, User) {

		// Wrapper object
		$scope.wpr = {};

    $scope.wpr.courses = Course.all;

    // Get userData
    User.thisUser()
      .then(function(userDataObj) {
        $scope.wpr.userDataObj = userDataObj;
      });

    // Modal control
    $scope.wpr.deleteModalOpen = false;

    $scope.wpr.deleteCourse = function(courseId) {
			Course.remove(courseId);
    };
  });
