angular.module('starter.services', [])

.factory('shoppingListFactory', function( $http ) {

    var shoppingList = {
        list : [],

    } 
    
    /**
     * fetch  : GET Method to populate the list array
     * Return : promise from api call : the full list up to date
     */
    shoppingList.fetch = function() {
        return $http.get('http://greenti.bzh/ext_ws/?list')
            .then( function(res) { 
                shoppingList.list = res.data; 
                return shoppingList.list; 
            });
        
    }

    /**
     * update : POST : Methode to add elements to the list
     * args   : data : The new list to be saved (should be a add & a delete function but this is more simple for a demo ...)
     * Return : promise from api call : the full list up to date
     */
    shoppingList.update = function(data) {
        return $http.post('http://greenti.bzh/ext_ws/', data, {
              headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
                .then( function(res) {
                    shoppingList.list = res.data;
                    return shoppingList.list;
                });
    }


    return shoppingList;


})