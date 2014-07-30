'use strict';

angular.module('coderfrontApp')
  .factory('Unit', function ($firebase, FIREBASE_URL, Counter) {

    var Unit = {
      // Counter exists to keep track of total units
      // Currently, there's no Firebase method that allows this
      count: function(courseId) {
        var unitCounter = Counter.unitCounter(courseId);

        if(unitCounter === undefined) {
          return null;
        } else {
          return unitCounter;
        }
      },
      incrementCounter: function(courseId) {
        var unitCounters = Counter.unitCounters(courseId);
        var unitCounter = Counter.unitCounter(courseId);

        if(unitCounter === undefined) {
          return unitCounters.$update({unitCounter: 1});
        } else {
          return unitCounters.$update({unitCounter: unitCounter + 1});
        }
      },
      decrementCounter: function(courseId) {
        var unitCounters = Counter.unitCounters(courseId);
        var unitCounter = Counter.unitCounter(courseId);

        if(unitCounter <= 1) {
          return unitCounters.$remove('unitCounter');
        } else {
          return unitCounters.$update({unitCounter: unitCounter - 1});
        }
      },
      updatePriority: function(courseId) {
        var unitCounter = Counter.unitCounter(courseId);

        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);

        // Go through entire record and set priority to match unit.unitNum
        if (unitCounter !== undefined) {
          for (var i=1; i<unitCounter+1; i++) {
            var unitId = (units.$getIndex()[parseInt(i)-1]).toString();
            
            var newPriority = units.$child(unitId).unitNum;

            // Set priority of the units to their respective unitNums
            unitsRef.child(unitId).setPriority(newPriority);
          }
        } else {
          console.log('There are no units');
        }
      },
      alreadyExists: function(courseId, unit) {
        var unitCounter = Counter.unitCounter(courseId);

        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);

        // If counters.unitCounter doesn't exist, we know this is the first unit to be added
        if (unitCounter === undefined) {
          return false;
        }

        // Check existing units for duplicate
        for (var i=1; i<unitCounter+1; i++) {
          var duplicateUnitId = (units.$getIndex()[parseInt(i)-1]).toString();

          if (unit.unitNum === units.$child(duplicateUnitId).unitNum) {
            return duplicateUnitId;
          }
        }

        return false;
      },
      all: function(courseId) {
        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);

        return units;
      },
      create: function(courseId, unit) {
        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);

        return units.$add(unit);
      },
      overwrite: function(courseId, unit, unitIdToRemove) {
        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);

        units.$remove(unitIdToRemove);

        // Then add new unit
        return units.$add(unit);
      },
      insert: function(courseId, unit) {
        // This method push all the units below the unitId and insert this unit
        var unitCounter = Counter.unitCounter(courseId);

        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);

        // Update the unitNum of all units below
        for(var i=unit.unitNum; i<unitCounter+1; i++) {
          var unitIdBelow = (units.$getIndex()[parseInt(i)-1]).toString();
          units.$child(unitIdBelow).$update({unitNum: parseInt(i)+1});
        }
        // Insert the new unit
        return units.$add(unit);
      },
      update: function(courseId, unitId, unit) {
        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);

        return units.$child(unitId).$update(unit);
      },
      duplicate: function(courseId, unit) {
        // Duplicates the unit and adds the duplicated unit right below
        var unitCounter = Counter.unitCounter(courseId);

        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);

        var duplicateUnitNum = parseInt(unit.unitNum) + 1; // unitNum of the duplicated unit

        // Update the unitNum of all units below the duplicated unit
        for(var i=duplicateUnitNum; i<unitCounter+1; i++) {
          var unitIdBelow = (units.$getIndex()[parseInt(i)-1]).toString();
          units.$child(unitIdBelow).$update({unitNum: parseInt(i)+1});
        }
        // Change the unitNum for the duplicate unit
        unit.unitNum = duplicateUnitNum;

        // Insert the new unit and change the unitNum
        return units.$add(unit);
      },
      find: function(courseId, unitId) {
        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);

        return units.$child(unitId);
      },
      remove: function(courseId, unitId, unit) {
        var unitCounter = Counter.unitCounter(courseId);

        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);

        var rootUnitsRef = new Firebase(FIREBASE_URL + 'units');
        var rootUnits = $firebase(rootUnitsRef);

        // Reduce the unitNum's of the units below it by 1
        for(var i=unit.unitNum+1; i<unitCounter+1; i++) {
          var unitIdBelow = (units.$getIndex()[parseInt(i)-1]).toString();
          units.$child(unitIdBelow).$update({unitNum: parseInt(i)-1});
        }
        // Remove all the lessons in this unit
        rootUnits.$remove(unitId);

        // Remove the unit in question (which is at counters.unitCounter+1 position)
        return units.$remove(unitId);
      }
    };

    return Unit;

  });
