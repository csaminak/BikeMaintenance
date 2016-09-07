(function() {
    'use strict';

    angular.module('cyclist')
        .controller('TokenController', TokenController);

    TokenController.$inject = ['$state', 'maintenance'];

    function TokenController($state, maintenance) {
        this.errorMsg = '';
        this.code = window.location.hash.split('code=')[1];

        maintenance.login(this.code)
                .then(function() {
                    $state.go('bike-form');
                })
                .catch(function() {
                    $state.go('server', {
                        message: 'Sorry, we were unable to authorize your account.'
                    });
                });

    }


})();
