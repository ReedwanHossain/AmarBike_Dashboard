(function() {

    'use strict';

    angular.module('amarbike')
        .factory('RideData', ['$http', '$localStorage', 'urls', function($http, $localStorage, urls) {
             var rideInfo = {};

            var set_ride_info = function(ride) {
              rideInfo = ride;
            };

            var get_ride_info = function(){
              return rideInfo;
            };

            return {
                set_ride_info: set_ride_info,
                get_ride_info: get_ride_info
            };


        }]);

}());