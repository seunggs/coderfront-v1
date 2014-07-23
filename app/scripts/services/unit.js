'use strict';

angular.module('coderfrontApp')
  .factory('Unit', function ($firebase, FIREBASE_URL) {

    var countersRef = new Firebase(FIREBASE_URL + 'counters');
    var counters = $firebase(countersRef);

    var Unit = {
      // Counter exists to keep track of total units
      // Currently, there's no Firebase method that allows this
      count: function() {
        if(counters.unitCounter === undefined) {
          return null;
        } else {
          return counters.unitCounter;
        }
      },
      incrementCounter: function() {
        if(counters.unitCounter === undefined) {
          return counters.$set({unitCounter: 1});
        } else {
          return counters.$set({unitCounter: counters.unitCounter + 1});
        }
      },
      decrementCounter: function() {
        if(counters.unitCounter <= 1) {
          return counters.$remove('unitCounter');
        } else {
          return counters.$set({unitCounter: counters.unitCounter - 1});
        }
      },
      all: function(courseId) {
        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);
        return units;
      },
      create: function(courseId, unitId, unit) {
        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);
        return units.$child(unitId).$set(unit);
      },
      find: function(courseId, unitId) {
        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);
        return units.$child(unitId);
      },
      remove: function(courseId, unitId) {
        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);
        return units.$remove(unitId);
      }
    };

    return Unit;

  });
