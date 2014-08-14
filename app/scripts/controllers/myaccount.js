'use strict';

angular.module('coderfrontApp')
  .controller('MyaccountCtrl', function ($scope, User, $stateParams, $timeout, FIREBASE_URL, $firebase) {
		
		// Wrapper object
		$scope.myaccount = {};
		$scope.myaccount.userData = {};
		$scope.formData = {};
		$scope.formData.user = {};
		$scope.msg = {};

		// Edit control
		$scope.myaccount.edit = false;

		// Get user
		var usersRef = new Firebase(FIREBASE_URL + 'users');
		var usersObj = $firebase(usersRef).$asObject();

		usersObj.$loaded()
			.then(function() {
				// Expose usersObj to scope
				$scope.myaccount.usersObj = usersObj;

				// Get this specific user
				$scope.myaccount.userData = usersObj[$stateParams.userUid];
			});

		// Update full name
		$scope.myaccount.updateFullname = function() {
			// Update user data with form input
			$scope.myaccount.userData.fullname = $scope.formData.user.fullname;

			User.update($scope.myaccount.usersObj, $stateParams.userUid, $scope.myaccount.userData)
				.then(function() {
					// success callback
					$scope.myaccount.edit = false;
				}, function() {
					// error callback
					console.log('Something went wrong while updating fullname');
				});
		};

  });
