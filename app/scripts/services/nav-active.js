'use strict';

angular.module('coderfrontApp')
  .factory('NavActive', function () {
    var activeNavItem;

    var NavActive = {
      setActive: function(navItem) {
        activeNavItem = navItem;
      },
      getActive: function() {
        return activeNavItem;
      }
    };

    return NavActive;
  });
