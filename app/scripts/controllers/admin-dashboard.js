'use strict';

angular.module('coderfrontApp')
  .controller('AdminDashboardCtrl', function ($scope, Course) {

		// Controls "Loading..." button
		$scope.btn = {
			loading: false
		};

		// Object wrapper for add-course
		$scope.addCourse = {};

		// Create course
		$scope.addCourse.createCourse = function() {
			$scope.btn.loading = true;
			Course.create($scope.newCourse)
				.then(function() {
					// Success callback
					console.log('Successfully created course');
					$scope.btn.loading = false;
				}, function() {
					// Error callback
					console.log('Error while trying to create course');
					$scope.btn.loading = false;
				});
		};

		$scope.addCourse.courses = Course.all;

  });
