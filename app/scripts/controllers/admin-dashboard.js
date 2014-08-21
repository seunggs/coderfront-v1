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

		$scope.wpr.courses = Course.getAll();

		// See if this user is an admin
		Auth.getUser()
			.then(function(authUser) {
				$scope.wpr.userDataObj = User.find(authUser.uid);
				if ($scope.wpr.userDataObj.admin === false) {
					$location.path('/');
				}
			});
  });
