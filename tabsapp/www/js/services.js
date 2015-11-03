angular.module('starter.services', [])
.factory('Utils', function(){
    return{
        setSVUserId: function(userId){
            window.localStorage['svUserId'] = userId;
        },
        getSVUserId: function(){
            return window.localStorage['svUserId'];
        },
        getBaseURL: function(){
            // return 'http://creative2thoughts.com/test/v1';
            return 'http://localhost/test/v1';
        }
    }
})
.factory('Users', function($http, Utils){
    return{
        getAllUsers: function(){
            var url = Utils.getBaseURL() + '/users';
            return $http.get(url);
        },
        setSVUserId: function(userId){
            window.localStorage['svUserId'] = userId;
        },
        getSVUserId: function(){
            return window.localStorage['svUserId'];
        },
        getBaseURL: function(){
            // return 'http://creative2thoughts.com/test/v1';
            return 'http://localhost/test/v1';
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
                expire_date: expireDate
            }
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
});
