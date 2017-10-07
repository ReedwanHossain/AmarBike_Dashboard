(function() {
    'use strict';

    angular
        .module('amarbike')
        .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$scope', '$http', '$location', 'urls', '$localStorage', '$state', 'Auth'];

    function MainController($rootScope, $scope, $http, $location, urls, $localStorage, $state, Auth) {

       var init = function() {
            $rootScope.navone = false;
       };
       init();
       
        $scope.$storage = $localStorage.$default({
            code: []
        });

        //user sign in, sign up, log-out...........................................................
        
        $scope.signin = function() {
            var formData = {
                number: $scope.number,
                password: $scope.password
            }

            Auth.signin(formData, function(res) {
                if (res.type == false) {
                    alert(res.data) 
                } else {
                    $localStorage.token = res.data.token;
                    swal("Success", "You Are Logged In :)");
                    $state.go('main.dashboard');
                    // window.location = "/";    
                }
            }, function() {
                swal("Sorry", "Error Occured");
            })
        };

        $scope.signup = function() {
            var formData = {
                name: $scope.name,
                email: $scope.email,
                password: $scope.password
            }

            Auth.signup(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    $localStorage.token = res.data.token;
                    window.location = "/"    
                }
            }, function() {
                $rootScope.error = 'Failed to signup';
            })
        };

        $scope.logout = function() {
            $state.go('ltable');
            Auth.logout(function() {
                window.location = "/"
            }, function() {
                alert("Failed to logout!");
            });
        };
        $scope.token = $localStorage.token;

    }

}());