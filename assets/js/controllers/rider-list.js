(function() {
    'use strict';

    angular
        .module('amarbike')
        .controller('RiderList', RiderList)
        .filter('startFrom', function() {
            return function(input, start) {
                start = +start; //parse to int
                return input.slice(start);
            }
        });

    RiderList.$inject = ['$rootScope', '$scope', '$http', '$window', '$location', '$state', '$filter', 'urls', 'Auth'];

    function RiderList($rootScope, $scope, $http, $window, $location, $state, $filter, urls, Auth) {

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.query = '';
    $scope.ride ={};

    $scope.getData = function () {
      // needed for the pagination calc
      // https://docs.angularjs.org/api/ng/filter/filter
      return $filter('filter')($scope.ride_list, $scope.query)

       // manual filter
       // if u used this, remove the filter from html, remove above line and replace data with getData()

        var arr = [];
        if($scope.query == '') {
            arr = $scope.ride_list;
        } else {
            for(var ea in $scope.ride_list) {
                if($scope.locations[ea].indexOf($scope.query) > -1) {
                    arr.push( $scope.locations[ea] );
                }
            }
        }
        return arr;

    }


     Auth.getlocations(urls.GPS_TRACK, function(res) {
            $scope.ride_list = res;

        },
         function() {
            $rootScope.error = 'Failed to fetch details';
        });

      $scope.numberOfPages=function(){
                return Math.ceil($scope.getData().length/$scope.pageSize);
            }

  // A watch to bring us back to the
  // first pagination after each
  // filtering
$scope.$watch('query', function(newValue,oldValue){
    if(oldValue!=newValue){
      $scope.currentPage = 0;
  }
},true);

    //Getting All Locations..............

    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

  $scope.range = function (start) {
    var end = $scope.numberOfPages() - 1;
    var ret = [];
    for (var i = start; i < start+5 && i<end; i++) {
      ret.push(i);
    }
    return ret;
  };

  $scope.setPage = function(n) {
    $scope.currentPage = n;
  };




        //Remove Place from the List Permanenty..............................

        $scope.refuse_ride = function(id) {

            swal({
                title: "Are you sure?",
                // text: "You will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false },
                function(){
                     Auth.delete_plc(urls.REFUSE_RIDE, id,
                        function(res) {
                            $state.go('main.RiderList', {}, { reload: true });
                             swal("Deleted!", "Ride has been deleted.", "success");
                        },
                        function(err) {
                            swal("Error Occured");
                        });

                });

        };


        $scope.cancel_ride = function(id) {

            swal({
                title: "Are you sure?",
                // text: "You will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Cancel it!",
                closeOnConfirm: false },
                function(){
                     Auth.delete_plc(urls.CANCEL_RIDE, id,
                        function(res) {
                            $state.go('main.RiderList', {}, { reload: true });
                             swal("Deleted!", "Ride has been Canceled.", "success");
                        },
                        function(err) {
                            swal("Error Occured");
                        });

                });

        };

        $scope.approve_driver = function(id, status) {
            $http({
                    method: 'GET',
                    url: urls.APPROVE_DRIVER+id,
                    transformResponse: [function (data) {
                            return data;
                        }],
                    transformResponse: [function (data) {
                        return data;
                    }],
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .success(function(res) {
                $scope.ride.isApproved = !$scope.ride.isApproved;
                console.log($scope.ride.isApproved);
                swal(res);
            })
            .error(function(err) {
                $scope.ride.isApproved = tempStatus;
            })
        };


        // $scope.openWindow = function(uCode) {
        //     $window.open('https://barikoi.com/#/code/' + uCode, 'BariKoi?', 'width=500,height=400');
        // }

        // $scope.update_place = function(id) {
        //      $location.path('/updateplace/'+id);
        // }



    }

}());
