(function() {
    'use strict';

    angular
        .module('amarbike')
        .controller('CategoyAddController', CategoyAddController);

    CategoyAddController.$inject = ['$rootScope', '$scope', '$http', '$location', 'urls', 'Auth'];

    function CategoyAddController($rootScope, $scope, $http, $location, urls, Auth) {

        //Route Initialize......................................
        var init = function() {
            //Getting All Category....................
            $http.get(urls.GET_CATEGORY)
                 .success(function(res) {
                    $scope.categories = res;
                    console.log(res);
                 })
                 .error(function(err) {
                    console.log(err);
                })

            $rootScope.navone = true;
        };

        init();
        
       //Add A new Category Type...............................

        $scope.set_category = function() {
            var data = {
                'type' : $scope.new_category
            };
            Auth.setcategory(urls.ADD_CATEGORY, data, 
                function(res) {
                    swal("Done", "New Type Added");
                    init();
                },
                function(err) {
                    swal("Type Already Defined");
                }
            )

        };

        //Add a new Subcategory with correspondin Category.........................

        $scope.set_sub_category = function() {

            var data = {
                'type' : $scope.address.category.type.toString(),
                'subtype' : $scope.address.subcategory
            };

            Auth.setcategory(urls.ADD_SUB_CATEGORY, data, 
                function(res) {
                    swal("Done", "New Subcategory Added");
                },
                function(err) {
                    swal("Error Occurred");
                }
            );
        };
    }

}());