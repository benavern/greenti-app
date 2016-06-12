angular.module('starter.controllers', [])


/**
 * HOME ctrl
 */
.controller('HomeCtrl', function($scope, $ionicActionSheet, $ionicPopup) {
  //Social Sharing
  $scope.shareOptions = [
    { template: "J'ai réduit mes déchets de 12 kg grâce à ma poubelle intelligente!", title: "-12kg de déchets" },
    { template: "J'ai recyclé assez de métal pour créer un vélo. génial non?", title: "Mon premier vélo"},
  ];


  //fake shared success ...
  $scope.showAlert = function(y) {
    var alertPopup = $ionicPopup.alert($scope.shareOptions[y]);
  };

 $scope.shareBtn = function(x) {
   $ionicActionSheet.show({
     titleText: 'Partager via...' ,
     buttons: [
        { text: '<i class="icon ion-social-facebook positive"></i> Facebook'},
        { text: '<i class="icon ion-social-twitter calm"></i> Twitter' },
      ],
     cancelText: 'Annuler',
     cancel: function() {
        console.log('CANCELLED');
      },
     buttonClicked: function(i) {
       $scope.showAlert(x)
       return true;
     }
   });

 };

})





/**
 * LIST ctrl
 */
.controller('ListCtrl', function($scope) {
  //list of items
  $scope.list = [
    { title: 'Cristaline', code: "854653468463505", checked: true },
    { title: 'Yaourts nature', code: "654084354168740", checked: false },
  ];

})

