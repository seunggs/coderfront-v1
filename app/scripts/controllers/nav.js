'use strict';

angular.module('coderfrontApp')
  .controller('NavCtrl', function ($scope, Auth, $location, $rootScope) {
		// Wrapper object
		$scope.nav = {};

		// Expose user to scope
		$scope.nav.user = Auth.getUser();
		$scope.nav.userSignedIn = Auth.signedIn();

		// Expose user to scope when login event is fired
		$rootScope.$on('$firebaseSimpleLogin:login', function() {
			$scope.nav.user = Auth.getUser();
			$scope.nav.userSignedIn = Auth.signedIn();
		});

		// Expose user to scope when logout event is fired
		$rootScope.$on('$firebaseSimpleLogin:logout', function() {
			$scope.nav.user = Auth.getUser();
			$scope.nav.userSignedIn = Auth.signedIn();
		});

		// Set active navItem
		$scope.nav.setActive = function(navItem) {
			$scope.nav.active = navItem;
		};

		// Handle logout
		$scope.nav.logout = function() {
			Auth.logout();
			$location.path('/');
		};

  });
