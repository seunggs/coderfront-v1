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
      .when('/admin/:courseId', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/admin-dashboard', {
        templateUrl: 'views/admin-dashboard.html',
        controller: 'AdminDashboardCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
