'use strict';

angular.module('coderfrontApp')
  .controller('NavCtrl', function ($scope, Auth, $location, $rootScope, User, NavActive) {
		// Wrapper object
		$scope.wpr = {};

		// Expose user to scope
		Auth.getUser()
			.then(function(authUser) {
				$scope.wpr.user = authUser;
			});

		Auth.signedIn()
			.then(function(result) {
				$scope.wpr.userSignedIn = result;
			}, function(result) {
				$scope.wpr.userSignedIn = result;
			});

		// Expose user to scope again when login event is fired
		$rootScope.$on('$firebaseSimpleLogin:login', function() {
			Auth.getUser()
				.then(function(authUser) {
					$scope.wpr.user = authUser;
				});

			Auth.signedIn()
				.then(function(result) {
					$scope.wpr.userSignedIn = result;
				}, function(result) {
					$scope.wpr.userSignedIn = result;
				});
		});

		// Expose user to scope again when logout event is fired
		$rootScope.$on('$firebaseSimpleLogin:logout', function() {
			Auth.getUser()
				.then(function(authUser) {
					$scope.wpr.user = authUser;
				});

			Auth.signedIn()
				.then(function(result) {
					$scope.wpr.userSignedIn = result;
				}, function(result) {
					$scope.wpr.userSignedIn = result;
				});
		});

		// Initiate 'hasCourse' (to determine whether the user bought any courses)
		// Dashboard button is only shown if they bought a course
		$scope.wpr.hasCourses = false;

		// See if this user bought any courses
    User.thisUser()
			.then(function(userDataObj) {
				// Now see if this user bought any courses
				$scope.wpr.hasCourses = userDataObj.courses !== undefined ? true : false;

				// Get last viewed unit or lesson for dashboard ui-sref
				if(userDataObj.lastViewed !== undefined) {
					$scope.wpr.lastViewedCourseId = userDataObj.lastViewed.courseId;
					$scope.wpr.lastViewedUnitId = userDataObj.lastViewed.unitId;
					$scope.wpr.lastViewedLessonId = userDataObj.lastViewed.lessonId;

					// See if lessonId is null
					// If so, the last thing the user viewed is a unit
					if($scope.wpr.lastViewedUnitId === 'NA') {
						// then show welcome page
						$scope.wpr.lastViewed = 'course';
					} else {
						// if unitId is not NA, then check to see if lessonId is NA
						if($scope.wpr.lastViewedLessonId === 'NA') {
							$scope.wpr.lastViewed = 'unit';
						} else {
							$scope.wpr.lastViewed = 'lesson';
						}
					}
				}
			});

		// Get active item
		$scope.wpr.active = NavActive.getActive();
		
		// Set active item
		$scope.wpr.setActive = function(navItem) {
			NavActive.setActive(navItem);
		};

		// Handle logout
		$scope.wpr.logout = function() {
			Auth.logout();
			$location.path('/');
		};

  });
