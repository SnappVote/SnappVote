angular.module('starter.controllers', [])
.controller('LoginCtrl', function($scope, $http, $location, $ionicPopup, $document, $timeout) {
    var domElement = $document.find('#asd');
    angular.element(domElement).triggerHandler('click');
    console.log('hello');
    $scope.goHome = function(){
        $location.path("/home/outgoing");
    };
    $scope.test = function(){
        var popup = $ionicPopup.alert({
            title: 'Success',
            template: 'Snappvote sent.'
        });
        $timeout(function(){
            popup.close();
        }, 1000);
    }
    $scope.openDatePicker = function() {
    }
    var datePickerCallback = function (val) {
        if (typeof(val) === 'undefined') {
            console.log('No date selected');
        } else {
            console.log('Selected date is : ', val)
        }
    };
    $scope.datepickerObject = {
        titleLabel: 'Title',  //Optional
        todayLabel: 'Today',  //Optional
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
    $scope.timePickerObject = {
        inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
        step: 15,  //Optional
        format: 12,  //Optional
        titleLabel: '12-hour Format',  //Optional
        setLabel: 'Set',  //Optional
        closeLabel: 'Close',  //Optional
        setButtonType: 'button-positive',  //Optional
        closeButtonType: 'button-stable',  //Optional
        callback: function (val) {    //Mandatory
            timePickerCallback(val);
        }
    };
    function timePickerCallback(val) {
        if (typeof (val) === 'undefined') {
            console.log('Time not selected');
        } else {
            var selectedTime = new Date(val * 1000);
            console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
        }
    }
})
 .controller('HomeCtrl', function($scope, $http, $ionicHistory, Utils, Snapvotes) {

     var url =  Utils.getBaseURL() + "/users/" + Utils.getSVUserId();
     $http.get(url).then(function(resp) {

         $scope.userId = resp.data[0].username;
     }, function(err) {
         $scope.response = err;
     })

     Snapvotes.getOutgoing().then(function(resp) {
         var snapvotes = resp.data;
         $scope.outgoing = snapvotes;
     }, function(err) {
         $scope.response = err;
     })

     Snapvotes.getIncoming().then(function(resp) {
         $scope.incoming = resp.data;
         $scope.response = resp;

        //  $scope.response = resp;
     }, function(err) {
         $scope.response = err;
     })

     $scope.toggleSV = function(snapvote){
         snapvote.toggled = !snapvote.toggled;
     }
 })
 .controller('ChooseTypeCtrl', function($scope, $ionicPopup, $http, $ionicHistory) {
     $scope.goBack = function() {
         $ionicHistory.goBack();
     }
 })
 .controller('NewSnapvoteCtrl', function($scope, $ionicPopup, $ionicHistory, $stateParams, $ionicScrollDelegate, Camera, Snapvotes) {
     $scope.$on('$stateChangeSuccess', function(e, toState) {
   if(toState.name === 'new-sv') {
       $ionicScrollDelegate.scrollTop();
   }
});
     var type = $stateParams.id;
     $scope.data = {};

     $scope.type = type;
     $scope.items = [];
     $scope.form = {};
     $scope.answer1 = "...";
     $scope.answer2 = "...";
     $scope.answersHidden = true;

     $scope.addPhoto = function(){
         $scope.response = 'lolol';
         Camera.getPicture().then(function(imageURI) {
             $scope.items.push(imageURI);
         }, function(err) {
             console.log(err);
         });
     };

     $scope.answers = [
         ['Yes', 'No'],
         ['Cool', 'Nope'],
         ['Left', 'Right'],
         ['Add..', 'Add..']
     ];

     $scope.createSnapvote = function(){
         Snapvotes.saveSnapvote($scope.form.question, "img1", 'img2', $scope.answer1, $scope.answer2, $scope.selectedDate);
     };

     $scope.toggleAnswers = function(){
         $scope.answersHidden = !$scope.answersHidden;
     }
     $scope.updateAnswers = function(index){
         if(index === $scope.answers.length-1){
             var myPopup = $ionicPopup.show({
                 template: '<input type="text" ng-model="data.wifi"><input type="text" ng-model="data.wifi2">',
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
                     var asd = [$scope.data.wifi, $scope.data.wifi2];
                     $scope.answers.splice(1,0,asd);
                 }
             })
         }
         else{
             $scope.answersHidden = !$scope.answersHidden;

             $scope.answer1 = $scope.answers[index][0];
             $scope.answer2 = $scope.answers[index][1];
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
         titleLabel: 'Title',  //Optional
         todayLabel: 'Today',  //Optional
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

 })
 .controller('ContactsCtrl', function($scope, $http, $location, $ionicPopup, $ionicHistory, Users, Groups, Utils, Snapvotes) {
     $scope.type = 0;
     $scope.selected = 0;
     $scope.contacts = [];
     $scope.selectedContacts = [];
     getContacts();

     $scope.isToggled = function(contact){
         return true;
     }
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

     $scope.sendSV1 = function(){
         var selectedContactsIds = [];
         for (var i = 0; i < $scope.contacts.length; i++) {
             if($scope.contacts[i].toggled === true){
                 selectedContactsIds.push($scope.contacts[i].id);
             }
         }
         Snapvotes.setContacts(selectedContactsIds);
         var dataJson = Snapvotes.getSnappvote();

         for (var i = 0; i < selectedContactsIds.length; i++) {
             console.log(selectedContactsIds[i]);
         }
         var url = Utils.getBaseURL() + '/snappvotes/out/' + Utils.getSVUserId();
         $http.post(url, dataJson).then(function(resp) {
            //  $scope.response = resp;
             $ionicPopup.alert({
                 title: 'Success',
                 template: 'Snappvote sent.'
             });
         }, function(err) {
             $scope.response = err;
             $ionicPopup.alert({
                 title: 'Error',
                 template: 'Something went wrong.'
             });
         })
     }
     function pushUnique(arr1, arr2){
         if(isin(arr1, arr2)){
             console.log('dup found');
         }
         else{
             arr1.push(arr2);
         }
        //  for (var i = 0; i < arr2.length; i++) {
        //      if(isin(arr1, arr2[i])){
        //          console.log('dup found');
        //      }
        //      else{
        //          arr1.push(arr2[i]);
        //      }
        //  }
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
         Users.getAllUsers().then(function(resp) {
             $scope.contacts = resp.data;
         }, function(err) {
             $scope.response = err;
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

     $scope.groups = [];
     $scope.data = {};
     $scope.test = function(){
         pushUnique($scope.selectedContacts, [1,2]);
         pushUnique($scope.selectedContacts, [2,3]);
     }

     $scope.toggleContact2 = function(group){
         group.toggled = !group.toggled;
         var contactsIds = [];
          var url = Utils.getBaseURL() + "/groups/" + group.id;
          $http.get(url).then(function(resp) {
              $scope.response = resp;
              if(group.toggled){
                  for (var i = 0; i < resp.data.length; i++) {
                      pushUnique($scope.selectedContacts, resp.data[i].id);
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

     Groups.getGroups().then(function(resp) {
        //  $scope.response = resp;
         $scope.groups = resp.data;
     }, function(err) {
         $scope.response = err;
     })

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
         var selectedContactsIds = [];
         for (var i = 0; i < $scope.groups.length; i++) {
             if($scope.groups[i].toggled === true){
                 selectedContactsIds.push($scope.groups[i].id);
             }
         }
         if(selectedContactsIds.length === 1){
             $location.path("/group-edit/" + selectedContactsIds[0]);
         }
     }
     $scope.sendSV2 = function(){
         var selectedContactsIds = [];
         for (var i = 0; i < $scope.groups.length; i++) {
             if($scope.groups[i].toggled === true){
                 selectedContactsIds.push($scope.groups[i].id);
             }
         }
         Snapvotes.setContacts([]);
         Snapvotes.setGroups(selectedContactsIds);

         var dataJson = Snapvotes.getSnappvote();
         var url = Utils.getBaseURL() + '/snappvotes/out/' + Utils.getSVUserId();
         $http.post(url, dataJson).then(function(resp) {
            //  $scope.response = resp;
             $ionicPopup.alert({
                 title: 'Success',
                 template: 'Snappvote sent.'
             });
         }, function(err) {
             $scope.response = err;
             $ionicPopup.alert({
                 title: 'Error',
                 template: 'Something went wrong.'
             });
         })
     }
     $scope.goBack = function() {
         $ionicHistory.goBack();
     }
 })
 .controller('SvDetailCtrl', function($scope, $http, $stateParams, $ionicHistory, $ionicPopup, Utils, Snapvotes) {
     $scope.selected = -1;
     var svId = $stateParams.svId;
     Snapvotes.getSnappvoteById(svId).then(function(resp) {
         $scope.response = resp;
         snappvote = resp.data[0];
         $scope.selected = snappvote.voter_answer;
         $scope.img1 = snappvote.img_1;
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
             $ionicPopup.alert({
                      title: 'Success',
                      template: 'Snappvote sent.'
                  });
         }, function(err) {
             $scope.response = err;
             $ionicPopup.alert({
                      title: 'Error',
                      template: 'Something went wrong.'
                  });
         })
     }
     $scope.goBack = function() {
         $ionicHistory.goBack();
     }
 })
 .controller('GroupEditCtrl', function($scope, $ionicPopup, $ionicHistory, $stateParams, $http, $ionicHistory, Snapvotes, Utils, $location) {
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

     function getContactsForGroup(){
         var url = Utils.getBaseURL() + '/groups/' + groupId;
         $http.get(url).then(function(resp) {
             $scope.groupContacts = resp.data;
             $scope.response = resp;
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
              $location.path("/contacts");

          }, function(err) {
              $scope.response = err;
          })
        //  var url = Utils.getBaseURL() + '/groups/' + groupId + '/contacts';
         //
        //  $http.post(url, snappvote).then(function(resp) {
        //      $scope.response = resp;
        //      $ionicPopup.alert({
        //          title: 'Success',
        //          template: 'Snappvote sent.'
        //      });
        //  }, function(err) {
        //      $scope.response = err;
        //      $ionicPopup.alert({
        //          title: 'Error',
        //          template: 'Something went wrong.'
        //      });
        //  })
        //     var asd = [1, 2, 3];         var dataJson = {
        //      contacts_ids: asd
        //  };
        //  dataJson["contacts_ids"] = selectedContactsIds;

        //  var url = Utils.getBaseURL() + '/groups/' + groupId + '/contacts';
        //  $http.post(url, dataJson).then(function(resp) {
        //      $scope.response = resp;
        //  }, function(err) {
        //      $scope.response = err;
        //  })
        //  getContactsForGroup();
     }
     $scope.getCheckedFalse = function(asd){
         if(asd.username === "Gandalf"){
             return true;
         }
         else{
             return false;
         }
     }

     $scope.goBack = function() {
         $ionicHistory.goBack();
     }
 })
 .controller('RegisterCtrl', function($scope, $http, $ionicPopup, $ionicHistory, $location, $timeout, Utils) {
     $scope.selectedCountry = "";
     $scope.form = {};
     $scope.countries = countriesJson;
     $scope.register = function(){
         var counter = 0;
         for (var key in $scope.form) {
             if ($scope.form.hasOwnProperty(key)) {
                     counter++;
             }
         }
         if(counter != 4){
             $scope.isDisabled =false;
             $ionicPopup.alert({
                 title: 'Error',
                 template: 'All fields are mandatory.'
             });
         }
         else{
             var dataJson={};
             for(var key in $scope.form) dataJson[key]=$scope.form[key];
             var url = Utils.getBaseURL() + '/users';
             $http.post(url, dataJson).then(function(resp) {
                 Utils.setSVUserId(resp.data.id);
                 var popup = $ionicPopup.alert({
                     title: 'Success',
                     template: 'User registered.'
                 });
                 $timeout(function(){
                     popup.close();
                     $location.path('/home');
                 }, 2000);
                 $scope.response = resp;
             }, function(err) {
                 $ionicPopup.alert({
                     title: 'Error',
                     template: 'Something went wrong '
                 });
                 $scope.response = err;
             })
         }

     }
     $scope.goBack = function() {
         $ionicHistory.goBack();
     }
 })
 .controller('DevLoginCtrl', function($scope, $http, $ionicPopup, $location, $ionicHistory, Utils) {
     $scope.contacts = [];
     var url = Utils.getBaseURL() +  '/users';
     $http.get(url).then(function(resp) {
         $scope.contacts = resp.data;
     }, function(err) {
     })
     $scope.login = function(userId){
         Utils.setSVUserId(userId);
         $location.path("/home");
     }
     $scope.goBack = function() {
         $ionicHistory.goBack();
     }
 });
