(function() {
    'use strict';

    angular.module('cyclist')
        .controller('TokenController', TokenController);

    TokenController.$inject = ['maintenance'];

    function TokenController(maintenance) {
        this.code = window.location.hash.split('code=')[1];
        console.log(this.code); //TODO DELETE

        maintenance.sendStravaCode(this.code)
                .then(function(response) {
                    console.log(response);
                    //change state in then to user to addBike;
                    //send code to service.then redirect to user's profile with
                    //the information returned
                })
                .catch(function(err) {
                    console.log(err);
                });


    }


})();
