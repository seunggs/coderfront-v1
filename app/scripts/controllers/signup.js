'use strict';

angular.module('coderfrontApp')
  .controller('SignupCtrl', function ($scope, Mailchimp, $timeout, $location, TextEditor) {

		// Wrapper objects
		$scope.wpr = {};
		$scope.formData = {};
		$scope.msg = {};

		// Button controls
		$scope.btn = {};
		var btnReset = function(delay) {
			$timeout(function() {
				$scope.btn = {};
			}, delay);
		};

		// Add the subscriber to Mailchimp
		var listId = 'b674b6a90f'; // Mailing list

		$scope.wpr.addToMailchimp = function() {
			$scope.btn.loading = true;

			// Split the full name into first and last name
			var nameArray = TextEditor.splitName($scope.formData.subscriber.fullname);
			$scope.formData.subscriber.firstname = nameArray[0];
			$scope.formData.subscriber.lastname = nameArray[nameArray.length-1];

			console.log($scope.formData.subscriber.firstname);
			console.log($scope.formData.subscriber.lastname);

			Mailchimp.subscribe(listId, $scope.formData.subscriber)
				.then(function() {
					// success callback
					$scope.btn.loading = false;
					$scope.btn.success = true;
					btnReset(1000);

					$scope.msg.success = 'Success! You are successfully signed up. :)';

					// Send to curriculum preview after a short delay
					$timeout(function() {
						$location.path('/preview-curriculum');
					}, 1500);
				}, function() {
					// error callback
					$scope.btn.loading = false;
					$scope.btn.success = false;
					btnReset(1000);

					$scope.msg.error = 'Something went wrong. Please try again in a minute. :(';

					// Send to home after a short delay
					$timeout(function() {
						$location.path('/preview-curriculum');
					}, 1500);
				});
		};

  });
