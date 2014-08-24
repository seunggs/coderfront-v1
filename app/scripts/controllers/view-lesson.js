'use strict';

angular.module('coderfrontApp')
  .controller('ViewLessonCtrl', function ($scope, $stateParams, Course, Unit, Lesson, User) {
		// Wrapper objects
		$scope.wpr = {};

		// Get the ids
		$scope.wpr.courseId = $stateParams.courseId;
		$scope.wpr.unitId = $stateParams.unitId;
		$scope.wpr.lessonId = $stateParams.lessonId;

		// Show page loading while Firebase loads
		$scope.wpr.pageLoading = true;

		// Get this lesson
		Lesson.find($scope.wpr.courseId, $scope.wpr.unitId, $scope.wpr.lessonId)
			.then(function(lessonObj) {
				// Once the lesson is loaded, turn off page loading
				$scope.wpr.pageLoading = false;

				$scope.wpr.lesson = lessonObj;
			});

		// Save this lesson as the last viewed lesson
		User.thisUser()
			.then(function(userDataObj) {
				$scope.wpr.userDataObj = userDataObj;

				$scope.wpr.userDataObj.lastViewed = {
					courseId: $stateParams.courseId,
					unitId: $stateParams.unitId,
					lessonId: $stateParams.lessonId
				};

				User.update($scope.wpr.userDataObj)
					.then(function() {
						console.log('successfully updated last viewed lesson');
					}, function() {
						console.log('failed to updated last viewed lesson');
					});

			});

  });
