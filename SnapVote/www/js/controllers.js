angular.module('starter.controllers', [])
.controller('LoginCtrl', function($scope, $ionicPlatform, ionicDatePicker, $cordovaLocalNotification, $http, $location, $ionicPopup, Options, Snapvotes, Camera2, $timeout) {
     $scope.notfTest = function(){
         var token = window.localStorage['pushtoken'];

         var url = "https://api.ionic.io/push/notifications";
         var data = {
             "tokens": [token],
             "profile": "test",
             "notification":{
                 "title": "hi",
                 "message": "Hello world!",
                 "android": {
                     "title": "Hey",
                     "message": "Hello Android!",
                     "badge":1

                 },
                 "ios": {
                     "title": "Howdy",
                     "message": "Hello iOS!",
                     "sound":"ping.aiff",
                     "badge":1

                 }
             }
         };
         var headers = {'Content-Type': 'application/json', 'X-Ionic-Application-Id': '98536fd6', 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNzdhYWY3Ni03ZDAwLTQ4ZjUtODkwZi1mMjMwMWE5NmVkZmQifQ.MAEkeVMmHKHsScZ3XrhBZABpMI-nNwx6BEIU3WN7TKk'};
         $http({
             method : 'POST',
             url : url,
             headers: {
                 'Content-Type' : 'application/json',
                 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNzdhYWY3Ni03ZDAwLTQ4ZjUtODkwZi1mMjMwMWE5NmVkZmQifQ.MAEkeVMmHKHsScZ3XrhBZABpMI-nNwx6BEIU3WN7TKk'
             },
             data : data
         }).success(function(data, status, headers, config)
         {
             $scope.response = data;
             $cordovaLocalNotification.schedule({
      id: 1,
      title: 'Hello !',
      text: "Snapvote notification",
      data: {
        customProperty: 'custom value'
      }
    }).then(function (result) {
      console.log('Notification 1 triggered');
    });
         }).
         error(function(data, status, headers, config)
         {
             $scope.response = data;
         });
     }

    $scope.optionsShown = false;
    $scope.openOptions = function(){
        $scope.optionsShown = true;
    }
    $scope.closeOptions = function(){
        $scope.optionsShown = false;
    }
    $scope.goHome = function(){
        $location.path("/home/outgoing");
    };
    $scope.test = function(){
        var popup = $ionicPopup.show({
            title: 'Oops !',
            template: 'There was an error fetching your outgoing SnapVotes.',
            cssClass: 'popup-error',
            buttons: [
                { text: 'OK' }
            ]
        });
    }

    //This is the success callback from the login method
    var fbLoginSuccess = function(response) {
      if (!response.authResponse){
        fbLoginError("Cannot find the authResponse");
        return;
      }

      var authResponse = response.authResponse;

      getFacebookProfileInfo(authResponse)
      .then(function(profileInfo) {

        $ionicLoading.hide();
        $state.go('app.home');

      }, function(fail){
        //fail get profile info
        console.log('profile info fail', fail);
      });
    };


    //This is the fail callback from the login method
    var fbLoginError = function(error){
      console.log('fbLoginError', error);
      $ionicLoading.hide();
    };

    $scope.facebookSignIn = function() {

      facebookConnectPlugin.getLoginStatus(function(success){
          console.log('getLoginStatus', success.status);

              $ionicLoading.show({
            template: 'Logging in...'
          });

          facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      });
    };
})
.controller('EditProfileCtrl', function($scope, $http, $location, $ionicPopup, $timeout, $ionicHistory, Options, Snapvotes, Utils) {
    $scope.form = {};
     var url =  Utils.getBaseURL() + "/users/" + Utils.getSVUserId();
     $http.get(url).then(function(resp) {
         $scope.form.name = resp.data[0].username;
         $scope.form.email = resp.data[0].email;
         $scope.form.phone = resp.data[0].phone;

         $scope.userId = resp.data[0].username;
     }, function(err) {
         $scope.response = err;
     })
    $scope.editprofile = function(){
        if(Utils.validateEmail($scope.form.email)){
            var url = Utils.getBaseURL() + '/useredit/' + Utils.getSVUserId();
            var dataJson = {};
            dataJson['name'] = $scope.form.name;
            dataJson['email'] = $scope.form.email;
            $http.post(url, dataJson).then(function(resp) {

            }, function(err) {

            })
            var popup = $ionicPopup.show({
                title: 'Success',
                template: '<div class="popup-content">Profile edited.</div>'
            });
            $timeout(function(){
                popup.close();
                $location.path('/home');
            }, 2000);
        }
        else{
            var popup = $ionicPopup.show({
                title: 'Oops !',
                template: 'Invalid email.',
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
})
.controller('HomeCtrl', function($scope, $http, $ionicHistory, $location, $ionicPopup, $timeout, Utils, Snapvotes, Options) {
    var outgoingSV = [];
    var incomingSV = [];
    // $location.path('/sv-detail/13');

    $scope.optionsShown = false;
    $scope.openOptions = function(){
        $scope.optionsShown = true;
    }
    $scope.closeOptions = function(){
        $scope.optionsShown = false;
    }
    $scope.test = function(svId){
        console.log(svId);
        $location.path('/sv-detail/' + svId);
    }
    $scope.onSwipeLeft = function(snapvote, index){
        snapvote.deleted = !snapvote.deleted;
        console.log(outgoingSV.length);
        // $scope.outgoing.splice(index, 1);
        console.log('asd');
    }
    //  var url =  Utils.getBaseURL() + "/users/" + Utils.getSVUserId();
    //  $http.get(url).then(function(resp) {
    //      $scope.userId = resp.data[0].username;
    //  }, function(err) {
    //      $scope.response = err;
    //  })

    Snapvotes.getOutgoing().then(function(resp) {
        var expired = [];

        for (var i = 0; i < resp.data.length; i++) {
            var snapvote = resp.data[i];
            var expireDate = new Date(snapvote.expire_date);
            snapvote.expired = expireDate < new Date();
            snapvote.date_created = Utils.parseDateTime(snapvote.date_created);
            if(!snapvote.expired){
                outgoingSV.push(snapvote);
            }
            else{
                expired.push(snapvote);
            }
        }

        outgoingSV.sort(function(a, b){
            return a.date_created>b.date_created ? -1 : a.date_created<b.date_created ? 1 : 0;
        });

        outgoingSV = outgoingSV.concat(expired);
        $scope.outgoing = outgoingSV.slice(0,3);

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
        //  $scope.response = resp;
        var expired = [];

        for (var i = 0; i < resp.data.length; i++) {
            var snapvote = resp.data[i];
            var asnwered = snapvote.answer_id === -1;
            var expireDate = new Date(snapvote.expire_date);
            $scope.response = expireDate;
            var invalid = expireDate < new Date();
            snapvote.expired = !asnwered;
            snapvote.date_created = Utils.parseDateTime(snapvote.date_created);
            if(!invalid){
                if(!snapvote.expired){
                    incomingSV.push(snapvote);
                }
                else{
                    expired.push(snapvote);
                }
            }
        }

        incomingSV.sort(function(a, b){
            return a.date_created>b.date_created ? -1 : a.date_created<b.date_created ? 1 : 0;
        });

        incomingSV = incomingSV.concat(expired);
        $scope.incoming = incomingSV.slice(0,3);


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
    $scope.loadOutgoing = function(){
        $scope.outgoing = outgoingSV.slice(0, $scope.outgoing.length + 3);
    }
    $scope.loadIncoming = function(){
        $scope.incoming = incomingSV.slice(0, $scope.incoming.length + 3);
    }
    $scope.toggleSV = function(snapvote){
        snapvote.toggled = !snapvote.toggled;
    }
})

 .controller('ChooseTypeCtrl', function($scope, $ionicPopup, $http, $ionicHistory, Options) {
     $scope.optionsShown = false;
     $scope.openOptions = function(){
         $scope.optionsShown = true;
     }
     $scope.closeOptions = function(){
         $scope.optionsShown = false;
     }
     $scope.goBack = function() {
         $ionicHistory.goBack();
     }
 })

 .controller('NewSnapvoteCtrl', function($scope, ionicDatePicker, $ionicPopup, $ionicHistory, $stateParams, $ionicScrollDelegate, $location, Camera2, Snapvotes, Options, Utils) {
     $scope.type = $stateParams.id;
     $scope.inputs = {};
     $scope.items = [];
     $scope.answer1 = "...";
     $scope.answer2 = "...";
     $scope.answersChoose = 1;
     $scope.asdfg = 0;
     $scope.answersHidden = true;
     $scope.firstAnswers = ['Yes', 'Cool', 'Left', 'Add..'];
     $scope.secondAnswers = ['No', 'Nope', 'Right', 'Add..'];
     $scope.charsLeft = "";
     $scope.answers = [
         ['Yes', 'No'],
         ['Cool', 'Nope'],
         ['Left', 'Right'],
         ['Add..', 'Add..']
     ];
     $scope.optionsShown = false;

     $scope.openOptions = function(){
         $scope.optionsShown = true;
     }
     $scope.closeOptions = function(){
         $scope.optionsShown = false;
     }

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
             Utils.saveShit(imageURI);
         }, function(err) {
             console.log(err);
         });
     }

     $scope.createSnapvote = function(){
         console.log($scope.inputs.question);


     };

     $scope.toggleAnswers = function(){
         $scope.answersHidden = !$scope.answersHidden;
     };

     $scope.$watch('inputs.answer_1', function(newValue, oldValue){


    });
    $scope.updateCharsLeft = function(){
            var len = $scope.inputs.answer_1.length;
            $scope.charsLeft = 8 - len;
    }
     $scope.updateAnswers = function(index, answerIndex){
         if(answerIndex === 0){
             if(index === $scope.firstAnswers.length-1){

                 var myPopup = $ionicPopup.show({
                     template: '<input type="text" maxlength="8" ng-model="inputs.answer_1" ng-change="updateCharsLeft()" ng-trim="false"><div style="position:relative; left:85%; top:-27px; height: 20px; width:30px;">{{charsLeft}}</div>',
                     title: 'Add your answer',
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
                         $scope.firstAnswers.splice(0,0,$scope.inputs.answer_1);
                     }
                     $scope.inputs.answer_1 = "";
                     $scope.charsLeft = "";

                 })
             }
             else{
                 $scope.answersHidden = !$scope.answersHidden;
                 $scope.answer1 = $scope.firstAnswers[index];

             }
         }
         if(answerIndex === 1){
             if(index === $scope.secondAnswers.length-1){

                 var myPopup = $ionicPopup.show({
                     template: '<input type="text" maxlength="8" ng-model="inputs.answer_1" ng-change="updateCharsLeft()" ng-trim="false"><div style="position:relative; left:85%; top:-27px; height: 20px; width:30px;">{{charsLeft}}</div>',
                     title: 'Add your answer',
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
                         $scope.secondAnswers.splice(0,0,$scope.inputs.answer_1);
                     }
                     $scope.inputs.answer_1 = "";
                     $scope.charsLeft = "";

                 })
             }
             else{
                 $scope.answersHidden = !$scope.answersHidden;
                 $scope.answer2 = $scope.secondAnswers[index];

             }
         }
     };
     $scope.goToContacts = function(){
         console.log($scope.items.length);
         var valid = true;
         if($scope.items.length === 0){
             valid = false;
         }
         console.log($scope.inputs.length);
         var counter = 0;
         for (var key in $scope.inputs) {
             console.log(key);
             if ($scope.inputs.hasOwnProperty(key)) {
                     counter++;
             }
         }
         if(counter === 0){
             valid = false;
         }
         if($scope.answer1 == "..." || $scope.answer2 == "..."){
             valid = false;
         }
         if($scope.asdfg == 0){
             valid = false;
         }

         if(valid){
             if($scope.type == 2){
                 Snapvotes.saveSnapvote($scope.inputs.question, $scope.items[0], $scope.items[1], $scope.answer1, $scope.answer2, $scope.asdfg);
             }
             else{
                 Snapvotes.saveSnapvote($scope.inputs.question, $scope.items[0], "...", $scope.answer1, $scope.answer2, $scope.asdfg);
             }
             $location.path('/contacts/1');
         }else {

             var popup = $ionicPopup.show({
                 title: 'Oops !',
                 template: 'Please enter all fields',
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
     var asdf = {
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
         from: new Date(), //Optional
         to: new Date(2018, 8, 25),  //Optional
         callback: function (val) {
             $scope.asdfg = new Date(val);
           console.log('Return value from the datepicker popup is : ' + val, new Date(val));  //Mandatory
         },
         dateFormat: 'dd-MM-yyyy', //Optional
         closeOnSelect: true, //Optional
     };
     $scope.openDatePicker = function(){
       ionicDatePicker.openDatePicker(asdf);
     };
    //  var datePickerCallback = function (val) {
    //      if (typeof(val) === 'undefined') {
    //          //console.log('No date selected');
    //      } else {
    //          //console.log('Selected date is : ', val);
    //          $scope.selectedDate = val;
    //      }
    //  };
    //  $scope.datepickerObject = {
    //      titleLabel: 'Voting Period',  //Optional
    //      closeLabel: 'Close',  //Optional
    //      setLabel: 'Set',  //Optional
    //      setButtonType : 'button-assertive',  //Optional
    //      todayButtonType : 'button-assertive',  //Optional
    //      closeButtonType : 'button-assertive',  //Optional
    //      inputDate: new Date(),  //Optional
    //      mondayFirst: true,  //Optional
    //      templateType: 'popup', //Optional
    //      showTodayButton: 'true', //Optional
    //      modalHeaderColor: 'bar-positive', //Optional
    //      modalFooterColor: 'bar-positive', //Optional
    //      from: new Date((new Date()).valueOf() - 1000*60*60*24), //Optional
    //      to: new Date(2018, 8, 25),  //Optional
    //      callback: function (val) {  //Mandatory
    //          datePickerCallback(val);
    //      },
    //      dateFormat: 'dd-MM-yyyy', //Optional
    //      closeOnSelect: false, //Optional
    //  };
 })

 .controller('ContactsCtrl', function($scope, $http, $location, $ionicPopup, $stateParams, $ionicHistory, $timeout, Users, Groups, Utils, Snapvotes, Options) {
     $scope.$on('$stateChangeSuccess', function(e, toState) {
         if(toState.name === 'contacts') {

         }
     });
     $scope.items = [];
     $scope.hack = 0;
    //  Snapvotes.getSnappvoteById(27).then(function(resp) {
    //      console.log(resp.data[0].img_1);
    //  }, function(err) {
    //      $scope.response = err;
    //  });

     $scope.items[0] = Utils.getShit();
     console.log(Utils.getShit());


     $scope.isGroupShown = function(){
         return true;
     }
     $scope.mysrc = "./img/icon1.png";
     var asd = $stateParams.type;
     $scope.type2 = asd;
     $scope.type = 0;
     $scope.selectedContacts = [];
     $scope.contacts = [];
     $scope.groups = [];
     $scope.groups = [];
     $scope.data = {};
     $scope.sendSV = true;
     getContacts();
     $scope.optionsShown = false;
     $scope.openOptions = function(){
         $scope.optionsShown = true;
     }
     $scope.closeOptions = function(){
         $scope.optionsShown = false;
     }

     Users.getAllUsers().then(function(resp) {
        //  $scope.contacts = resp.data;

        //   $scope.response = resp;
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
     $scope.toggleContact2 = function(contact){
         $scope.hack = 1;
         if(!contact.registered){
             contact.toggled = !contact.toggled;
         }
     }
     $scope.invite = function(){
         if($scope.hack == 0){
             var popup = $ionicPopup.show({
                 title: 'Oops..',
                 template: '<div class="popup-content">No contacts selected.</div>'
             });
             $timeout(function(){
                 popup.close();
             }, 2500);
         }
         else{
             var popup = $ionicPopup.show({
                 title: 'Success',
                 template: '<div class="popup-content">Invites sent !</div>'
             });
             $timeout(function(){
                 popup.close();
             }, 2500);
         }

     }
     $scope.toggleGroup = function(group){
         group.toggled = !group.toggled;
         var url = Utils.getBaseURL() + "/groups/" + group.id;
         $http.get(url).then(function(resp) {
            //  $scope.response = resp;
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
        //  for (var i = 0; i < $scope.selectedContacts.length; i++) {
        //      console.log($scope.selectedContacts[i]);
        //  }
         Snapvotes.setContacts($scope.selectedContacts);
         var dataJson2 = Snapvotes.getSnappvote();
         var jsonPrint = {};

         for (var variable in dataJson2) {
             if (dataJson2.hasOwnProperty(variable)) {
                 if(variable != 'img_1' && variable != 'img_2'){
                     jsonPrint[variable] = dataJson2[variable];
                     console.log(variable + "->" + dataJson2[variable]);
                 }
             }
         }

         $scope.response = $scope.selectedContacts.length;
         if($scope.selectedContacts.length === 0){
             var popup = $ionicPopup.show({
                 title: 'Oops !',
                 template: 'No contacts selected.',
                 cssClass: 'popup-error',
                 buttons: [
                     { text: 'OK' }
                 ]
             });
         }
         else{
             //  $scope.response = jsonPrint + " " + Utils.getSVUserId();
              var url = Utils.getBaseURL() + '/snappvotes/out/' + Utils.getSVUserId();
              $http.post(url, dataJson2).then(function(resp) {
                  $scope.response = resp.data;
                  var popup = $ionicPopup.show({
                      title: 'SnapVote sent',
                      template: '<div class="popup-content-2">Awesome ! Your SnapVote is sent successfully !</div>'
                  });
                  $timeout(function(){
                      popup.close();
                     //$location.path('/home');
                 }, 1000);
              }, function(err) {

                   $scope.response = err.data;
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
         var contactNumbers = [];
         //cordova contacts plugins
         //https://github.com/dbaq/cordova-plugin-contacts-phone-numbers
         navigator.contactsPhoneNumbers.list(function(contacts) {
             var contact = {};
            //  $scope.contacts = contacts;
             $scope.$digest();
             //console.log(contacts.length);
             for(var i = 0; i < contacts.length; i++) {
                //  console.log(contacts[i].id + " - " + contacts[i].displayName);
                 var phone = contacts[i].phoneNumbers[0];
                //  console.log(phone.type + "  " + phone.number + " (" + phone.normalizedNumber+ ")");
                 var contact = {};
                 contact.username = contacts[i].displayName;
                 contact.registered = false;
                 phone.number = phone.number.replace('(','');
                 phone.number = phone.number.replace(')','');
                 phone.number = phone.number.replace('-','');
                 phone.number = phone.number.replace(' ','');
                 phone.number = phone.number.replace(' ','');
                 phone.number = phone.number.replace(' ','');
                 phone.number = phone.number.replace(' ','');
                 phone.number = phone.number.replace(' ','');
                 phone.number = phone.number.replace(' ','');
                 phone.number = phone.number.replace(' ','');
                 phone.number = phone.number.replace('-','');
                 phone.number = phone.number.replace('-','');
                 phone.number = phone.number.replace('-','');
                 var phonestr = phone.number + "";
                 var lastFive = phonestr.substr(phonestr.length - 3);
                 $scope.response = $scope.response + " " + contacts[i].displayName + " -> " + phone.number;

                 contactNumbers.push(phone.number);
                 $scope.contacts.push(contact);
                //  $scope.response = contactNumbers;
                 //console.log(phone.number);
                //  for (var variable in phone) {
                //      if (phone.hasOwnProperty(variable)) {
                //          console.log(variable + "->" + phone[variable]);
                //      }
                //  }
             }
             var dataJson = {};//Snapvotes.getSnappvote();
             dataJson['contacts_ids'] = contactNumbers;
             var url = Utils.getBaseURL() + '/asd';
             $http.post(url, dataJson).then(function(resp) {
                 $scope.response = resp.data;
                 for (var i = 0; i < resp.data.length; i++) {
                     if (resp.data[i] != "") {
                         $scope.contacts[i].registered = true;
                         $scope.contacts[i].id = resp.data[i].id;
                     }
                    //  console.log(resp.data[i]);
                    //  if(resp.data[i] === {}){
                    //  }
                 }
                // $scope.response = resp;
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
             for (var i = 0; i < contactNumbers.length; i++) {
                //  console.log(contactNumbers[i]);
             }
         }, function(error) {
             console.error(error);
         });

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
                 template: 'Select 1 group to edit',
                 cssClass: 'popup-error',
                 buttons: [
                     { text: 'OK' }
                 ]
             });
         }
     }
     $scope.removeGroup = function(index){
         $scope.groups.splice(index, 1);
     }
     $scope.goBack = function() {
         $ionicHistory.goBack();
     }
 })
 .controller('SvDetailCtrl', function($scope, $http, $stateParams, $ionicHistory, $ionicPopup, $timeout, $location, Utils, Snapvotes, Options) {
     $scope.selected = -1;
     $scope.type = 1;
     var svId = $stateParams.svId;
     Snapvotes.getSnappvoteById(svId).then(function(resp) {
         $scope.response = resp.data;
         snappvote = resp.data[0];
         $scope.selected =  snappvote.voter_answer;
         $scope.img1 = snappvote.img_1;
         $scope.img2 = snappvote.img_2;
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
     $scope.optionsShown = false;
     $scope.openOptions = function(){
         $scope.optionsShown = true;
     }
     $scope.closeOptions = function(){
         $scope.optionsShown = false;
     }
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
 })
 .controller('GroupEditCtrl', function($scope, $ionicPopup, $ionicHistory, $stateParams, $http, $ionicHistory, Snapvotes, Utils, $location, $timeout, Options) {
     var groupId = $stateParams.id;
     $scope.contacts = [];
     $scope.groupContacts = [];
     $scope.optionsShown = false;
     $scope.openOptions = function(){
         $scope.optionsShown = true;
     }
     $scope.closeOptions = function(){
         $scope.optionsShown = false;
     }
     getContacts();
    //  getContactsForGroup();

     $scope.toggleContact = function(contact){
         if(contact.registered){
             contact.toggled = !contact.toggled;

         }
     }
     function getContacts(){
         var contactNumbers = [];
         //cordova contacts plugins
         //https://github.com/dbaq/cordova-plugin-contacts-phone-numbers
         navigator.contactsPhoneNumbers.list(function(contacts) {
             var contact = {};
            //  $scope.contacts = contacts;
             $scope.$digest();
             console.log(contacts.length);
             for(var i = 0; i < contacts.length; i++) {
                //  console.log(contacts[i].id + " - " + contacts[i].displayName);
                 var phone = contacts[i].phoneNumbers[0];
                //  console.log(phone.type + "  " + phone.number + " (" + phone.normalizedNumber+ ")");
                 var contact = {};
                 contact.username = contacts[i].displayName;
                 contact.registered = false;
                 phone.number = phone.number.replace('(','');
                 phone.number = phone.number.replace(')','');
                 phone.number = phone.number.replace('-','');
                 phone.number = phone.number.replace(' ','');
                 phone.number = phone.number.replace(' ','');
                 phone.number = phone.number.replace('-','');
                 phone.number = phone.number.replace('-','');
                 phone.number = phone.number.replace('-','');
                 contactNumbers.push(phone.number);
                 $scope.contacts.push(contact);

                 console.log(phone.number);
                //  for (var variable in phone) {
                //      if (phone.hasOwnProperty(variable)) {
                //          console.log(variable + "->" + phone[variable]);
                //      }
                //  }
             }
             var dataJson = {};//Snapvotes.getSnappvote();
             dataJson['contacts_ids'] = contactNumbers;
             var url = Utils.getBaseURL() + '/asd';
             $http.post(url, dataJson).then(function(resp) {
                 for (var i = 0; i < resp.data.length; i++) {
                     if (resp.data[i] != "") {
                         $scope.contacts[i].registered = true;
                         $scope.contacts[i].id = resp.data[i].id;
                     }
                    //  console.log(resp.data[i]);
                    //  if(resp.data[i] === {}){
                    //  }
                 }
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
                $scope.response = resp;
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
             for (var i = 0; i < contactNumbers.length; i++) {
                //  console.log(contactNumbers[i]);
             }
         }, function(error) {
             console.error(error);
         });

     }
    //  function getContacts(){
    //      var url = Utils.getBaseURL() + '/users';
    //      $http.get(url).then(function(resp) {
    //          $scope.contacts = resp.data;
            //  var url = Utils.getBaseURL() + '/groups/' + groupId;
            //  $http.get(url).then(function(resp) {
            //      $scope.groupContacts = resp.data;
            //      $scope.response = resp;
            //      for (var i = 0; i < $scope.contacts.length; i++) {
            //          for (var j = 0; j < $scope.groupContacts.length; j++) {
            //              if($scope.contacts[i].id === $scope.groupContacts[j].id){
            //                  $scope.contacts[i].toggled = true;
            //              }
            //          }
            //      }
            //  }, function(err) {
            //      $scope.response = err;
            //  })
    //      }, function(err) {
    //          $scope.response = err;
    //      })
    //  }

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
              if(selectedContactsIds.length > 0){
                  var popup = $ionicPopup.show({
                      title: 'Success',
                      template: '<div class="popup-content">Group edited.</div>'
                  });
                  $timeout(function(){
                      popup.close();
                      $ionicHistory.goBack();
                  }, 1500);
              }
              else{
                  $ionicHistory.goBack();
              }


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
 })
 .controller('RegisterCtrl', function($scope, $http, $ionicPopup, $ionicHistory, $location, $timeout, Utils) {
     $scope.countryName = "Country";
     $scope.dial_code = "";
     $scope.form = {};
     $scope.countries = countriesJson2;
     $scope.countrySelected = 0;
     var disabled = false;
     $scope.closeCountries = function(){
         $scope.type = 0;
     }
     $scope.register = function(){
         if(!disabled){

         var counter = 0;
         for (var key in $scope.form) {
             console.log(key);
             if ($scope.form.hasOwnProperty(key)) {
                     counter++;
             }
         }
         var asd = counter;
         var asdf = $scope.countryName == "Country";
         $scope.response = counter + " | " + asdf;
         if(counter != 3 || $scope.countryName == "Country"){
             $scope.isDisabled =false;
             var popup = $ionicPopup.show({
                 title: 'Oops !',
                 template: 'You have not answered all registration questions !',
                 cssClass: 'popup-error',
                 buttons: [
                     { text: 'OK' }
                 ]
             });
         }
         else{
             if(Utils.validateEmail($scope.form.email)){
                disabled = true;
                var dataJson={};
                $scope.form.country =  $scope.dial_code;
                $scope.form.phone = $scope.dial_code + $scope.form.phone;
                for(var key in $scope.form) dataJson[key]=$scope.form[key];
                var url = Utils.getBaseURL() + '/users';
                $http.post(url, dataJson).then(function(resp) {
                    Utils.setSVUserId(resp.data.id);
                    var popup = $ionicPopup.show({
                        title: 'Awesome',
                        template: '<div class="popup-content-2">Registration successfull. Enjoy SnapVote !</div>'
                    });
                    window.localStorage['registered'] = true;
                    $timeout(function(){
                        popup.close();
                       $location.path('/home');
                    }, 2000);
                    $scope.response = resp;
                }, function(err) {
                    disabled = false;
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

     else{
         var popup = $ionicPopup.show({
             title: 'Oops !',
             template: 'Invalid email !',
             cssClass: 'popup-error',
             buttons: [
                 { text: 'OK' }
             ]
         });
     }
}

 }}
    //  $scope.$watch('form.country.dial_code', function(newValue, oldValue){
    //          if($scope.form.phone){
    //              if(!oldValue){
    //                  if($scope.form.phone[0] == "0"){
    //                      $scope.form.phone = newValue + $scope.form.phone.substring(1, $scope.form.phone.length)//.replace(oldValue, newValue);
    //                  }
    //                  else{
    //                      $scope.form.phone = newValue + $scope.form.phone;//.replace(oldValue, newValue);
    //                  }
    //              }
    //              else {
    //                   $scope.form.phone = $scope.form.phone.replace(oldValue, newValue);
    //              }
    //          }
    // });
   //  $scope.$watch('dial_code', function(newValue, oldValue){
   //      //console.log(newValue);
   //      //console.log(oldValue);
   //      if($scope.form.phone){
   //          if(!oldValue){
   //              if($scope.form.phone[0] == "0"){
   //                  $scope.form.phone = newValue + $scope.form.phone.substring(1, $scope.form.phone.length)//.replace(oldValue, newValue);
   //              }
   //              else{
   //                  $scope.form.phone = newValue + $scope.form.phone;//.replace(oldValue, newValue);
   //              }
   //          }
   //          else {
   //               $scope.form.phone = $scope.form.phone.replace(oldValue, newValue);
   //          }
   //      }
   // });
     $scope.goBack = function() {
         $ionicHistory.goBack();
     }
     $scope.showCountries = function(){
        $scope.type = 1;
     }
     $scope.selectCountry = function(index){
         $scope.type = 0;
         $scope.countryName = $scope.countries[index].name;
         var dial_code2 = 0;
         for(var i = 0; i < countriesJson.length; i++)
         {
             if(countriesJson[i].name == $scope.countries[index].name)
             {
                 dial_code2 = countriesJson[i].dial_code;
             }
        }
        console.log(dial_code2);
         $scope.dial_code = dial_code2;
         $scope.countrySelected = 1;
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
