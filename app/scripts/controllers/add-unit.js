'use strict';

angular.module('coderfrontApp')
  .controller('AddUnitCtrl', function ($scope, $stateParams, Course, Unit, $location, $timeout, FIREBASE_URL, $firebase) {

		// Wrapper objects
		$scope.addUnit = {};
		$scope.formData = {};
		$scope.formData.unit = {};
		var formReset = function() {
			$scope.formData = {};
			$scope.formData.unit = {};
		};

		// Find the right course
		$scope.addUnit.courseId = $stateParams.courseId;
		$scope.addUnit.course = Course.find($stateParams.courseId);

		// Show page loading while Firebase loads
		// And initiate Firebase related variables once it loads
		$scope.addUnit.pageLoading = true;

    var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + $scope.addUnit.courseId + '/units');
    var unitsArray = $firebase(unitsRef).$asArray();

    unitsArray.$loaded()
			.then(function() {
				$scope.addUnit.pageLoading = false;

				// Stores all units in an array
				$scope.addUnit.unitsArray = unitsArray;
			});

		// Button object wrappers & functions
		$scope.btn = {};
		var btnReset = function(delay) {
			$timeout(function() {
				$scope.btn = {};
			}, delay);
		};

		// Modal related variable
		$scope.addUnit.overwriteModalOpen = false;

		// Add a new unit
		$scope.addUnit.createUnit = function() {
			$scope.btn.loading = true;

			Unit.create($scope.formData.unit, $scope.addUnit.unitsArray)
				.then(function(ref) {
					// Success callback
					
					// Get this unit's UID
					$scope.addUnit.unitId = ref.name();

					// Button control
					$scope.btn.loading = false;
					$scope.btn.success = true;
					btnReset(1000);

					// Form reset
					formReset();

					// Relocate to view-unit after 1.5s
					$timeout(function() {
						$location.path('/admin/' + $scope.addUnit.courseId + '/view-unit/' + $scope.addUnit.unitId);
					}, 1500);

				}, function() {
					// Error callback
					// Button control
					$scope.btn.loading = false;
					$scope.btn.success = false;
					btnReset(1000);

					// Form reset
					formReset();

					console.log('Error');
				});
		};

		// Add a new unit and overwrite the old
		$scope.addUnit.overwriteUnit = function() {
			Unit.overwrite($scope.formData.unit, $scope.addUnit.unitsArray, $scope.addUnit.unitIdToRemove)
				.then(function(ref) {
					// Success callback

					// Get this unit's UID
					$scope.addUnit.unitId = ref.name();

					// Form reset
					formReset();

					// Relocate to unit-edit
					$location.path('/admin/' + $scope.addUnit.courseId + '/view-unit/' + $scope.addUnit.unitId);
				}, function() {
					// Error callback
					// Form reset
					formReset();

					console.log('Error');
				});
		};

		// Insert a new unit and push down units below
		$scope.addUnit.insertUnit = function() {
			Unit.insert($scope.formData.unit, $scope.addUnit.unitsArray)
				.then(function(ref) {
					// Success callback

					// Get this unit's UID
					$scope.addUnit.unitId = ref.name();

					// Form reset
					formReset();

					// Relocate to unit-edit
					$location.path('/admin/' + $scope.addUnit.courseId + '/view-unit/' + $scope.addUnit.unitId);
				}, function() {
					//Error callback
					// Form reset
					formReset();

					console.log('Error');
				});
		};

		// Check existing units for duplicates
		$scope.addUnit.checkDuplicateUnit = function() {
			// if unit already exists
			var unitExists = Unit.alreadyExists($scope.formData.unit, $scope.addUnit.unitsArray);

			if (unitExists === false) {
				$scope.addUnit.createUnit();
			} else {
				// open overwrite modal
				$scope.addUnit.overwriteModalOpen = true;

				$scope.addUnit.unitIdToRemove = unitExists;
			}
		};

  });
