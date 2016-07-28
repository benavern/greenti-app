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
        return $http.get('http://greenti.bzh/api/cart')
            .then( function(res) {
                shoppingList.list = res.data; 
                return shoppingList.list; 
            });
        
    }

    /**
     * get  : get the list data
     * Return : promise from api call : the full list up to date
     */
    shoppingList.get = function() {
        return shoppingList.list;
    }

    /**
     * add : POST : Methode to add elements to the list
     * args   : data : The new item to be added 
     * Return : promise from api call : the full list up to date
     */
    shoppingList.add = function(data) {
        return $http.post('http://greenti.bzh/api/cart/add', {"title": data.title, "code": data.code, "checked": data.checked}, {
              headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
                .then( function(res) {
                    shoppingList.list = res.data;
                    return shoppingList.list;
               },
                function(a){
                    console.log('whats the pb?', a)
                });
    }


    /**
     * delete : POST : Methode to delete elements to the list
     * args   : item : The new list to be saved (should be a add & a delete function but this is more simple for a demo ...)
     * Return : promise from api call : the full list up to date
     */
    shoppingList.delete = function(index) {
        return $http.post('http://greenti.bzh/api/cart/delete', {"item": index}, {
              headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
                .then( function(res) {
                    shoppingList.list = res.data;
                    return shoppingList.list;
                },
                function(a){
                    console.log('whats the pb?', a)
                });
    }


    /**
     * update : POST : Methode to update a specific element of the list
     * args   : item : the index of the item to update
     * args   : data : The new version of the item to update
     * Return : promise from api call : the full list up to date
     */
    shoppingList.update = function(index, data) {
        return $http.post('http://greenti.bzh/api/cart/update?item=' + index, {"title": data.title, "code": data.code, "checked": data.checked}, {
              headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
                .then( function(res) {
                    shoppingList.list = res.data;
                    return shoppingList.list;
                },
                function(a){
                    console.log('whats the pb?', a)
                });
    }


    return shoppingList;


})