(function() {
    'use strict';

    angular
        .module('amarbike')
        .controller('GPSTrack', GPSTrack);

    GPSTrack.$inject = ['$rootScope', '$scope', '$http', '$location', 'urls', 'Auth', '$interval'];

    function GPSTrack($rootScope, $scope, $http, $location, urls, Auth, $interval) {

      $http({
               method: 'GET',
               url: urls.GPS_TRACK,
            }).success(function(res) {
               console.log(res);
               $scope.bikes = res;

            }).error(function() {

            });

      $scope.$on('mapInitialized', function(evt, evtMap) {
            $scope.map = evtMap;
      });

        $scope.showDetail = function(e, bike) {
            $scope.bike = bike;
            $scope.map.showInfoWindow('foo-iw', bike.id.toString());
        };

       $scope.myFilter = function(item){
            return !(item.status == 0)
        }


      $interval(function() {
         $http({
                  method: 'GET',
                  url: urls.GPS_TRACK,
               }).success(function(res) {
                  console.log(res);
                  $scope.bikes = res;

               }).error(function() {

               });
      }, 30000);
  }

}());
