angular.module('starter.controllers', [])
.controller('LoginCtrl', function($scope, $http, $location, $ionicPopup, $document, $timeout, Options, Camera2) {
    console.log('hello');

    if(Options.isShown()){
        Options.close();
    }

    $scope.goHome = function(){
        $location.path("/home/outgoing");
    };

    $scope.test = function(){
        Camera2.getPicture(Camera.PictureSourceType.SAVEDPHOTOALBUM).then(function(imageURI) {
            $scope.items.push(imageURI);
        }, function(err) {
            console.log(err);
        });
//         navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
//    destinationType: Camera.DestinationType.DATA_URL,
//    sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM });
// //         navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
// //    destinationType: Camera.DestinationType.DATA_URL
// // });
//
// function onSuccess(imageData) {
//     console.log(imageData);
// }
//
// function onFail(message) {
//    console.log('Failed because: ' + message);
// }
    }

})

 .controller('HomeCtrl', function($scope, $http, $ionicHistory, $ionicPopup, Utils, Snapvotes, Options) {
     if(Options.isShown()){
         Options.close();
     }

    //  var url =  Utils.getBaseURL() + "/users/" + Utils.getSVUserId();
    //  $http.get(url).then(function(resp) {
    //      $scope.userId = resp.data[0].username;
    //  }, function(err) {
    //      $scope.response = err;
    //  })

     Snapvotes.getOutgoing().then(function(resp) {
         $scope.outgoing = resp.data;
         //$scope.response = resp;
     }, function(err) {
         var popup = $ionicPopup.show({
             title: 'Oops !',
             template: 'There was an error fetching your outgoing SnapVotes.',
             cssClass: 'popup-error',
             buttons: [
                 { text: 'OK' }
             ]
         });
         $scope.response = err;
     })

     Snapvotes.getIncoming().then(function(resp) {
         $scope.incoming = resp.data;
         //$scope.response = resp;
     }, function(err) {
         var popup = $ionicPopup.show({
             title: 'Oops !',
             template: 'There was an error fetching your incoming SnapVotes.',
             cssClass: 'popup-error',
             buttons: [
                 { text: 'OK' }
             ]
         });
         $scope.response = err;
     })

     $scope.toggleSV = function(snapvote){
         snapvote.toggled = !snapvote.toggled;
     }
     $scope.openOptions = function(){
         Options.show();
     }
 })

 .controller('ChooseTypeCtrl', function($scope, $ionicPopup, $http, $ionicHistory, Options) {
     $scope.goBack = function() {
         $ionicHistory.goBack();
     }
     $scope.openOptions = function(){
         Options.show();
     }
 })

 .controller('NewSnapvoteCtrl', function($scope, $ionicPopup, $ionicHistory, $stateParams, $ionicScrollDelegate, Camera2, Snapvotes, Options) {
     $scope.type = $stateParams.id;
     $scope.inputs = {};
     $scope.items = [];
     $scope.answer1 = "...";
     $scope.answer2 = "...";
     $scope.answersHidden = true;
     $scope.answers = [
         ['Yes', 'No'],
         ['Cool', 'Nope'],
         ['Left', 'Right'],
         ['Add..', 'Add..']
     ];

     $scope.$on('$stateChangeSuccess', function(e, toState) {
         if(toState.name === 'new-sv') {
             $ionicScrollDelegate.scrollTop();
         }
     });

     function convertFileToBase64viaFileReader(url, callback){
         var xhr = new XMLHttpRequest();
         xhr.responseType = 'blob';
         xhr.onload = function() {
             var reader  = new FileReader();
             reader.onloadend = function () {
                 callback(reader.result);
             }
             reader.readAsDataURL(xhr.response);
         };
         xhr.open('GET', url);
         xhr.send();
     }

     convertFileToBase64viaFileReader('https://i.imgur.com/IWAoX21.jpg', function(base64Img){
         var res = base64Img.substring(23, base64Img.length);
        //  //
        //  $scope.items.push(res);
        //  $scope.items.push(res);
     });

     $scope.addPhoto = function(position){
         Camera2.getPicture(Camera.PictureSourceType.CAMERA).then(function(imageURI) {
             $scope.items[position] = imageURI;
         }, function(err) {
             console.log(err);
         });
     };
     $scope.addPhotoGallery = function(position){
         Camera2.getPicture(Camera.PictureSourceType.SAVEDPHOTOALBUM).then(function(imageURI) {
             $scope.items[position] = imageURI;
         }, function(err) {
             console.log(err);
         });
     }

     $scope.createSnapvote = function(){
         console.log($scope.type);
         if($scope.type == 2){
             Snapvotes.saveSnapvote($scope.inputs.question, $scope.items[0], $scope.items[1], $scope.answer1, $scope.answer2, $scope.selectedDate);
         }
         else{
             Snapvotes.saveSnapvote($scope.inputs.question, $scope.items[0], "...", $scope.answer1, $scope.answer2, $scope.selectedDate);
         }
     };

     $scope.toggleAnswers = function(){
         $scope.answersHidden = !$scope.answersHidden;
     };

     $scope.updateAnswers = function(index, answerIndex){
         if(index === $scope.answers.length-1){
             var myPopup = $ionicPopup.show({
                 template: '<input type="text" ng-model="inputs.answer_1"><input type="text" ng-model="inputs.answer_2">',
                 title: 'Add answers',
                 scope: $scope,
                 buttons: [
                     { text: 'Cancel' },
                     {
                         text: 'OK',
                         type: 'button-positive',
                         onTap: function(e) {
                             return $scope.inputs;
                         }
                     }
                 ]
             });
             myPopup.then(function(res) {
                 if(res){
                     var asd = [$scope.inputs.answer_1, $scope.inputs.answer_2];
                     $scope.answers.splice(0,0,asd);
                 }
             })
         }
         else{
             $scope.answersHidden = !$scope.answersHidden;
             if(answerIndex === 0){
                 $scope.answer1 = $scope.answers[index][0];
             }
             if(answerIndex === 1){
                 $scope.answer2 = $scope.answers[index][1];

             }
         }
     };
     $scope.goBack = function() {
         $ionicHistory.goBack();
     }
     var datePickerCallback = function (val) {
         if (typeof(val) === 'undefined') {
             console.log('No date selected');
         } else {
             console.log('Selected date is : ', val);
             $scope.selectedDate = val;
         }
     };
     $scope.datepickerObject = {
         titleLabel: 'Voting Period',  //Optional
         closeLabel: 'Close',  //Optional
         setLabel: 'Set',  //Optional
         setButtonType : 'button-assertive',  //Optional
         todayButtonType : 'button-assertive',  //Optional
         closeButtonType : 'button-assertive',  //Optional
         inputDate: new Date(),  //Optional
         mondayFirst: true,  //Optional
         templateType: 'popup', //Optional
         showTodayButton: 'true', //Optional
         modalHeaderColor: 'bar-positive', //Optional
         modalFooterColor: 'bar-positive', //Optional
         from: new Date(2012, 8, 2), //Optional
         to: new Date(2018, 8, 25),  //Optional
         callback: function (val) {  //Mandatory
             datePickerCallback(val);
         },
         dateFormat: 'dd-MM-yyyy', //Optional
         closeOnSelect: false, //Optional
     };
     $scope.openOptions = function(){
         Options.show();
     }
 })

 .controller('ContactsCtrl', function($scope, $http, $location, $ionicPopup, $ionicHistory, $timeout, Users, Groups, Utils, Snapvotes, Options) {
     $scope.$on('$stateChangeSuccess', function(e, toState) {
         if(toState.name === 'contacts') {

         }
     });

     $scope.type = 0;
     $scope.selectedContacts = [];
     $scope.contacts = [];
     $scope.groups = [];
     $scope.groups = [];
     $scope.data = {};
     $scope.sendSV = true;

     if(Options.isShown()){
         $scope.sendSV = false;
         Options.close();
     }

     Users.getAllUsers().then(function(resp) {
         $scope.contacts = resp.data;
         //  $scope.response = resp;
     }, function(err) {
         $scope.response = err;
     })

     Groups.getGroups().then(function(resp) {
         $scope.groups = resp.data;
         //  $scope.response = resp;
     }, function(err) {
         $scope.response = err;
     })

     $scope.switchTabs = function(type){
         $scope.type = type;
     };

     $scope.toggleContact = function(contact){
         contact.toggled = !contact.toggled;
         if(contact.toggled){
             pushUnique($scope.selectedContacts, contact.id);
         }
         else{
             removeFromArr($scope.selectedContacts, contact.id);
         }
     }

     $scope.toggleGroup = function(group){
         group.toggled = !group.toggled;
         var url = Utils.getBaseURL() + "/groups/" + group.id;
         $http.get(url).then(function(resp) {
             $scope.response = resp;
             if(group.toggled){
                 for (var i = 0; i < resp.data.length; i++) {
                     pushUnique($scope.selectedContacts, resp.data[i].id);
                     for (var j = 0; j < $scope.contacts.length; j++) {
                         if($scope.contacts[j].id === resp.data[i].id){
                             $scope.contacts[j].toggled = true;
                         }
                     }
                 }
             }
             else{
                 for (var i = 0; i < resp.data.length; i++) {
                     removeFromArr($scope.selectedContacts, resp.data[i].id);
                 }
                 for (var i = 0; i < $scope.contacts.length; i++) {
                     if($scope.contacts[i].toggled){
                         pushUnique($scope.selectedContacts, $scope.contacts[i].id);

                     }
                 }
             }
         }, function(err) {
             $scope.response = err;
         })
     }

     $scope.isToggled = function(contact){
         return true;
     }

     $scope.sendSV1 = function(){
         Snapvotes.setContacts($scope.selectedContacts);
         var dataJson = Snapvotes.getSnappvote();

         var url = Utils.getBaseURL() + '/snappvotes/out/' + Utils.getSVUserId();
         $http.post(url, dataJson).then(function(resp) {
             //  $scope.response = resp;
             var popup = $ionicPopup.show({
                 title: 'SnapVote sent',
                 template: '<div class="popup-content-2">Awesome ! Your SnapVote is sent successfully !</div>'
             });
             $timeout(function(){
                 popup.close();
                 $location.path('/home');
             }, 2000);
         }, function(err) {
             $scope.response = err;
             var popup = $ionicPopup.show({
                 title: 'Oops !',
                 template: 'Could not connect to server.',
                 cssClass: 'popup-error',
                 buttons: [
                     { text: 'OK' }
                 ]
             });
         })
     }

     function pushUnique(arr1, arr2){
         if(isin(arr1, arr2)){
         }
         else{
             arr1.push(arr2);
         }
     }
     function removeFromArr(arr, value) {
         for (var i = 0; i < arr.length; i++) {
             if(value === arr[i]){
                 arr.splice(i, 1);
             }
         }
     }
     function isin(arr, value){
         for (var i = 0; i < arr.length; i++) {
             if(value === arr[i]){
                 return true;
             }
         }
         return false;
     }
     function getContacts(){
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


     $scope.addGroup = function(){
         var myPopup = $ionicPopup.show({
             template: '<input type="text" ng-model="data.wifi">',
             title: 'Enter Group Name',
             scope: $scope,
             buttons: [
                 { text: 'Cancel' },
                 {
                     text: 'OK',
                     type: 'button-positive',
                     onTap: function(e) {
                         return $scope.data.wifi;
                     }
                 }
             ]
         });
         myPopup.then(function(res) {
             if(res){
                 var dataJson={};
                 dataJson["name"] = $scope.data.wifi;
                 $scope.data.wifi = "";
                 var url = Utils.getBaseURL() + "/groups/" + Utils.getSVUserId();
                 $http.post(url, dataJson).then(function(resp) {
                     $scope.response = resp;
                     Groups.getGroups().then(function(resp) {
                         $scope.groups = resp.data;
                         $scope.response = resp;
                     }, function(err) {
                         $scope.response = err;
                     })
                 }, function(err) {
                     $scope.response = err;
                 })
             }
         })
     }
     $scope.editGroup = function(){
         var toggledGroups = [];
         for (var i = 0; i < $scope.groups.length; i++) {
             if($scope.groups[i].toggled === true){
                 toggledGroups.push($scope.groups[i].id);
             }
         }
         if(toggledGroups.length === 1){
             $location.path("/group-edit/" + toggledGroups[0]);
         }
         else{
             var popup = $ionicPopup.show({
                 title: 'Oops !',
                 template: 'Can\'t edit multiple groups.',
                 cssClass: 'popup-error',
                 buttons: [
                     { text: 'OK' }
                 ]
             });
         }
     }
     $scope.goBack = function() {
         $ionicHistory.goBack();
     }
     $scope.openOptions = function(){
         Options.show();
     }
 })
 .controller('SvDetailCtrl', function($scope, $http, $stateParams, $ionicHistory, $ionicPopup, $timeout, $location, Utils, Snapvotes, Options) {
     $scope.selected = -1;
     $scope.type = 1;
     var svId = $stateParams.svId;
     Snapvotes.getSnappvoteById(svId).then(function(resp) {
         $scope.response = resp;
         snappvote = resp.data[0];
         $scope.selected = snappvote.voter_answer;
         $scope.img1 = snappvote.img_1;
         $scope.img2 = snappvote.img_2;
         console.log(snappvote.img_2);
         if(snappvote.img_2 != "..."){
             $scope.type = 2;
         }
         else{
             $scope.type = 1;
         }
         $scope.snappvote = snappvote;
     }, function(err) {
         $scope.response = err;
     });

     $scope.answer1Clicked = function(){
         $scope.selected = 0;
     };
     $scope.answer2Clicked = function(){
         $scope.selected = 1;
     }
     $scope.submitAnswer = function(){
         var dataJson={};
         dataJson["voter_id"] = Utils.getSVUserId();
         dataJson["answer_id"] = $scope.selected;

         var url = Utils.getBaseURL() + "/snappvotes/answers/" + $scope.snappvote.id;
         $http.post(url, dataJson).then(function(resp) {
             $scope.response = resp;
             var popup = $ionicPopup.show({
                 title: 'Success',
                 template: '<div class="popup-content">Answer sent.</div>'
             });
                  $timeout(function(){
                      popup.close();
                      $location.path('/home');
                  }, 1500);
         }, function(err) {
             $scope.response = err;
             var popup = $ionicPopup.show({
                 title: 'Oops !',
                 template: 'Could not connect to server.',
                 cssClass: 'popup-error',
                 buttons: [
                     { text: 'OK' }
                 ]
             });
         })
     }
     $scope.goBack = function() {
         $ionicHistory.goBack();
     }
     $scope.openOptions = function(){
         Options.show();
     }
 })
 .controller('GroupEditCtrl', function($scope, $ionicPopup, $ionicHistory, $stateParams, $http, $ionicHistory, Snapvotes, Utils, $location, $timeout, Options) {
     var groupId = $stateParams.id;
     $scope.contacts = [];
     $scope.groupContacts = [];

     getContacts();
    //  getContactsForGroup();

     $scope.toggleContact = function(contact){
         contact.toggled = !contact.toggled;
     }

     function getContacts(){
         var url = Utils.getBaseURL() + '/users';
         $http.get(url).then(function(resp) {
             $scope.contacts = resp.data;
             var url = Utils.getBaseURL() + '/groups/' + groupId;
             $http.get(url).then(function(resp) {
                 $scope.groupContacts = resp.data;
                 $scope.response = resp;
                 for (var i = 0; i < $scope.contacts.length; i++) {
                     for (var j = 0; j < $scope.groupContacts.length; j++) {
                         if($scope.contacts[i].id === $scope.groupContacts[j].id){
                             $scope.contacts[i].toggled = true;
                         }
                     }
                 }
             }, function(err) {
                 $scope.response = err;
             })
         }, function(err) {
             $scope.response = err;
         })
     }

     $scope.addContacts = function(){
         var selectedContactsIds = [];
         for (var i = 0; i < $scope.contacts.length; i++) {
             if($scope.contacts[i].toggled === true){
                 selectedContactsIds.push($scope.contacts[i].id);
             }
         }
         var snappvote = {};
         snappvote['contacts_ids'] = selectedContactsIds;
          var url = Utils.getBaseURL() + '/groups/' + groupId + '/contacts';
          $http.post(url, snappvote).then(function(resp) {
              $scope.response = resp;
              var popup = $ionicPopup.show({
                  title: 'Succes.',
                  template: '<div class="popup-content-2">Group edited.</div>'
              });
              $timeout(function(){
                  popup.close();
                  $location.path('/contacts');
              }, 1500);
          }, function(err) {
              var popup = $ionicPopup.show({
                  title: 'Oops !',
                  template: 'Could not connect to server.',
                  cssClass: 'popup-error',
                  buttons: [
                      { text: 'OK' }
                  ]
              });
              $scope.response = err;
          })
     }

     $scope.goBack = function() {
         $ionicHistory.goBack();
     }
     $scope.openOptions = function(){
         Options.show();
     }
 })
 .controller('RegisterCtrl', function($scope, $http, $ionicPopup, $ionicHistory, $location, $timeout, Utils) {
     $scope.selectedCountry = "Afghanistan";
     $scope.form = {};
     $scope.countries = countriesJson;
     $scope.dial_code = 0;
     $scope.register = function(){
         var counter = 0;
         for (var key in $scope.form) {
             if ($scope.form.hasOwnProperty(key)) {
                     counter++;
             }
         }
         if(counter != 4){
             $scope.isDisabled =false;
             var popup = $ionicPopup.show({
                 title: 'Oops !',
                 template: 'You have not anwered all registration questions !',
                 cssClass: 'popup-error',
                 buttons: [
                     { text: 'OK' }
                 ]
             });
         }
         else{
             var dataJson={};
             $scope.form.country = $scope.form.country.name;
             for(var key in $scope.form) dataJson[key]=$scope.form[key];
             var url = Utils.getBaseURL() + '/users';
             $http.post(url, dataJson).then(function(resp) {
                 Utils.setSVUserId(resp.data.id);
                 var popup = $ionicPopup.show({
                     title: 'Registration successfull.',
                     template: '<div class="popup-content">Enjoy SnapVote !</div>'
                 });

                 $timeout(function(){
                     popup.close();
                     $location.path('/home');
                 }, 2000);
                 $scope.response = resp;
             }, function(err) {
                 var popup = $ionicPopup.show({
                     title: 'Oops !',
                     template: 'Could not connect to server.',
                     cssClass: 'popup-error',
                     buttons: [
                         { text: 'OK' }
                     ]
                 });
                 $scope.response = err;
             })
         }

     }
     $scope.$watch('form.country.dial_code', function(newValue, oldValue){
         console.log($scope.form.phone);
             if($scope.form.phone){
                 if(!oldValue){
                     $scope.form.phone = newValue + $scope.form.phone;//.replace(oldValue, newValue);
                 }
                 else {
                      $scope.form.phone = $scope.form.phone.replace(oldValue, newValue);

                 }
             }
    });
     $scope.goBack = function() {
         $ionicHistory.goBack();
     }
 })
 .controller('DevLoginCtrl', function($scope, $http, $ionicPopup, $location, $ionicHistory, Utils) {
     $scope.contacts = [];
     var url = Utils.getBaseURL() + '/users';
     $http.get(url).then(function(resp) {
         $scope.response = resp;
         $scope.contacts = resp.data;
     }, function(err) {
         $scope.response = err;
     })
     $scope.login = function(userId){
         Utils.setSVUserId(userId);
         $location.path("/home");
     }
     $scope.goBack = function() {
         $ionicHistory.goBack();
     }
 });
