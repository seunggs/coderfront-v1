'use strict';

angular.module('coderfrontApp')
  .factory('Lesson', function (FIREBASE_URL, $firebase, $q) {

    var Lesson = {
      alreadyExists: function(courseId, unitId, lesson) {
        var lessonsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);
        var lessonsArray = lessons.$asArray();

        var deferred = $q.defer();

        lessonsArray.$loaded()
          .then(function() {
            // If lessonsArray length is zero, we know this is the first lesson to be added
            if (lessonsArray.length === 0) {
              deferred.reject(false);
            }

            // Check existing lessons for duplicate
            for (var i=0; i<lessonsArray.length; i++) {
              if (lesson.lessonNum === lessonsArray[i].lessonNum) {
                // If there is a duplicate one, return the lessonId to be removed
                deferred.resolve(lessonsArray[i].$id);
              }
            }

            deferred.reject(false);
          });

        return deferred.promise;
      },
      arrayLoaded: function(courseId, unitId) {
        var lessonsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);
        var lessonsArray = lessons.$asArray();

        var deferred = $q.defer();

        lessonsArray.$loaded()
          .then(deferred.resolve, deferred.reject);

        return deferred.promise;
      },
      create: function(courseId, unitId, lesson) {
        var lessonsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);
        var lessonsArray = lessons.$asArray();

        var deferred = $q.defer();

        lessonsArray.$loaded()
          .then(function() {
            lessonsArray.$add(lesson)
              .then(deferred.resolve, deferred.reject);
          });

        return deferred.promise;
      },
      overwrite: function(courseId, unitId, lesson, lessonIdToRemove) {
        var lessonsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);
        var lessonsArray = lessons.$asArray();

        var deferred = $q.defer();

        lessonsArray.$loaded()
          .then(function() {
            var index = lessonsArray.$indexFor(lessonIdToRemove);
            lessonsArray.$remove(index);

            // Then add new lesson
            lessonsArray.$add(lesson)
              .then(deferred.resolve, deferred.reject);
          });

        return deferred.promise;
      },
      insert: function(courseId, unitId, lesson) {
        var lessonsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);
        var lessonsArray = lessons.$asArray();

        var deferred = $q.defer();

        lessonsArray.$loaded()
          .then(function(){
            // This method push all the lessons below the lessonId and insert this lesson
            // Update the lessonNum of all lessons below
            for(var i=lesson.lessonNum-1; i<lessonsArray.length; i++) {
              lessonsArray[i].lessonNum = parseInt(i) + 2;
              lessonsArray.$save(i);
            }
            // Insert the new lesson
            lessonsArray.$add(lesson)
              .then(deferred.resolve, deferred.reject);
          });

        return deferred.promise;
      },
      update: function(courseId, unitId, oldLessonId, newLesson) {
        var lessonsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);
        var lessonsArray = lessons.$asArray();

        var deferred = $q.defer();

        lessonsArray.$loaded()
          .then(function(){
            var index = lessonsArray.$indexFor(oldLessonId);
            lessonsArray[index] = newLesson;
            
            lessonsArray.$save(index)
              .then(deferred.resolve, deferred.reject);
          });

        return deferred.promise;
      },
      array: function(courseId, unitId) {
        var lessonsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);
        var lessonsArray = lessons.$asArray();

        var deferred = $q.defer();

        lessonsArray.$loaded()
          .then(function() {
            deferred.resolve(lessonsArray);
          });

        return deferred.promise;
      },
      find: function(courseId, unitId, lessonId) {
        var lessonsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);
        var lessonsArray = lessons.$asArray();

        var deferred = $q.defer();

        lessonsArray.$loaded()
          .then(function() {
            var index = lessonsArray.$indexFor(lessonId);

            if (index === -1) {
              deferred.reject();
            } else {
              deferred.resolve(lessonsArray[index]);
            }
          });

        return deferred.promise;
      },
      remove: function(courseId, unitId, lessonId, lesson) {
        var lessonsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);
        var lessonsArray = lessons.$asArray();

        var deferred = $q.defer();

        lessonsArray.$loaded()
          .then(function() {
            // Reduce the lessonNum's of the lessons below it by 1
            for(var i=lesson.lessonNum; i<lessonsArray.length; i++) {
              lessonsArray[i].lessonNum = parseInt(i);
              lessonsArray.$save(i);
            }
            // Remove this lesson
            var lessonIndex = lessonsArray.$indexFor(lessonId);
            lessonsArray.$remove(lessonIndex)
              .then(deferred.resolve, deferred.reject);
          });

        return deferred.promise;
      }
    };

    return Lesson;

  });
