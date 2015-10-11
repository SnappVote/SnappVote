// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider){
    $stateProvider
    .state("home", {
        url:"/home",
        templateUrl: "templates/home.html",
        controller: "HomeController"
    });
    $urlRouterProvider.otherwise("/home");
    $ionicConfigProvider.navBar.alignTitle('center');
})
.controller("HomeController", function($scope, $cordovaContacts) {
    $scope.contacts = [];
    $scope.test = function(){
        navigator.contactsPhoneNumbers.list(function(contacts) {
            $scope.contacts = contacts;
            for(var i = 0; i < contacts.length; i++) {
                console.log(contacts[i].id + " - " + contacts[i].displayName);
                for(var j = 0; j < contacts[i].phoneNumbers.length; j++) {
                    var phone = contacts[i].phoneNumbers[j];
                    // $scope.contacts.push({name: contacts[i].displayName, phone:phone.normalizedNumber });
                    console.log(phone.type + "  " + phone.number + " (" + phone.normalizedNumber+ ")");
                }
                $scope.$digest();
            }
        }, function(error) {
            console.error(error);
        });

        // var options = {};
        // options.filter = "Yordan";
        // options.multiple = true;
        // options.hasPhoneNumber = true;
        //
        // //get the phone contacts
        // $cordovaContacts.find(options).then(function(result) {
        //     for (var i = 0; i < result.length; i++) {
        //         console.log('----------------------');
        //
        //         for (var variable in result[i]) {
        //             if (result[i].hasOwnProperty(variable)) {
        //                 console.log(variable + " -> " + result[i][variable]);
        //                 if(variable === "phoneNumbers"){
        //                     for (var asd in variable) {
        //                         if (variable.hasOwnProperty(asd)) {
        //                             console.log(asd);
        //                         }
        //                     }
        //                 }
        //                 //    if(variable === "displayName" ||  variable === "phoneNumbers"){
        //                 //        if(variable === "phoneNumbers"){
        //                 //
        //                 //        }
        //                 //
        //                 //        console.log(variable + " -> " + result[i][variable]);
        //                 //    }
        //             }
        //         }
        //     }
        // }, function(err) {
        // });
    }
});
