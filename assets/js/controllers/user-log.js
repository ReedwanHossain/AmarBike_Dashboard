(function() {
    'use strict';

    angular
        .module('amarbike')
        .controller('UserLogController', UserLogController);

    UserLogController.$inject = ['$rootScope', '$scope', '$http', '$window', '$location', '$state', 'urls', 'Auth'];

    function UserLogController($rootScope, $scope, $http, $window, $location, $state, urls, Auth) {

        $scope.filteredTodos = [];
        $scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.maxSize = 5;

       var init = function() {
             $http({
                method: 'GET',
                url: urls.TOTAL_USER,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function(res) {
                    $scope.listusers = res.data.list_users;
                    $scope.$watch('currentPage + numPerPage', function() {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                end = begin + $scope.numPerPage;
    
            $scope.filteredusers = $scope.listusers.slice(begin, end);
         });

         $scope.numPages = function () {
            return Math.ceil($scope.listusers.length / $scope.numPerPage);
        };
            }).error(function(err) {
                    swal("");
            });

            $rootScope.navone = true;
       };

       init();

     
        //Remove Place from the List Permanenty..............................

        // $scope.delete_location = function(uCode) {
            
        //     Auth.delete_plc(urls.DELETE_PLACE, uCode, 
        //         function(res) {
        //             $state.go('location', {}, { reload: true });
        //         },
        //         function(err) {
        //             console.log(err);
        //         });
        // };

        $scope.user_detail = function(uid) {
             $location.path('/userdetail/'+uid);  
        }

    }

}());