(function() {
    'use strict';

    angular.module('cyclist')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$window', '$stateParams'];

    function LoginController($window, $stateParams) {

        this.login = authorizeCyclist;
        this.message = $stateParams.message;

        /**
         * Redirects user to authorize their account on Strava.
         * @return {Void}
         */
        function authorizeCyclist() {
            var clientId = '13165';
            var redirect = 'https://bike-memo.herokuapp.com/#/get-token';

            // $location would not redirect properly because '#' was being removed
            $window.location = 'https://www.strava.com/oauth/authorize?client_id=' +
                        encodeURIComponent(clientId) + '&response_type=code&redirect_uri=' +
                        encodeURIComponent(redirect) + '&scope=view_private' +
                        '&state=loggedin&approval_prompt=auto';
        }

    }

})();
