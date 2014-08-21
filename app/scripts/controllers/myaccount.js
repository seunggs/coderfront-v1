'use strict';

angular.module('coderfrontApp')
  .controller('MyaccountCtrl', function ($scope, User, $stateParams) {
		
		// Wrapper object
		$scope.myaccount = {};
		$scope.myaccount.userData = {};
		$scope.formData = {};
		$scope.formData.user = {};
		$scope.msg = {};

		// Edit control
		$scope.myaccount.edit = false;

		// Get user
		// Expose usersObj to scope
		$scope.myaccount.usersObj = User.getAll();

		// Get this specific user
		$scope.myaccount.userData = User.find($stateParams.userUid);

		// Update full name
		$scope.myaccount.updateFullname = function() {
			// Update user data with form input
			$scope.myaccount.userData.fullname = $scope.formData.user.fullname;

			User.update($stateParams.userUid, $scope.myaccount.userData)
				.then(function() {
					// success callback
					$scope.myaccount.edit = false;
				}, function() {
					// error callback
					console.log('Something went wrong while updating fullname');
				});
		};

		// Update avatar
		$scope.myaccount.addAvatar = function() {
			// Update user data with form input
			$scope.myaccount.userData.avatarUrl = $scope.formData.user.avatarUrl;

			User.update($stateParams.userUid, $scope.myaccount.userData)
				.then(function() {
					// success callback
					console.log('successfully updated avatar URL');
				}, function() {
					// error callback
					console.log('Something went wrong while updating fullname');
				});
		};
  });
