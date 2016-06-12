angular.module('starter.controllers', ['starter.services', 'ionic'])


/**
 * HOME ctrl
 */
.controller('HomeCtrl', function($scope, $ionicActionSheet, $ionicPopup, shoppingListFactory) {
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
       $scope.showAlert(x);
       return true;
     }
   });

 };

 //list of items
  $scope.list = []
  $scope.listLoading = true
  shoppingListFactory.fetch().then(function(data) { // fetch and get new value
    $scope.list = shoppingListFactory.get()
    $scope.listLoading = false;
    
  })

})





/**
 * LIST ctrl
 */
.controller('ListCtrl', function($scope, $ionicModal, shoppingListFactory ) {
  // default delete hidden.
  $scope.isDeleteActive = false;

  //list of items
  $scope.list = [];
  $scope.listLoading = true;
  $scope.refresh = function(){
    shoppingListFactory.fetch().then(function(data) { // fetch and get new value
      $scope.list = shoppingListFactory.get();
      $scope.listLoading = false;
      $scope.$broadcast('scroll.refreshComplete');
    })
  }
  $scope.refresh();

  $scope.delete = function(index){
    $scope.list.splice(index, 1);
  }


  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  $scope.createItem = function(newItem) {
    $scope.list.push(newItem);
    $scope.closeModal();
    $scope.newItem = {};

  }
  
})

