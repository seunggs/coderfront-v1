'use strict';

angular.module('coderfrontApp')
  .controller('ThankyouCtrl', function ($scope, $stateParams, Course, Auth, $location) {
    
		// Wrapper object
		$scope.wpr = {};

		// Get the courseId
		$scope.wpr.courseId = $stateParams.courseId;

		// Get the course
		Course.find($scope.wpr.courseId)
			.then(function(courseObj) {
				$scope.wpr.courseObj = courseObj;
				$scope.wpr.courseLoaded = true;
			});

		// Make sure the user is logged in
		// If not, send them back to home
		Auth.signedIn()
			.then(function(result) {
				if (result === false) {
					$location.path('/');
				}
			});

  });
