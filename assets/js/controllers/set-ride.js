(function() {
    'use strict';

    angular
        .module('amarbike')
        .controller('SetRide', SetRide);

    SetRide.$inject = ['$rootScope', '$scope', '$http', '$location', 'urls', 'Auth'];

    function SetRide($rootScope, $scope, $http, $location, urls, Auth) {


        //Initialize Method. Getting All Category List .......................................................

        $scope.style                = "dropdown";
        $scope.timeFormat           = "hh:mm a";
        $scope.startTime            = "7:00 am";
        $scope.endTime              = "11:00 pm";
        $scope.intervalMinutes      = 5;
        $scope.largeIntervalMinutes = 60;


        var init = function() {

            $scope.passengers=[];
            $scope.ride ={};
            $scope.ride.source ={};
            $scope.ride.source.lat = 23.8109
            $scope.ride.source.lng = 90.4123;
            $scope.ride.destination ={};
            $scope.ride.time =null;

            $http.get(urls.GET_PASSENGER)
                .success(function(res) {
                    $scope.passengers = res;
                    $scope.passenger_name = res.map(function(obj) {
                          return obj.name;
                        });
                })
                .error(function(err) {
                    alert(err);
                })

        }
        init();

        $scope.$watch('ride.pname', function() {
            $scope.passengers.forEach(function(passenger) {
                if($scope.ride.pname == passenger.name){
                    $scope.ride.pphone = passenger.number;
                    $scope.ride.email = passenger.email;
                }

            })

        });


        //Map Initializaton...........................................................

        var map;
          $scope.$on('mapInitialized', function(evt, evtMap) {
           map = evtMap;
           map.setCenter({lat: $rootScope.currentlat, lng: $rootScope.currentlng});
        });

        $scope.positions = [

            {
              "latitude" : '23.8109',
              "longitude" : '90.4123',
              "index" : 0,
              "icon" : {
                'url' : "/assets/img/marker.png",
                'scaledSize': [40,40]
              }
            }
        ];


        //Map Event. Triggerd When Maker Is Mooved.........................................

        $scope.pin_mooved = function(events, marker) {
            var pos = marker.$index;
            console.log(map.markers[pos].getPlace());
                $scope.ride.source.lat = map.markers[pos].getPosition().lat();
                $scope.ride.source.lng = map.markers[pos].getPosition().lng();
        }

       //Creates New Place..........................................................................

       $scope.setRide = function() {

            var data = {
                'name' : $scope.ride.pname,
                'pass' : "123344",
                'number' :$scope.ride.pphone,
                'type' : 3,
                'pic' : "",
                'email' : $scope.ride.email,
                'pick_up' : $scope.ride.pickup,
                'drop_off' : $scope.ride.dropoff,
                'pickup_time' : $scope.ride.time._i,
                'start_lat' : $scope.ride.source.lat,
                'start_lon' : $scope.ride.source.lng
            }
           // console.log($scope.ride.time.getHours()+':'+$scope.ride.time.getMinutes())
            //Send Data Through Auth Service.......
            //Auth Service IS Responsible for Handling Http Request and Authentication......................

            Auth.addaddress(urls.CREATE_RIDE, data, function(res) {
                     swal('Success', 'This ride has been created.');
                     init();
            },function() {
                swal("Error", "Try Again")
            })
        };

         $scope.getdirection =  function() {
            console.log(map.markers[0].getPosition().lat());
            $scope.source = {'lat' :  map.markers[0].getPosition().lat(), 'lng' :  map.markers[0].getPosition().lng()};
           // $scope.destination = {'lat' :  map.markers[1].getPosition().lat(), 'lng' :  map.markers[1].getPosition().lng()}
            $scope.ride.pickup = this.getPlace().formatted_address;
            if (this.getPlace().geometry.location) {
                $scope.ride.source.lat = this.getPlace().geometry.location.lat();
                $scope.ride.source.lng = this.getPlace().geometry.location.lng();
            };
        };

    }

}());
