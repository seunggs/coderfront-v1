'use strict';

angular.module('coderfrontApp')
  .controller('WelcomeCtrl', function ($scope, $stateParams, Course, FIREBASE_URL, $firebase, $firebaseSimpleLogin) {
    
		// Wrapper object
		$scope.welcome = {};

		// Get the courseId
		$scope.welcome.courseId = $stateParams.courseId;

		// Page loading control
		$scope.welcome.pageLoading = true;

		// Find the right course
		var courseRef = new Firebase(FIREBASE_URL + 'courses/' + $scope.welcome.courseId);
		var courseObj = $firebase(courseRef).$asObject();

		courseObj.$loaded()
			.then(function(course) {
				$scope.welcome.pageLoading = false;
				$scope.welcome.course = course;
			});

		// Save this unit as the last viewed unit
		// First, get user uid
    var rootRef = new Firebase(FIREBASE_URL);
    var loginObj = $firebaseSimpleLogin(rootRef);

    loginObj.$getCurrentUser()
			.then(function(user) {
		    // Then get userData
				var userDataRef = new Firebase(FIREBASE_URL + 'users/' + user.uid);
				var userData = $firebase(userDataRef);
				var userDataObj = userData.$asObject();

				userDataObj.$loaded()
					.then(function() {
						// Save this lesson as the last viewed lesson
						$scope.welcome.lastViewed = {
							courseId: $stateParams.courseId,
							unitId: 'NA',
							lessonId: 'NA'
						};
						
						userData.$update({lastViewed: $scope.welcome.lastViewed})
							.then(function() {
								console.log('successfully updated last viewed course, unit and lesson');
							}, function() {
								console.log('failed to updated last viewed course, unit and lesson');
							});
					});
			});

  });
