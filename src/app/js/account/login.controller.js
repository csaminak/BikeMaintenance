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
                            &redirect_uri=localhost:3000\
                            &scope=view_private\
                            &state=loggedin\
                            &approval_prompt=auto');
            //Create a state for the path that is the redirect back
            //when in that state I will automatically/on load look into the browser
            //for a code and then do the rest of this function...
            //send code to service.then redirect to user's profile with the information returned
            var code = $location.path().split('code=')[1];
            return code;
        }

    }


    /* https://www.strava.com/oauth/authorize?
    client_id=13165&response_type=code&redirect_uri=localhost:3000&
    scope=view_private&state=loggedin&approval_prompt=auto */

})();
