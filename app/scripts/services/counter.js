'use strict';

angular.module('coderfrontApp')
  .factory('Counter', function ($firebase, FIREBASE_URL) {

    var Counter = {
      unitCounters: function(courseId) {
        var unitCountersRef = new Firebase(FIREBASE_URL + 'counters/' + courseId);
        var unitCounters = $firebase(unitCountersRef);

        return unitCounters;
      },
      unitCounter: function(courseId) {
        var unitCountersRef = new Firebase(FIREBASE_URL + 'counters/' + courseId);
        var unitCounters = $firebase(unitCountersRef);
        var unitCounter = unitCounters.unitCounter;

        return unitCounter;
      },
      lessonCounters: function(unitId) {
        var lessonCountersRef = new Firebase(FIREBASE_URL + 'counters/' + unitId);
        var lessonCounters = $firebase(lessonCountersRef);

        return lessonCounters;
      },
      lessonCounter: function(unitId) {
        var lessonCountersRef = new Firebase(FIREBASE_URL + 'counters/' + unitId);
        var lessonCounters = $firebase(lessonCountersRef);
        var lessonCounter = lessonCounters.lessonCounter;

        return lessonCounter;
      }
    };

    return Counter;

  });
