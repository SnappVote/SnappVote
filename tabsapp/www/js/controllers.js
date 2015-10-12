angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
.controller('HomeCtrl', function($scope, $http, $location) {
    $scope.goHome = function(){
        $location.path("/tab/dash");
    }
    $scope.test = function(){
        var url = "http://localhost/api/v1/users";

        $http.post(url, {}).then(function(resp) {
console.log(resp); }, function(err) {
   console.error('ERR', err);
   // err.status will contain the status code
 })
    }
})
.controller('RegisterCtrl', function($scope,$http) {

})
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
