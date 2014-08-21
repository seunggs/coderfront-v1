'use strict';

angular.module('coderfrontApp')
  .controller('ViewLessonCtrl', function ($scope, $stateParams, Course, Unit, Lesson, FIREBASE_URL, $firebase, $firebaseSimpleLogin) {
		// Wrapper objects
		$scope.viewLesson = {};

		// Find the right unit & course
		$scope.viewLesson.courseId = $stateParams.courseId;
		$scope.viewLesson.unitId = $stateParams.unitId;

		// Show page loading while Firebase loads
		// And initiate Firebase related variables once it loads
		$scope.viewLesson.pageLoading = true;

    var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + $scope.viewLesson.courseId + '/units');
    var unitsArray = $firebase(unitsRef).$asArray();

    unitsArray.$loaded()
			.then(function() {
				// Stores all units in an array
				$scope.viewLesson.unitsArray = unitsArray;
				
				// Get this specific unit
				$scope.viewLesson.unit = Unit.find($scope.viewLesson.unitId, $scope.viewLesson.unitsArray);
			});

		// Find the right lesson
		$scope.viewLesson.lessonId = $stateParams.lessonId;

    var lessonsRef = new Firebase(FIREBASE_URL + 'courses/' + $scope.viewLesson.courseId + '/units/' + $scope.viewLesson.unitId + '/lessons');
    var lessonsArray = $firebase(lessonsRef).$asArray();

    lessonsArray.$loaded()
			.then(function() {
				$scope.viewLesson.pageLoading = false;
				
				// Stores all lessons in an array
				$scope.viewLesson.lessonsArray = lessonsArray;
				
				// Get this specific lesson
				$scope.viewLesson.lesson = Lesson.find($stateParams.lessonId, $scope.viewLesson.lessonsArray);
			});

		// Save this lesson as the last viewed lesson
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
						$scope.viewLesson.lastViewed = {
							courseId: $stateParams.courseId,
							unitId: $stateParams.unitId,
							lessonId: $stateParams.lessonId
						};
						
						userData.$update({lastViewed: $scope.viewLesson.lastViewed})
							.then(function() {
								console.log('successfully updated last viewed course, unit and lesson');
							}, function() {
								console.log('failed to updated last viewed course, unit and lesson');
							});
					});
			});


  });
