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
                    // console.log("list fetched", res.data);
                    angular.extend(list,res.data);
                    return list;
                })
        }
    }


})