'use strict';

angular.module('coderfrontApp')
  .controller('ThankyouCtrl', function ($scope, $stateParams, FIREBASE_URL, $firebase, $firebaseSimpleLogin, $location) {
    
		// Wrapper object
		$scope.thankyou = {};

		// Get the courseId
		$scope.thankyou.courseId = $stateParams.courseId;

		// Get the course
		var courseRef = new Firebase(FIREBASE_URL + 'courses/' + $scope.thankyou.courseId);
		var course = $firebase(courseRef);
		var courseObj = course.$asObject();

		courseObj.$loaded()
			.then(function() {
				$scope.thankyou.courseObj = courseObj;
				$scope.thankyou.courseLoaded = true;
			});

		// Make sure the user is logged in
		// If not, send them back to home
    var rootRef = new Firebase(FIREBASE_URL);
    var loginObj = $firebaseSimpleLogin(rootRef);

    loginObj.$getCurrentUser()
			.then(function(user) {
				if (user === null) {
					$location.path('/');
				}
			});

  });
