angular.module('starter.controllers', [])
.controller('LoginCtrl', function($scope, $http, $location, Snappvote) {
    $scope.goHome = function(){
        $location.path("/home/outgoing");
    }
    $scope.test = function(){
        Snappvote.createSnappvote('title', 'img1', 'img2', 'answer1', 'answer2', 'expireDate');
        var dataJson = Snappvote.getSnappvote();

      }
 })
 .controller('OutgoingCtrl', function($scope) {

 })
 .controller('IncomingCtrl', function($scope) {

 })
 .controller('NewSnappvoteCtrl', function($scope, Snappvote) {
     $scope.form = {};
     $scope.answer1 = "...";
     $scope.answer2 = "...";

     $scope.answers = [
         ['Yes', 'No'],
         ['Cool', 'Nope'],
         ['Left', 'Right']
     ];

     $scope.createSnappvote = function(){
         Snappvote.createSnappvote($scope.form.question, 'img1', 'img2', $scope.answer1, $scope.answer2, 'expireDate');
         var sv = Snappvote.getSnappvote();
         for (var vari in sv) {
             if (sv.hasOwnProperty(vari)) {
                 console.log(vari + " -> " + sv[vari]);
             }
         }
     };

     $scope.updateAnswers = function(index){
         $scope.answer1 = $scope.answers[index][0];
         $scope.answer2 = $scope.answers[index][1];
     };

 })
 .controller('AllContactsCtrl', function($scope, $http, $cordovaContacts, Snappvote) {
     var selectedContactsIds = [];
     $scope.contacts = [];
     getContacts();
     $scope.toggleContact = function(userId){
         var flag = false;
         for (var i = 0; i < selectedContactsIds.length; i++) {
             if(userId === selectedContactsIds[i]){
                 selectedContactsIds.splice(i, 1);
                 flag = true;
             }
         }
         if(!flag){
             selectedContactsIds.push(userId);
         }
     }
     $scope.sendSV = function(){
         Snappvote.setContacts(selectedContactsIds);
         var dataJson = Snappvote.getSnappvote();
        console.log(dataJson['title']);
         console.log(dataJson);
         console.log('---');
         for (var i = 0; i < selectedContactsIds.length; i++) {
             console.log(selectedContactsIds[i]);
         }
         var url = 'http://localhost/api/v1/snappvotes/out/1';
         $http.post(url, dataJson).then(function(resp) {
             $scope.response = resp;
             console.log('Success', resp.data);
             // For JSON responses, resp.data contains the result
         }, function(err) {
             $scope.response = err;

             console.error('ERR', err);
             // err.status will contain the status code
         })
     }
     function getContacts(){
         var url = 'http://localhost/api/v1/users';
         $http.get(url).then(function(resp) {
             $scope.contacts = resp.data;
             console.log('Success', resp);
             // For JSON responses, resp.data contains the result
           }, function(err) {
             console.error('ERR', err);
             // err.status will contain the status code
           })
         //cordova contacts plugins
         //https://github.com/dbaq/cordova-plugin-contacts-phone-numbers
        //  navigator.contactsPhoneNumbers.list(function(contacts) {
        //      $scope.contacts = contacts;
        //      $scope.$digest();
        //      for(var i = 0; i < contacts.length; i++) {
        //          console.log(contacts[i].id + " - " + contacts[i].displayName);
        //          for(var j = 0; j < contacts[i].phoneNumbers.length; j++) {
        //              var phone = contacts[i].phoneNumbers[j];
        //              console.log(phone.type + "  " + phone.number + " (" + phone.normalizedNumber+ ")");
        //          }
        //      }
        //  }, function(error) {
        //      console.error(error);
        //  });
     }
 })
 .controller('GroupsCtrl', function($scope, $http, $ionicPopup) {
     $scope.groups = [];
     $scope.data = {};

     var url = "http://localhost/api/v1/users/1/groups";
     $http.get(url).then(function(resp) {
         $scope.groups = resp.data;
         $scope.response = resp.data;
         console.log('Success', resp);
         // For JSON responses, resp.data contains the result
     }, function(err) {
         console.error('ERR', err);
         // err.status will contain the status code
     })
     $scope.addGroup = function(){
         var myPopup = $ionicPopup.show({
             template: '<input type="password" ng-model="data.wifi">',
             title: 'Enter Wi-Fi Password',
             subTitle: 'Please use normal things',
             scope: $scope,
             buttons: [
                 { text: 'Cancel' },
                 {
                     text: '<b>Save</b>',
                     type: 'button-positive',
                     onTap: function(e) {
                         if (!$scope.data.wifi) {
                             //don't allow the user to close unless he enters wifi password
                             e.preventDefault();
                         } else {
                             return $scope.data.wifi;
                         }
                     }
                 }
             ]
         });
         myPopup.then(function(res) {
console.log(res);});
     }
 })
 .controller('RegisterCtrl', function($scope, $http, $ionicPopup) {
     $scope.form = {};
     $scope.countries = countriesJson;
     $scope.register = function(){
         var dataJson={};
         for(var key in $scope.form) dataJson[key]=$scope.form[key];
         var url = 'http://localhost/api/v1/users';
         $http.post(url, dataJson).then(function(resp) {
             $ionicPopup.alert({
     title: 'Success',
     template: 'User created successfully'
   });
             $scope.response = resp;
             console.log('Success', resp);
             // For JSON responses, resp.data contains the result
         }, function(err) {
             $ionicPopup.alert({
     title: 'Error',
     template: 'Something went wrong '
   });
             $scope.response = err;

             console.error('ERR', err);
             // err.status will contain the status code
         })
     }
 });
