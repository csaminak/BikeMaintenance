(function() {
    'use strict';

    angular.module('cyclist')
        .controller('TokenController', TokenController);

    TokenController.$inject = ['$state', 'maintenance'];

    function TokenController($state, maintenance) {
        this.code = window.location.hash.split('code=')[1];

        maintenance.sendStravaCode(this.code)
                .then(function(response) {
                    console.log(response); //TODO anything else with response?
                    $state.go('bike-form');
                })
                .catch(function(err) {
                    console.log(err); //TODO what kind of error can occur?
                });


    }


})();
