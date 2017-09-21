(function() {
    'use strict';

    angular
        .module('amarbike')
        .controller('UpdateRide', UpdateRide);

    UpdateRide.$inject = ['$rootScope', '$scope', '$http', '$location', 'urls', 'Auth', 'RideData'];

    function UpdateRide($rootScope, $scope, $http, $location, urls, Auth, RideData) {


        //Initialize Method. Getting All Category List .......................................................
        $scope.style                = "dropdown";
        $scope.timeFormat           = "hh:mm a";
        $scope.startTime            = "7:00";
        $scope.endTime              = "23:00";
        $scope.intervalMinutes      = 5;
        $scope.largeIntervalMinutes = 60;
        
        $scope.ctime =null;
        var init = function() {
            console.log(RideData.get_ride_info().pickup_time)
            $scope.ride = RideData.get_ride_info();
            //$scope.ctime._i = RideData.get_ride_info().pickup_time;
        }
        init();


       $scope.updateRide = function() {

          
           // console.log($scope.ride.time.getHours()+':'+$scope.ride.time.getMinutes())
            //Send Data Through Auth Service.......
            //Auth Service IS Responsible for Handling Http Request and Authentication......................

            Auth.update_ride(urls.UPDATE_RIDE+$scope.ride.id+'?pickup_time='+$scope.ctime._i+'&pick_up='+$scope.ride.pick_up+'&drop_off='+$scope.ride.drop_off, function(res) {
                     swal('Success', 'This ride has been Updated.');
                     init();
            },function() {
                swal("Error", "Try Again")
            })
        };

        //  $scope.getdirection =  function() {
        //     console.log(map.markers[0].getPosition().lat());
        //     $scope.source = {'lat' :  map.markers[0].getPosition().lat(), 'lng' :  map.markers[0].getPosition().lng()};
        //    // $scope.destination = {'lat' :  map.markers[1].getPosition().lat(), 'lng' :  map.markers[1].getPosition().lng()}
        //     $scope.ride.pickup = this.getPlace().formatted_address;
        //     if (this.getPlace().geometry.location) {
        //         $scope.ride.source.lat = this.getPlace().geometry.location.lat();
        //         $scope.ride.source.lng = this.getPlace().geometry.location.lng();
        //     };
        // };

    }

}());
