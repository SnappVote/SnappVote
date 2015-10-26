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
.factory('Users', function(Utils){
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
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
