// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', ,'ngCordova', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {

    $stateProvider
    .state("login", {
        url:"/login",
        templateUrl: "templates/login.html",
        controller: "LoginCtrl"
    })
    .state("register", {
        url:"/register",
        templateUrl: "templates/register.html",
        controller: "RegisterCtrl"
    })
    .state('home', {
        url: '/home',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })
    .state('home.outgoing', {
        url: '/outgoing',
        views: {
            'outgoing': {
                templateUrl: 'templates/outgoing.html',
                controller: 'OutgoingCtrl'
            }
        }
    })
    .state('home.incoming', {
        url: '/incoming',
        views: {
            'incoming': {
                templateUrl: 'templates/incoming.html',
                controller: 'IncomingCtrl'
            }
        }
    })
    .state("choose-type", {
        url:"/choose-type",
        templateUrl: "templates/choose-type.html",
        controller: "RegisterCtrl"
    })
    .state("new-sv", {
        url:"/new-sv",
        templateUrl: "templates/new-sv.html",
        controller: "NewSnappvoteCtrl"
    })
    .state('contacts', {
        url: '/contacts',
        abstract: true,
        templateUrl: 'templates/contacts.html'
    })
    .state('contacts.all', {
        url: '/all',
        views: {
            'all': {
                templateUrl: 'templates/contacts-all.html',
                controller: 'AllContactsCtrl'
            }
        }
    })
    .state('contacts.groups', {
        url: '/groups',
        views: {
            'groups': {
                templateUrl: 'templates/contacts-groups.html',
                controller: 'GroupsCtrl'
            }
        }
    });

    $urlRouterProvider.otherwise('/login');
    $ionicConfigProvider.navBar.alignTitle('center');
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https|ftp|mailto|file|tel|data)/);


});
