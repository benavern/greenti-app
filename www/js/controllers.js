angular.module('starter.controllers', ['starter.services', 'ionic', 'chart.js'])


/**
 * HOME ctrl
 */
.controller('HomeCtrl', function($scope, $ionicActionSheet, $ionicPopup, shoppingListFactory, $cordovaSocialSharing) {
  //Social Sharing
  $scope.shareOptions = [
    { template: "J'ai réduit mes déchets de 12 kg grâce à ma poubelle intelligente!", title: "-12kg de déchets" },
    { template: "J'ai recyclé assez de métal pour créer un vélo. génial non?", title: "Mon premier vélo"},
  ];

  //fake shared success ...
  $scope.showAlert = function(y) {
    // var alertPopup = $ionicPopup.alert($scope.shareOptions[y]);
    $cordovaSocialSharing.share(
      $scope.shareOptions[y].template, //message
      $scope.shareOptions[y].title, //subject
      null, //file
      "http://greenti.bzh/" //link
    )
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


 $scope.chart= {
   labels : ["Janv", "", "", "Avr", "", "", "Juil"],
   series : ['Cuisine', 'Garage'],
   colours : ['#83bf3f', '#cccccc'],
   data : [
        [6.5, 5.9, 8.0, 8.1, 5.6, 5.5, 4.0],
        [2.8, 4.8, 4.0, 1.9, 8.6, 2.7, 9.0]
    ]
 }





 //list of items
  $scope.shoppingList = shoppingListFactory;
  $scope.listLoading = true
  
  $scope.$on("$ionicView.enter", function(event, data){
    // handle event
    $scope.shoppingList.fetch()
      .then(function(data) { // fetch and get new value
        $scope.listLoading = false;
        
      })
  });


})





/**
 * LIST ctrl
 */
.controller('ListCtrl', function($scope, $ionicModal, shoppingListFactory ) {
  // default delete hidden.
  $scope.isDeleteActive = false;

  //list of items
  $scope.shoppingList = shoppingListFactory;
  $scope.listLoading = true;


  /**
   * Refresh method that will be called on pull to refresh & on view enter.
   */
  $scope.refresh = function(){
    $scope.shoppingList.fetch()
      .then(function(data) {
        $scope.listLoading = false; // loader hide
        $scope.$broadcast('scroll.refreshComplete'); // pull to refresh OK
      })

  }



  $scope.delete = function(index){
    $scope.shoppingList.list.splice(index, 1);
    $scope.listLoading = true;
    $scope.shoppingList.update($scope.shoppingList.list).then(function(data){
      $scope.shoppingList.list = data;
      $scope.listLoading = false;
    });
    
  }

  
  $scope.add = function(newItem) {
    $scope.shoppingList.list.push(newItem);
    $scope.listLoading = true;
    $scope.shoppingList.update($scope.shoppingList.list).then(function(data){
      $scope.shoppingList.list = data;
      $scope.listLoading = false;
    });
    $scope.closeModal();

  }

  
   $scope.toggleCheck = function(index) {
     $scope.shoppingList.list[index].checked = !$scope.shoppingList.list[index].checked;
     $scope.listLoading = true;     
     $scope.shoppingList.update($scope.shoppingList.list).then(function(data){
      $scope.shoppingList.list = data;
      $scope.listLoading = false;
      
    });
   }



  // modal 
  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.newItem = {};
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });


  
   /**
    * On view enter, refresh shoppinglist data
    */
   $scope.$on("$ionicView.enter", function(event, data){
    $scope.refresh();
   
  });
  
})

