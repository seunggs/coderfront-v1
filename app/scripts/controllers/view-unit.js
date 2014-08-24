'use strict';

angular.module('coderfrontApp')
  .controller('ViewUnitCtrl', function ($scope, $stateParams, Course, Unit, User) {
		// Wrapper objects
		$scope.wpr = {};

		// Find the right course and unitId
		$scope.wpr.courseId = $stateParams.courseId;
		$scope.wpr.unitId = $stateParams.unitId;

		// Show page loading while Firebase loads
		$scope.wpr.pageLoading = true;

		// Get this unit
		Unit.find($scope.wpr.courseId, $scope.wpr.unitId)
			.then(function(unitObj) {
				// Once unit loads, turn off page loading
				$scope.wpr.pageLoading = false;

				$scope.wpr.unit = unitObj;
			});

		// Save this unit as the last viewed unit
		User.thisUser()
			.then(function(userDataObj) {
				$scope.wpr.userDataObj = userDataObj;

				$scope.wpr.userDataObj.lastViewed = {
					courseId: $stateParams.courseId,
					unitId: $stateParams.unitId,
					lessonId: 'NA'
				};

				User.update($scope.wpr.userDataObj)
					.then(function() {
						console.log('successfully updated last viewed unit');
					}, function() {
						console.log('failed to updated last viewed unit');
					});
			});

  });
