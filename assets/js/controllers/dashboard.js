(function() {
    'use strict';

    angular
        .module('amarbike')
        .controller('DashController', DashController);

    DashController.$inject = ['$rootScope', '$scope', '$http', '$location', 'urls', 'Auth'];

    function DashController($rootScope, $scope, $http, $location, urls, Auth) {
       
       //Route Initialize.............................................

       var init = function() {
          $rootScope.navone = true;

           $http({
                        method: 'GET',
                        url: urls.TOTAL_RIDE,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function(res) {
                      $scope.total_ride = res;
                    }).error(function(err) {

                    }); 

                    $http({
                        method: 'GET',
                        url: urls.TOTAL_RIDER,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function(res) {
                      $scope.total_rider = res;
                    }).error(function(err) {

                    }); 

                    $http({
                        method: 'GET',
                        url: urls.TOTAL_PASSENGER,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function(res) {
                      $scope.total_passenger = res;
                    }).error(function(err) {

                    }); 


                    $http({
                        method: 'GET',
                        url: urls.TOTAL_REVENUE,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function(res) {
                      $scope.total_revenue = res;
                    }).error(function(err) {

                    });

          $http({
                        method: 'GET',
                        url: urls.ABSOLUTE_REVENUE,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function(res) {
                      $scope.absolute_revenue = res;
                    }).error(function(err) {

                    });

       };
       
       init();

    }

}());