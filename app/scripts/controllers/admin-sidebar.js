'use strict';

angular.module('coderfrontApp')
  .controller('AdminSidebarCtrl', function ($scope, $stateParams, Course, Unit, Lesson, $firebase, FIREBASE_URL) {

		// Wrapper object for this controller for dot notation
		$scope.adminSidebar = {};

		// Find the right course
		$scope.adminSidebar.courseId = $stateParams.courseId;
		$scope.adminSidebar.course = Course.find($stateParams.courseId);

		// Stores all units
		$scope.adminSidebar.units = Unit.all($scope.adminSidebar.courseId);

		// Get lessons
		$scope.adminSidebar.lessons = [];
		$scope.adminSidebar.getLessons = function(unitId) {

			var lessonsRef = new Firebase(FIREBASE_URL + 'units/' + unitId + '/lessons');
			var lessons = $firebase(lessonsRef);

			// Must wait until lesson data is loaded before assiging $ids and lessons
			lessons.$on('loaded', function() {
				if (lessons !== undefined) {
					// First insert ids into each object with the key '$id'
					var tempIds = [];
					tempIds = lessons.$getIndex();

					for (var i=0; i<tempIds.length; i++) {
						var lessonObj = lessons[tempIds[i]];
						lessonObj.$id = tempIds[i];
					}
					
					// Create an array and save all the lessons in the order of their priorities
					$scope.adminSidebar.lessons.push(lessons);
				}
			});
	
		};

		// Remove unit
		$scope.adminSidebar.removeUnit = function(unitId, unit) {
			Unit.remove($scope.adminSidebar.courseId, unitId, unit)
				.then(function() {
					Unit.decrementCounter($scope.adminSidebar.courseId);

					// Update priority
					Unit.updatePriority($scope.adminSidebar.courseId);

				}, function() {
					// Error callback
					console.log('Error removing unit');
				});
		};

		// Remove lesson
		$scope.adminSidebar.removeLesson = function(unitId, lessonId, lesson) {
			Lesson.remove(unitId, lessonId, lesson)
				.then(function() {
					Lesson.decrementCounter(unitId);

					// Update priority
					Lesson.updatePriority(unitId);

				}, function() {
					// Error callback
					console.log('Error removing unit');
				});
		};
  });
