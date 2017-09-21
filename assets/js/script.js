(function() {
    'use strict';
    var app = angular.module('amarbike', ['ui.router', 'ui.bootstrap', 'ngMap', 'ngStorage', 'angular-table', 'angular.filter', 'autocomplete', 'fmTimepicker']);

    //All Api urls.............................................................

    app.constant('urls', {
        RIDE_LOG : 'http://amarbike.tk/api/get/available',
        GPS_TRACK : 'http://amarbike.tk/api/get/location',
        GET_PASSENGER : 'http://amarbike.tk/api/get/passenger',
        CREATE_RIDE : 'https://amarbike.tk/api/bot/ride/create',
        FINISHED_RIDE : 'https://amarbike.tk/api/get/finished',
        BOOKED_RIDE : 'https://amarbike.tk/api/get/booked',
        ONGOING_RIDE : 'https://amarbike.tk/api/get/ongoing',
        AVAILABLE_RIDE : 'https://amarbike.tk/api/get/available',
        CANCELLED_RIDE : 'https://amarbike.tk/api/get/cancelled',
        REFUSED_RIDE : 'https://amarbike.tk/api/get/refused',
        TOTAL_REVENUE : 'https://amarbike.tk/api/admin/revenue/made',
        TOTAL_RIDE : 'https://amarbike.tk/api/admin/rides/made',
        TOTAL_RIDER : 'https://amarbike.tk/api/admin/total/rider',
        TOTAL_PASSENGER : 'https://amarbike.tk/api/admin/total/passenger',
        ABSOLUTE_REVENUE : 'https://amarbike.tk/api/admin/revenue/made/by/us',
        REFUSE_RIDE : 'https://amarbike.tk/api/ride/refuse/',
        CANCEL_RIDE : 'https://amarbike.tk/api/ride/cancel/',
        UPDATE_RIDE : 'https://amarbike.tk/api/ride/edit/',
    });


    //List Of All ui-routes...................................................

    app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

        $urlRouterProvider.otherwise('/dashboard');

        $stateProvider

            .state('main', {
                abstract : true,
                url: '',
                templateUrl: 'examples/sidebar.html',
                authentication : true
            })

            .state('main.dashboard', {
                url: '/dashboard',
                templateUrl: 'examples/dashboard.html',
                controller: 'DashController',
                authentication : true
            })

            .state('signin', {
                url: '/signin',
                templateUrl: 'examples/signin.html',
                controller: 'MainController',
                authentication: false

            })

            .state('signup', {
                url: '/signup',
                templateUrl: 'examples/signup.html',
                controller: 'MainController',
                authentication: false

            })

            .state('main.rideSet', {
                url: '/ride/set',
                templateUrl: 'examples/set-ride.html',
                controller: 'SetRide',
                authentication : true

            })

            .state('main.rideUpdate', {
                url: '/ride/update',
                templateUrl: 'examples/update-ride.html',
                controller: 'UpdateRide',
                authentication : true

            })

            .state('main.riderList', {
                url: '/rider/list',
                templateUrl: 'examples/rider-list.html',
                controller: 'RiderList',
                authentication : true

            })

            .state('main.rideLog', {
                url: '/ride/log',
                templateUrl: 'examples/ride-log.html',
                controller: 'RideLog',
                authentication : true
            })

            .state('main.rideLogBooked', {
                url: '/ride/log/booked',
                templateUrl: 'examples/ride-log-booked.html',
                controller: 'RideLogBooked',
                authentication : true
            })

            .state('main.rideLogRefused', {
                url: '/ride/log/refused',
                templateUrl: 'examples/ride-log-refused.html',
                controller: 'RideLogRefused',
                authentication : true
            })

            .state('main.rideLogFinished', {
                url: '/ride/log/finished',
                templateUrl: 'examples/ride-log-finished.html',
                controller: 'RideLogFinished',
                authentication : true
            })

            .state('main.rideLogCancelled', {
                url: '/ride/log/cancelled',
                templateUrl: 'examples/ride-log-cancelled.html',
                controller: 'RideLogCancelled',
                authentication : true
            })

            .state('main.rideOngoing', {
                url: '/ride/ongoing',
                templateUrl: 'examples/ride-ongoing.html',
                controller: 'RideOngoing',
                authentication : true
            })


            .state('main.track', {
                url: '/track',
                templateUrl: 'examples/gps-track.html',
                controller: 'GPSTrack',
                authentication : true
            });


        //Intercepts every http request and Response......................................................
        //
        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token; //sends authorization header for every subsequent request to server
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/signin');                                  //redirecting route......................
                    }
                    return $q.reject(response);
                }
            };
        }])


     });//.run(function ($rootScope, $state, $localStorage, $location) {
     //            $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
     //                        if ($localStorage.token == null) {
     //                             if (toState.authentication) {
     //                                 $state.transitionTo("signin");
     //                                 event.preventDefault();
     //                             }
     //                         }else {
     //                            if (toState.name == "signin" || toState.name == "signup") {
     //                                $location.path('/dashboard');
     //                            };
     //                         };
     //             });
     //     });

}());
