'use strict';

angular.module('coderfrontApp')
  .controller('AdminDashboardCtrl', function ($scope, Course, Auth, User, $location) {

		// Controls "Loading..." button
		$scope.btn = {
			loading: false
		};

		// Object wrapper for add-course
		$scope.wpr = {};
		$scope.newCourse = {};

		// Show page loading while Firebase loads
		// And initiate Firebase related variables once it loads
		$scope.wpr.pageLoading = true;

    Course.arrayLoaded($scope.wpr.courseId, $scope.wpr.unitId)
			.then(function(lessonsArray) {
				$scope.wpr.pageLoading = false;

				// Stores all units in an array
				$scope.wpr.lessonsArray = lessonsArray;
			});

		// Create course
		$scope.wpr.createCourse = function() {
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

		Course.getAll()
			.then(function(courses) {
				$scope.wpr.courses = courses;
			});

		// See if this user is an admin
		User.thisUser()
			.then(function(userDataObj) {
				$scope.wpr.userDataObj = userDataObj;
				if ($scope.wpr.userDataObj.admin === false) {
					// If the user is not admin, kick them out to home
					$location.path('/');
				}
			});

  });
