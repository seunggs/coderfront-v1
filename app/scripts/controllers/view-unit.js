'use strict';

angular.module('coderfrontApp')
  .controller('ViewUnitCtrl', function ($scope, $stateParams, Course, Unit, FIREBASE_URL, $firebase) {
		// Wrapper objects
		$scope.viewUnit = {};
		$scope.formData = {};
		$scope.formData.unit = {};

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

  });
