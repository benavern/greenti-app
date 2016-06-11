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


.controller('HomeCtrl', function($scope) {
  //Social Sharing
  $scope.shareOptions = [
    { message: "J'ai réduit mes déchets de 12 kg grâce à ma poubelle intelligente!", subject: "-12kg de déchets", url: "http://greenti.bzh/" },
    { message: "J'ai recyclé assez de métal pour créer un vélo. génial non?", subject: "Mon premier vélo", url: "http://greenti.bzh/" },
  ];

  $scope.share = function(btnId) {
    $cordovaSocialSharing.share($scope.shareOptions[btnId].message, $scope.shareOptions[btnId].subject, null, $scope.shareOptions[btnId].url);
  }


})
