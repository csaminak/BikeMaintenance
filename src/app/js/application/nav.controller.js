(function() {
    'use strict';

    angular.module('cyclist')
        .controller('NavController', NavController);

    NavController.$inject = ['$state', 'maintenance'];

    function NavController($state, maintenance) {
        this.isLoggedIn = maintenance.isLoggedIn;

        this.logout = function logout() {
            maintenance.logout();
            $state.go('home');
        };

    }

})();
