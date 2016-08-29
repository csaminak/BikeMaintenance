(function() {
    'use strict';

    angular.module('cyclist')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'maintenance'];

    function LoginController($location/*, maintenance*/) {

        this.login = authorizeCyclist;


        function authorizeCyclist() {
            $location.path('https://www.strava.com/oauth/authorize\
                            ?client_id=13165\
                            &response_type=code\
                            &redirect_uri=https://cycling-app.herokuapp.com/get-token\
                            &scope=view_private\
                            &state=loggedin\
                            &approval_prompt=auto');
        }

    }


    /* https://www.strava.com/oauth/authorize?
    client_id=13165&response_type=code&redirect_uri=localhost:3000&
    scope=view_private&state=loggedin&approval_prompt=auto */

})();
