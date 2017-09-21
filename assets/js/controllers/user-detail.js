(function() {
    'use strict';

    angular
        .module('amarbike')
        .controller('UserDetailController', UserDetailController);

    UserDetailController.$inject = ['$rootScope', '$scope', '$http', '$stateParams', '$window', '$location', '$state', 'urls', 'Auth'];

    function UserDetailController($rootScope, $scope, $http, $stateParams, $window, $location, $state, urls, Auth) {

        $scope.filteredTodos = [];
        $scope.currentPage = 1;
        $scope.numPerPage = 5;
        $scope.maxSize = 5;

       var init = function() {
             $http({
                method: 'GET',
                url: urls.USER_INFO + $stateParams.uid + '/places', 
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function(res) {
                $scope.userplaces = res.data;
                $scope.$watch('currentPage + numPerPage', function() {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                end = begin + $scope.numPerPage;
    
            $scope.filtereduserplc = $scope.userplaces.slice(begin, end);
         });

         $scope.numPages = function () {
            return Math.ceil($scope.userplaces.length / $scope.numPerPage);
        };
            }).error(function(err) {
                    console.log("err")
            });

            $rootScope.navone = true;

            $http({
                method: 'GET',
                url: urls.USER_INFO + $stateParams.uid,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(res) {
                $scope.userinfo = res.data[0];
            }).error(function() {

            });

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

        // $scope.openWindow = function(uCode) {
        //     $window.open('https://barikoi.com/#/code/place/' + uCode, 'BariKoi?', 'width=500,height=400');
        // }

    }

}());