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
      insert: function(courseId, unitId, unit) {
        // This method push all the units below the unitId and insert this unit
        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);
        // Push down the units below
        for(var i=unitId; i<counters.unitCounter+1; i++) {
          units.$child(i+1).$set(units[i]);
        }
        // Insert the new unit
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
        // To re-number the units below the deleted on, I have to jump through some hoops
        // 1) Change the unitId of the unit to be removed to counter + 1
        units.$child(counters.unitCounter+1).$set(units.$child(unitId));
        
        // 2) Pull the unitId's of the units below it by copying it
        for(var j=unitId; j<counters.unitCounter; j++) {
          units.$child(j).$set(units.$child(parseInt(j) + 1));
        }

        //3) Remove the older version of the pulled units (which is only the last one)
        units.$remove(counters.unitCounter);

        // 4) Remove the unit in question (which is at counters.unitCounter+1 position)
        return units.$remove(counters.unitCounter+1);
      }
    };

    return Unit;

  });
