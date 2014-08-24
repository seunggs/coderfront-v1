'use strict';

angular.module('coderfrontApp')
  .controller('EditLessonCtrl', function ($scope, $stateParams, Unit, Lesson, $location, $timeout, User) {

		// Wrapper objects
		$scope.wpr = {};
		$scope.formData = {};
		$scope.formData.lesson = {};

		// Button object wrappers & functions
		$scope.btn = {};
		var btnReset = function(delay) {
			$timeout(function() {
				$scope.btn = {};
			}, delay);
		};

		// Get all ids
		$scope.wpr.courseId = $stateParams.courseId;
		$scope.wpr.unitId = $stateParams.unitId;
		$scope.wpr.lessonId = $stateParams.lessonId;

		// Show page loading while Firebase loads
		$scope.wpr.pageLoading = true;

		// Find this unit
		Unit.find($scope.wpr.courseId, $scope.wpr.unitId)
			.then(function(unitObj) {
				$scope.wpr.unit = unitObj;
			});

		// Find this lesson
		Lesson.find($scope.wpr.courseId, $scope.wpr.unitId, $scope.wpr.lessonId)
			.then(function(lessonObj) {
				// Once lesson is loaded, turn of page loading
				$scope.wpr.pageLoading = false;

				$scope.wpr.lesson = lessonObj;
				// Initialize formData with this lesson obj
				$scope.formData.lesson = $scope.wpr.lesson;
				$scope.formData.lesson.bodyHTML = '';
			});

		// Update lesson
		$scope.wpr.updateLesson = function() {
			$scope.btn.loading = true; // button control
			Lesson.update($scope.wpr.courseId, $scope.wpr.unitId, $scope.wpr.lesson.$id, $scope.formData.lesson)
				.then(function() {
					// Success callback

					// Button control
					$scope.btn.loading = false;
					$scope.btn.success = true;
					btnReset(1000);

					// Relocate to view-lesson after 1.5s
					$timeout(function() {
						$location.path('/backend/' + $scope.wpr.courseId + '/view-lesson/' + $scope.wpr.unitId + '/' + $scope.wpr.lessonId);
					}, 1500);

				}, function() {
					// Error callback
					// Button control
					$scope.btn.loading = false;
					$scope.btn.success = false;
					btnReset(1000);

					console.log('Error');
				});
		};

		// See if this user is an admin and kick them out to home if not
		User.thisUser()
			.then(function(userDataObj) {
				$scope.wpr.userDataObj = userDataObj;
				if ($scope.wpr.userDataObj.admin === false) {
					// If the user is not admin, kick them out to home
					$location.path('/');
				}
			});

  });
