angular.module('starter.services', [])
.factory('Options', function($ionicPopup){
    var popup;
    var shown = false;
    return{
        show: function(){
            shown = true;
            popup = $ionicPopup.show({
                title: 'OPTIONS',
                template: '<div class="options-item" ui-sref="home">Home<a class="ion-chevron-right options-arrow"></a></div><div class="options-item" ui-sref="contacts">Contacts<a class="ion-chevron-right options-arrow"></a></div><div class="options-item">Edit Profile<a class="ion-chevron-right options-arrow"></a></div><div class="options-item">Invite Friends<a class="ion-chevron-right options-arrow"></a></div><div class="options-item-bottom" ui-sref="login">Logout<a class="ion-chevron-right options-arrow"></a></div>',
                cssClass: 'popup-custom'
            });
        },
        close: function(){
            shown = false;
            popup.close();
        },
        isShown:function(){
            return shown;
        }
    }
})
.factory('Utils', function(){
    return{
        setSVUserId: function(userId){
            window.localStorage['svUserId'] = userId;
        },
        getSVUserId: function(){
            return window.localStorage['svUserId'];
        },
        getBaseURL: function(){
            // return 'http://creative2thoghts.com/test/v1';
            return 'http://localhost/test/v1';
        }
    }
})
.factory('Users', function($http, Utils){
    return{
        getAllUsers: function(){
            var url = Utils.getBaseURL() + '/users';
            return $http.get(url);
        }
    }
})
.factory('Snapvotes', function(Utils, $http){
    var snappvote = {};
    return{
        saveSnapvote: function(title, img1, img2, answer1, answer2, expireDate){
            snappvote ={
                title: title,
                img_1: img1,
                img_2: img2,
                answer_1: answer1,
                answer_2: answer2,
                expire_date: expireDate,
                contacts_ids: "",
                groups_ids: ""
            }
            snappvote['date_created'] = new Date();
        },
        setContacts: function(contactIds){
            snappvote['contacts_ids'] = contactIds;
        },
        setGroups: function(groupsId){
            snappvote['groups_ids'] = groupsId;
        },
        getSnappvote: function(){
            return snappvote;
        },
        getOutgoing: function(){
            var url = Utils.getBaseURL() + '/snappvotes/out/'+ Utils.getSVUserId();
            return $http.get(url);
        },
        getIncoming: function(){
            var url = Utils.getBaseURL() + '/snappvotes/in/' + Utils.getSVUserId();
            return $http.get(url);
        },
        getSnappvoteById: function(id){
            var url = Utils.getBaseURL() + "/snapvotes/" + id + "/" + Utils.getSVUserId();
            console.log(url);
            return $http.get(url);
        }
    };
})
.factory('Groups', function(Utils, $http){
    return{
        getGroups: function(){
            var url = Utils.getBaseURL() + "/users/" + Utils.getSVUserId() +"/groups";
            return $http.get(url);
        },
        getSnappvote: function(){
            return snappvote;
        },
        getOutgoing: function(){
            var url = Utils.getBaseURL() + '/snappvotes/out/'+ Utils.getSVUserId();
            return $http.get(url);
        },
        getIncoming: function(){
            var url = Utils.getBaseURL() + '/snappvotes/in/' + Utils.getSVUserId();
            return $http.get(url);
        }
    };
})
.factory('Camera2', ['$q', function($q) {
    return {
        getPicture: function(sourceType) {
            options = {
                quality:50,
                targetWidth: 1000,
                targetHeight:1400,
                saveToPhotoAlbum: false,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: sourceType
            };
            var q = $q.defer();
            navigator.camera.getPicture(function(result) {
                q.resolve(result);
            }, function(err) {
                q.reject(err);
            }, options);

            return q.promise;
        },
    }
}]);
