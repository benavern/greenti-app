angular.module('starter.controllers', [])

// .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});

// })

.controller('ListCtrl', function($scope) {
  //list of items
  $scope.list = [
    { title: 'Cristaline', id: 1, checked: true },
    { title: 'Yaourts nature', id: 2, checked: false },
  ];
})
