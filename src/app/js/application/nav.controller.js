(function() {
    'use strict';

    angular.module('cyclist')
        .controller('NavController', NavController);

    NavController.$inject = ['$state', 'maintenance'];

    function NavController($state, maintenance) {
        this.isLoggedIn = maintenance.isLoggedIn;
        this.logout = logout;

        /**
         * Goes to the service function logout to log user out of application
         * and then redirects them to the home page.
         * @return {Void}
         */
        function logout() {
            maintenance.logout();
            $state.go('home');
        }

    }

})();
