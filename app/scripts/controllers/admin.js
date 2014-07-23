'use strict';

angular.module('coderfrontApp')
  .controller('AdminCtrl', function ($scope, $routeParams, Course, Unit) {

		// Allows switch between different views for main content section
		$scope.edit = {
			dashboard: true,
			unit: false,
			lesson: false
		};

		// Wrapper object for this controller for dot notation
		$scope.admin = {};

		// Find the right course
		$scope.admin.courseId = $routeParams.courseId;
		$scope.admin.course = Course.find($routeParams.courseId);

		// Stores all units
		$scope.admin.units = Unit.all($scope.admin.courseId);

		// Remove unit
		$scope.admin.example = function() {
			console.log('it works!');
		};

		$scope.admin.removeUnit = function(unitId) {
			Unit.remove($scope.admin.courseId, unitId);
		};

  });
