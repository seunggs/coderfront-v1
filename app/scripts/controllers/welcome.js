'use strict';

angular.module('coderfrontApp')
  .controller('WelcomeCtrl', function ($scope, $stateParams, Course, User) {
    
		// Wrapper object
		$scope.wpr = {};

		// Get the courseId
		$scope.wpr.courseId = $stateParams.courseId;

		// Page loading control
		$scope.wpr.pageLoading = true;

		// Find this course
		Course.find($scope.wpr.courseId)
			.then(function(courseObj) {
				// Once the course loads, turn page loading off
				$scope.wpr.pageLoading = false;

				$scope.wpr.course = courseObj;
			});

		// Save this welcome page as the last viewed course
		User.thisUser()
			.then(function(userDataObj) {
				$scope.wpr.userDataObj = userDataObj;

				$scope.wpr.userDataObj.lastViewed = {
					courseId: $stateParams.courseId,
					unitId: 'NA',
					lessonId: 'NA'
				};

				User.update($scope.wpr.userDataObj)
					.then(function() {
						console.log('successfully updated last viewed - welcome');
					}, function() {
						console.log('failed to updated last viewed - welcome');
					});
			});

  });
