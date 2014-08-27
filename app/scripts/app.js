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
    'ngAnimate',
    'ngS3upload'
  ])
  .constant('FIREBASE_URL', 'https://coderfront.firebaseio.com/')
  .config(function($httpProvider) {
    // enabling CORS
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })
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
      .state('pricing', {
        url: '/pricing',
        templateUrl: 'views/partials/pricing.html',
        controller: 'PricingCtrl'
      })
      .state('thankyou', {
        url: '/thankyou/:courseId',
        templateUrl: 'views/partials/thankyou.html',
        controller: 'ThankyouCtrl'
      })
      .state('thankyou-subscriber', {
        url: '/thankyou-subscriber',
        templateUrl: 'views/partials/thankyou-subscriber.html',
        controller: 'ThankyouSubscriberCtrl'
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

      // BACKEND STATES AND NESTED VIEWS
      .state('backend', {
        url: '/backend/:courseId',
        templateUrl: 'views/partials/backend.html',
        controller: 'BackendCtrl'
      })
      .state('admin-dashboard', {
        url: '/admin-dashboard',
        templateUrl: 'views/partials/admin-dashboard.html',
        controller: 'AdminDashboardCtrl'
      })
      .state('backend.welcome', {
        url: '/welcome',
        templateUrl: 'views/partials/backend/welcome.html',
        controller: 'WelcomeCtrl'
      })
      .state('backend.add-unit', {
        url: '/add-unit',
        templateUrl: 'views/partials/backend/add-unit.html',
        controller: 'AddUnitCtrl'
      })
      .state('backend.edit-unit', {
        url: '/edit-unit/:unitId',
        templateUrl: 'views/partials/backend/edit-unit.html',
        controller: 'EditUnitCtrl'
      })
      .state('backend.view-unit', {
        url: '/view-unit/:unitId',
        templateUrl: 'views/partials/backend/view-unit.html',
        controller: 'ViewUnitCtrl'
      })
      .state('backend.add-lesson', {
        url: '/add-lesson/:unitId',
        templateUrl: 'views/partials/backend/add-lesson.html',
        controller: 'AddLessonCtrl'
      })
      .state('backend.edit-lesson', {
        url: '/edit-lesson/:unitId/:lessonId',
        templateUrl: 'views/partials/backend/edit-lesson.html',
        controller: 'EditLessonCtrl'
      })
      .state('backend.view-lesson', {
        url: '/view-lesson/:unitId/:lessonId',
        templateUrl: 'views/partials/backend/view-lesson.html',
        controller: 'ViewLessonCtrl'
      });

  });