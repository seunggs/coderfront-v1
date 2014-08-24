'use strict';

angular.module('coderfrontApp')
  .controller('MyaccountCtrl', function ($scope, User) {
		
		// Wrapper object
		$scope.wpr = {};
		$scope.wpr.userData = {};
		$scope.formData = {};
		$scope.formData.user = {};
		$scope.msg = {};

		// Edit control
		$scope.wpr.edit = false;

		// Get user
		// Expose usersObj to scope
		$scope.wpr.usersObj = User.getAll();

		// Get this specific user
		User.thisUser()
			.then(function(userDataObj) {
				$scope.wpr.userData = userDataObj;
			});

		// Update full name
		$scope.wpr.updateFullname = function() {
			// Update user data with form input
			$scope.wpr.userData.fullname = $scope.formData.user.fullname;

			User.update($scope.wpr.userData)
				.then(function() {
					// success callback
					$scope.wpr.edit = false;
				}, function() {
					// error callback
					console.log('Something went wrong while updating fullname');
				});
		};

		// Update avatar
		$scope.wpr.addAvatar = function() {
			// Update user data with form input
			$scope.wpr.userData.avatarUrl = $scope.formData.user.avatarUrl;

			User.update($scope.wpr.userData)
				.then(function() {
					// success callback
					console.log('successfully updated avatar URL');
				}, function() {
					// error callback
					console.log('Something went wrong while updating fullname');
				});
		};
  });
