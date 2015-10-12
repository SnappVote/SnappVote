angular.module('starter.controllers', [])
.controller('LoginCtrl', function($scope, $http, $location) {
    $scope.goHome = function(){
        $location.path("/home/outgoing");
    }
    $scope.test = function(){
        $location.path("/contacts/all");
    }
 })
 .controller('OutgoingCtrl', function($scope) {

 })
 .controller('IncomingCtrl', function($scope) {

 })
 .controller('NewSnappvoteCtrl', function($scope) {

 })
 .controller('AllContactsCtrl', function($scope, $cordovaContacts) {
     $scope.contacts = [];
     getContacts();
     function getContacts(){
         //cordova contacts plugins
         //https://github.com/dbaq/cordova-plugin-contacts-phone-numbers
         navigator.contactsPhoneNumbers.list(function(contacts) {
             $scope.contacts = contacts;
             $scope.$digest();
            //  for(var i = 0; i < contacts.length; i++) {
            //      console.log(contacts[i].id + " - " + contacts[i].displayName);
            //      for(var j = 0; j < contacts[i].phoneNumbers.length; j++) {
            //          var phone = contacts[i].phoneNumbers[j];
            //          console.log(phone.type + "  " + phone.number + " (" + phone.normalizedNumber+ ")");
            //      }
            //  }
         }, function(error) {
             console.error(error);
         });
     }
 })
 .controller('GroupsCtrl', function($scope) {

 })
.controller('RegisterCtrl', function($scope) {

});
