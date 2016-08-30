(function() {
    'use strict';

    angular.module('cyclist')
        .controller('NavController', NavController);

    NavController.$inject = ['$state', 'maintenance'];

    function NavController($state, maintenance) {
        this.isLoggedIn = maintenance.isLoggedIn;
        this.logout = logout;


        function logout() { //TODO will know what to do when function is complete
            maintenance.logout();
            $state.go('home');
        }

    }

})();
