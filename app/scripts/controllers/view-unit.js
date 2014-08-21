'use strict';

angular.module('coderfrontApp')
  .controller('ViewUnitCtrl', function ($scope, $stateParams, Course, Unit, FIREBASE_URL, $firebase, $firebaseSimpleLogin) {
		// Wrapper objects
		$scope.viewUnit = {};

		// Find the right course and unitId
		$scope.viewUnit.courseId = $stateParams.courseId;
		$scope.viewUnit.course = Course.find($stateParams.courseId);
		$scope.viewUnit.unitId = $stateParams.unitId;

		// Show page loading while Firebase loads
		// And initiate Firebase related variables once Firebase loads
		$scope.viewUnit.pageLoading = true;

    var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + $scope.viewUnit.courseId + '/units');
    var unitsArray = $firebase(unitsRef).$asArray();

    unitsArray.$loaded()
			.then(function() {
				$scope.viewUnit.pageLoading = false;
				
				// Stores all units in an array
				$scope.viewUnit.unitsArray = unitsArray;
				// Get this specific unit
				$scope.viewUnit.unit = Unit.find($scope.viewUnit.unitId, $scope.viewUnit.unitsArray);
			});

		// Save this unit as the last viewed unit
		// First, get user uid
    var rootRef = new Firebase(FIREBASE_URL);
    var loginObj = $firebaseSimpleLogin(rootRef);

    loginObj.$getCurrentUser()
			.then(function(user) {
		    // Then get userData
				var userDataRef = new Firebase(FIREBASE_URL + 'users/' + user.uid);
				var userData = $firebase(userDataRef);
				var userDataObj = userData.$asObject();

				userDataObj.$loaded()
					.then(function() {
						// Save this lesson as the last viewed lesson
						$scope.viewUnit.lastViewed = {
							courseId: $stateParams.courseId,
							unitId: $stateParams.unitId,
							lessonId: 'NA'
						};
						
						userData.$update({lastViewed: $scope.viewUnit.lastViewed})
							.then(function() {
								console.log('successfully updated last viewed course, unit and lesson');
							}, function() {
								console.log('failed to updated last viewed course, unit and lesson');
							});
					});
			});

  });
