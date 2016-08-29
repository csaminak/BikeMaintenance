(function() {
    'use strict';

    angular.module('cyclist')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$window'];

    function LoginController($window) {

        this.login = authorizeCyclist;

        function authorizeCyclist() {
            $window.location.path('https://www.strava.com/oauth/authorize\
                            ?client_id=13165\
                            &response_type=code\
                            &redirect_uri=localhost:8080/get-token\
                            &scope=view_private\
                            &state=loggedin\
                            &approval_prompt=auto');
        }

    }

})();
