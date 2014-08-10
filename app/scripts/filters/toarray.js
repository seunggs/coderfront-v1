'use strict';

angular.module('coderfrontApp')
  .filter('toArray', function () {
    return function (obj) {
      if (!(obj instanceof Object)) {
        return obj;
      }

      return Object.keys(obj).map(function (key) {
        return Object.defineProperty(obj[key], '$id', {value: key});
      });
    };
	});
