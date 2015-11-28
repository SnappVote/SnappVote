// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
// angular.module('starter', ['ionic', ,'ngCordova', 'starter.controllers', 'starter.services'])

var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ionic-datepicker']);

app.run(function($ionicPlatform) {
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

.config(function($stateProvider, $urlRouterProvider, $compileProvider, $httpProvider) {

    $stateProvider
    .state("login", {
        url:"/login",
        templateUrl: "templates/login.html",
        controller: "LoginCtrl",
        cache:false
    })
    .state("devlogin", {
        url:"/devlogin",
        templateUrl: "templates/devlogin.html",
        controller: "DevLoginCtrl"
    })
    .state("register", {
        url:"/register",
        templateUrl: "templates/register.html",
        controller: "RegisterCtrl"
    })
    .state("home", {
        url:"/home",
        templateUrl: "templates/home.html",
        controller: "HomeCtrl",
        cache:false
    })
    .state("group-edit", {
        url:"/group-edit/:id",
        templateUrl: "templates/group-edit.html",
        controller: "GroupEditCtrl"
    })
    .state("sv-detail", {
        url:"/sv-detail/:svId",
        templateUrl: "templates/sv-detail.html",
        controller: "SvDetailCtrl"
    })
    .state("choose-type", {
        url:"/choose-type",
        templateUrl: "templates/choose-type.html",
        controller: "ChooseTypeCtrl"
    })
    .state("new-sv", {
        url:"/new-sv/:id",
        templateUrl: "templates/new-sv.html",
        controller: "NewSnapvoteCtrl"
    })
    .state("contacts", {
        url:"/contacts",
        templateUrl: "templates/contacts.html",
        controller: "ContactsCtrl"
    });

    $urlRouterProvider.otherwise('/login');
    // $ionicConfigProvider.navBar.alignTitle('center');
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https|ftp|mailto|file|tel|data)/);
    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
$httpProvider.defaults.useXDomain = true;
delete $httpProvider.defaults.headers.common['X-Requested-With'];


});
app.directive('onSwipeRight', function($ionicGesture) {
  return {
    restrict :  'A',
    link : function(scope, elem, attrs) {
      var gestureType = attrs.gestureType;
      switch(gestureType) {
        case 'swipeRight':
          $ionicGesture.on('swiperight', scope.reportEvent, elem);
          break;
        case 'swipeleft':
          $ionicGesture.on('swipeleft', scope.reportEvent, elem);
          break;
        case 'doubletap':
          $ionicGesture.on('doubletap', scope.reportEvent, elem);
          break;
        case 'tap':
          $ionicGesture.on('tap', scope.reportEvent, elem);
          break;
      }

    }
  }
});
app.filter('test', [function() {
    return function(input, answer1, answer2) {
        if(input === 0){
            return answer1;
        }
        else if(input === 1){
            return answer2;
        }
        else{
            return "Pending";
        }
    };
}]);
app.filter('svdate', [function() {
    return function(input) {
        if(!input){
            return 0 + " days";
        }
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var firstDate = input;
        var secondDate = new Date(Date.now());

        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        return diffDays + " days";
    };
}])
app.filter('svdate2', [function() {
    return function(input) {
        if(!input){
            return 0 + " days";
        }
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(input);
        var secondDate = new Date(Date.now());

        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        return diffDays + " days";
    };
}])
