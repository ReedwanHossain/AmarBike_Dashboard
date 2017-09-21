(function() {


    'use strict';

    angular.module('amarbike')
        .factory('Auth', ['$http', '$localStorage', 'urls', function($http, $localStorage, urls) {
            var baseUrl = "http://139.59.61.20/v1/";

            //Auth Service...............................................

            function changeUser(user) {
                angular.extend(currentUser, user);
            }

            //

            function urlBase64Decode(str) {
                var output = str.replace('-', '+').replace('_', '/');
                switch (output.length % 4) {
                    case 0:
                        break;
                    case 2:
                        output += '==';
                        break;
                    case 3:
                        output += '=';
                        break;
                    default:
                        throw 'Illegal base64url string!';
                }
                return window.atob(output);
            }

            function getUserFromToken() {
                var token = $localStorage.token;
                var user = {};
                if (typeof token !== 'undefined') {
                    var encoded = token.split('.')[1];
                    user = JSON.parse(urlBase64Decode(encoded));
                }
                return user;
            }

            var currentUser = getUserFromToken();

            return {

                signup: function(data, success, error) {
                    $http.post(baseUrl + '/', data).success(success).error(error)
                },

                signin: function(data, success, error) {
                     $http.post(urls.AUTH_URI, data).success(success).error(error)
                },

                getlocations: function(url, success, error) {
                    $http.get(url).success(success).error(error)
                },

                //
                setcategory: function(url, data , success, error) {
                    $http({
                        method: 'POST',
                        url: url,
                        transformResponse: [function (data) {
                            return data;
                        }],
                        data: $.param(data),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(success).error(error)

                },
                //delete places.............................

                delete_plc: function(url, data, success, error) {
                    $http({
                        method: 'get',
                        url: url+data,
                        data: $.param(data),
                        transformResponse: [function (data) {
                            return data;
                        }],
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(success).error(error)
                },

                update_ride: function(url, success, error) {
                    $http({
                        method: 'get',
                        url: url,
                        transformResponse: [function (data) {
                            return data;
                        }],
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(success).error(error)
                },
                //add places................................

                addaddress: function(url, data, success, error) {
                    $http({
                        method: 'POST',
                        url: url,
                        data: $.param(data),
                        // transformResponse: [function (data) {
                        //     return data;
                        // }],  
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(success).error(error)
                },
              
                logout: function(success) {
                    changeUser({});
                    delete $localStorage.token;
                    success();
                }
            };
        }]);

}());