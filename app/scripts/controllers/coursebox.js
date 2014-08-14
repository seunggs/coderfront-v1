'use strict';

angular.module('coderfrontApp')
  .controller('CourseboxCtrl', function ($scope, Course) {

		// Wrapper object
		$scope.courseBox = {};

    $scope.courseBox.courses = Course.all;

    // Modal control
    $scope.courseBox.deleteModalOpen = false;

    $scope.courseBox.deleteCourse = function(courseId) {
			Course.remove(courseId);
    };
  });
