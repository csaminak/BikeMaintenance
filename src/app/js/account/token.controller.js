(function() {
    'use strict';

    angular.module('cyclist')
        .controller('TokenController', TokenController);

    TokenController.$inject = ['$state', 'maintenance'];

    function TokenController($state, maintenance) {
        var that = this;
        this.errorMsg = '';
        this.code = window.location.hash.split('code=')[1];

        maintenance.login(this.code)
                .then(function(response) {
                    console.log(response);
                    if(response.status === 500) {
                        that.errorMsg = 'Sorry, we seem to have some difficulty connecting\
                                            to the site, please try again later?';
                        return response;
                    }
                    $state.go('bike-form');
                })
                .catch(function(err) {
                    console.log(err);
                    that.errorMsg = 'Sorry, we are unable to connect with Strava.';
                    return err;
                });


    }


})();
