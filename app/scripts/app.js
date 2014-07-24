'use strict';

angular
  .module('coderfrontApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'firebase',
    'ui.bootstrap'
  ])
  .constant('FIREBASE_URL', 'https://coderfront.firebaseio.com/')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/add-unit/:courseId', {
        templateUrl: 'views/add-unit.html',
        controller: 'AddUnitCtrl'
      })
      .when('/edit-unit/:unitId', {
        templateUrl: 'views/edit-unit.html',
        controller: 'EditUnitCtrl'
      })
      .when('/lesson-unit/:lessonId', {
        templateUrl: 'views/edit-lesson.html',
        controller: 'EditLessonCtrl'
      })
      .when('/admin-dashboard', {
        templateUrl: 'views/admin-dashboard.html',
        controller: 'AdminDashboardCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
