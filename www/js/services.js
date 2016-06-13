angular.module('starter.services', [])

.factory('shoppingListFactory', function( $http ) {
    var list = [];

    return {
        get : function() {
            return list;
        },
        fetch: function() {
            return $http.get('http://greenti.bzh/ext_ws/?list')
                .then( function(res) {
                    list = res.data;
                    return list;
                })
        },
        update: function(data) {
            return $http.post('http://greenti.bzh/ext_ws/', data, {
              headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
                .then( function(res) {
                    list = res.data;
                    return list;
                })
        }
    }


})