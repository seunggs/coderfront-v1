'use strict';

angular.module('coderfrontApp')
  .controller('CourseboxCtrl', function ($scope, Course) {

		// Wrapper object
		$scope.courseBox = {};

    $scope.courseBox.courses = Course.all;

  });
