angular.module('starter.controllers', [])
.controller('LoginCtrl', function($scope, $http, $location, $ionicPopup, $document, $timeout) {
    var domElement = $document.find('#asd');
        angular.element(domElement).triggerHandler('click');
    console.log('hello');
    $scope.goHome = function(){
        $location.path("/home/outgoing");
    };
    $scope.test = function(){
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
         $scope.response = resp;
         var snapvotes = resp.data;
         $scope.outgoing = snapvotes;
     }, function(err) {
         $scope.response = err;
     })

     Snapvotes.getIncoming().then(function(resp) {
         $scope.incoming = resp.data;
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
 .controller('NewSnapvoteCtrl', function($scope, $ionicPopup, $ionicHistory, $stateParams, Camera, Snapvotes) {
     var type = $stateParams.id;
     $scope.type = type;
     $scope.items = [];
     $scope.form = {};
     $scope.answer1 = "...";
     $scope.answer2 = "...";
     $scope.answersHidden = true;

     $scope.addPhoto = function(){
         Camera.getPicture().then(function(imageURI) {
             $scope.items.push(imageURI);
         }, function(err) {
             console.log(err);
         });
     };

     $scope.answers = [
         ['Yes', 'No'],
         ['Cool', 'Nope'],
         ['Left', 'Right']
     ];

     $scope.createSnapvote = function(){
         Snapvotes.saveSnapvote($scope.form.question, "img1", 'img2', $scope.answer1, $scope.answer2, 'expireDate');
     };

     $scope.toggleAnswers = function(){
         $scope.answersHidden = !$scope.answersHidden;
     }
     $scope.updateAnswers = function(index){
         $scope.answersHidden = !$scope.answersHidden;

         $scope.answer1 = $scope.answers[index][0];
         $scope.answer2 = $scope.answers[index][1];
     };
     $scope.goBack = function() {
         $ionicHistory.goBack();
     }

 })
 .controller('ContactsCtrl', function($scope, $http, $location, $ionicPopup, $ionicHistory, Users, Groups, Utils, Snapvotes) {
     $scope.type = 1;
     $scope.selected = 0;
     $scope.contacts = [];
     getContacts();

     $scope.isToggled = function(contact){
         return true;
     }
     $scope.switchTabs = function(type){
         $scope.type = type;
     };

     $scope.toggleContact = function(contact){
         contact.toggled = !contact.toggled;
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
             // $scope.response = "asdasd";
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

     $scope.toggleContact2 = function(contact){
         contact.toggled = !contact.toggled;
     }

     Groups.getGroups().then(function(resp) {
         $scope.groups = resp.data;
         $scope.response = resp;
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
 .controller('SvDetailCtrl', function($scope, $http, $stateParams, $ionicHistory, Utils, Snapvotes) {
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
         }, function(err) {
             $scope.response = err;
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
 .controller('RegisterCtrl', function($scope, $http, $ionicPopup, $ionicHistory, Utils) {
     $scope.selectedCountry = "Zimbabwe";
     $scope.form = {};
     $scope.form.country = "asd";
     $scope.countries = countriesJson;
     $scope.register = function(){
         var dataJson={};
         for(var key in $scope.form) dataJson[key]=$scope.form[key];
         var url = Utils.getBaseURL() + '/users';
         $http.post(url, dataJson).then(function(resp) {
             $ionicPopup.alert({
                 title: 'Success',
                 template: 'User registered.'
             });
             $scope.response = resp;
         }, function(err) {
             $ionicPopup.alert({
                 title: 'Error',
                 template: 'Something went wrong '
             });
             $scope.response = err;
         })
     }
     $scope.goBack = function() {
         $ionicHistory.goBack();
     }
 })
 .controller('DevLoginCtrl', function($scope, $http, $ionicPopup, $location, Utils) {
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
 });
