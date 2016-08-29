(function() {
    'use strict';

    angular.module('cyclist')
        .controller('BikeFormController', BikeFormController);

    BikeFormController.$inject = ['$state', 'maintenance'];

    function BikeFormController($state, maintenance) {
        var that = this;
        this.bike = {};
        this.addBike = addBike;
        this.errorMsg = '';

        /**
         * Submits bike information to addBike mehtod from service and then sends
         * user to a part-form view to add parts for their bike.
         * @param   {Object}            bikeInfo
         * @return  {Promise Object}
         */
        function addBike(bikeInfo) {
            if(!bikeInfo.name) {
                that.errorMsg = 'Please name your bike to easily identify it.';
                return;
            }
            if(!bikeInfo.model) {
                that.errorMsg = 'Need to know the type of bike.';
                return;
            }
            console.log(bikeInfo);
            return maintenance.addBike(bikeInfo)
                .then(function() {
                    that.bike = {};
                    $state.go('parts-form');
                })
                .catch(function(err) {
                    that.message = 'Sorry unable to connect, try again?';
                    console.log(err);
                });
        }

    }


})();
