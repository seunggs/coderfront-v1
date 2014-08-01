'use strict';

angular.module('coderfrontApp')
  .controller('LoginCtrl', function ($scope, $timeout) {
		// Wrapper object
		$scope.register = {};
		$scope.formData = {};

		// Button object wrappers & functions
		$scope.btn = {};
		var btnReset = function(delay) {
			$timeout(function() {
				$scope.btn = {};
			}, delay);
		};

  });
