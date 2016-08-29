(function() {
    'use strict';

    angular.module('cyclist')
        .controller('TokenController', TokenController);

    TokenController.$inject = ['$location', 'maintenance'];

    function TokenController($location, maintenance) {

        maintenance.sendStravaCode($location.path().split('code=')[1]);
        //change state in then to user to addBike;

        //send code to service.then redirect to user's profile with the information returned
    }


})();
