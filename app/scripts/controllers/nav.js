'use strict';

angular.module('coderfrontApp')
  .controller('NavCtrl', function ($scope, Auth, $location, $rootScope, FIREBASE_URL, $firebase, $firebaseSimpleLogin) {
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

		// Initiate 'hasCourse' (to determine whether the user bought any courses)
		// Dashboard button is only shown if they bought a course
		$scope.nav.hasCourses = false;

		// See if this user bought any courses
		// First, get user uid
    var rootRef = new Firebase(FIREBASE_URL);
    var loginObj = $firebaseSimpleLogin(rootRef);

    loginObj.$getCurrentUser()
			.then(function(user) {
				if (user === null) {
					return;
				}
				
		    // Then get userData
				var userDataRef = new Firebase(FIREBASE_URL + 'users/' + user.uid);
				var userData = $firebase(userDataRef);
				var userDataObj = userData.$asObject();

				userDataObj.$loaded()
					.then(function() {
						// Now see if this user bought any courses
						if(userDataObj.courses !== undefined) {
							$scope.nav.hasCourses = true;
						} else {
							$scope.nav.hasCourses = false;
						}

						// Get last viewed unit or lesson for dashboard ui-sref
						if(userDataObj.lastViewed !== undefined) {
							$scope.nav.lastViewedCourseId = userDataObj.lastViewed.courseId;
							$scope.nav.lastViewedUnitId = userDataObj.lastViewed.unitId;
							$scope.nav.lastViewedLessonId = userDataObj.lastViewed.lessonId;

							// See if lessonId is null
							// If so, the last thing the user viewed is a unit
							if($scope.nav.lastViewedUnitId === 'NA') {
								// then show welcome page
								$scope.nav.lastViewed = 'course';
							} else {
								// if unitId is not NA, then check to see if lessonId is NA
								if($scope.nav.lastViewedLessonId === 'NA') {
									$scope.nav.lastViewed = 'unit';
								} else {
									$scope.nav.lastViewed = 'lesson';
								}
							}
						}

					});
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
