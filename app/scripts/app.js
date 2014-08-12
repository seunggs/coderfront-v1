'use strict';

angular
  .module('coderfrontApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'firebase',
    'ui.bootstrap',
    'ui.router',
    'ngAnimate'
  ])
  .constant('FIREBASE_URL', 'https://coderfront.firebaseio.com/')
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      // FRONTEND STATES AND NESTED VIEWS
      .state('home', {
        url: '/home',
        templateUrl: 'views/partials/home.html',
        controller: 'HomeCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/partials/about.html',
        controller: 'AboutCtrl'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'views/partials/contact.html',
        controller: 'ContactCtrl'
      })
      .state('myaccount', {
        url: '/myaccount/:userUid',
        templateUrl: 'views/partials/myaccount.html',
        controller: 'MyaccountCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/partials/signup.html',
        controller: 'SignupCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'views/partials/register.html',
        controller: 'RegisterCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/partials/login.html',
        controller: 'LoginCtrl'
      })
      .state('resetpassword', {
        url: '/resetpassword',
        templateUrl: 'views/partials/resetpassword.html',
        controller: 'ResetpasswordCtrl'
      })
      .state('changepassword', {
        url: '/changepassword',
        templateUrl: 'views/partials/changepassword.html',
        controller: 'ChangepasswordCtrl'
      })

      // ADMIN STATES AND NESTED VIEWS
      .state('admin', {
        url: '/admin/:courseId',
        templateUrl: 'views/partials/admin.html',
        controller: 'AdminCtrl'
      })
      .state('admin-dashboard', {
        url: '/admin-dashboard',
        templateUrl: 'views/partials/admin-dashboard.html',
        controller: 'AdminDashboardCtrl'
      })
      .state('admin.add-unit', {
        url: '/add-unit',
        templateUrl: 'views/partials/admin/add-unit.html',
        controller: 'AddUnitCtrl'
      })
      .state('admin.edit-unit', {
        url: '/edit-unit/:unitId',
        templateUrl: 'views/partials/admin/edit-unit.html',
        controller: 'EditUnitCtrl'
      })
      .state('admin.view-unit', {
        url: '/view-unit/:unitId',
        templateUrl: 'views/partials/backend/view-unit.html',
        controller: 'ViewUnitCtrl'
      })
      .state('admin.add-lesson', {
        url: '/add-lesson/:unitId',
        templateUrl: 'views/partials/admin/add-lesson.html',
        controller: 'AddLessonCtrl'
      })
      .state('admin.edit-lesson', {
        url: '/edit-lesson/:unitId/:lessonId',
        templateUrl: 'views/partials/admin/edit-lesson.html',
        controller: 'EditLessonCtrl'
      })
      .state('admin.view-lesson', {
        url: '/view-lesson/:unitId/:lessonId',
        templateUrl: 'views/partials/backend/view-lesson.html',
        controller: 'ViewLessonCtrl'
      })

      // BACKEND STATES AND NESTED VIEWS
      .state('backend', {
        url: '/backend/:courseId',
        templateUrl: 'views/partials/backend.html',
        controller: 'BackendCtrl'
      })
      .state('backend.view-unit', {
        url: '/view-unit/:unitId',
        templateUrl: 'views/partials/backend/view-unit.html',
        controller: 'ViewUnitCtrl'
      })
      .state('backend.view-lesson', {
        url: '/view-lesson/:unitId/:lessonId',
        templateUrl: 'views/partials/backend/view-lesson.html',
        controller: 'ViewLessonCtrl'
      });

  });