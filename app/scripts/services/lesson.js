'use strict';

angular.module('coderfrontApp')
  .factory('Lesson', function ($firebase, FIREBASE_URL) {

    var countersRef = new Firebase(FIREBASE_URL + 'counters');
    var counters = $firebase(countersRef);

    var Unit = {
      // Counter exists to keep track of total units
      // Currently, there's no Firebase method that allows this
      count: function() {
        if(counters.lessonCounter === undefined) {
          return null;
        } else {
          return counters.lessonCounter;
        }
      },
      incrementCounter: function() {
        if(counters.lessonCounter === undefined) {
          return counters.$set({lessonCounter: 1});
        } else {
          return counters.$set({lessonCounter: counters.lessonCounter + 1});
        }
      },
      decrementCounter: function() {
        if(counters.lessonCounter <= 1) {
          return counters.$remove('lessonCounter');
        } else {
          return counters.$set({lessonCounter: counters.lessonCounter - 1});
        }
      },
      all: function(courseId, unitId) {
        var lessonsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);
        return lessons;
      },
      create: function(courseId, unitId, lessonId, lesson) {
        var lessonsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);
        return lessons.$child(lessonId).$set(lesson);
      },
      find: function(courseId, unitId, lessonId) {
        var lessonsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);
        return lessons.$child(lessonId);
      },
      remove: function(courseId, unitId, lessonId) {
        var lessonsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);
        return lessons.$remove(lessonId);
      }
    };

    return Unit;

  });
