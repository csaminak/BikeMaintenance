(function() {
    'use strict';

    angular.module('cyclist')
        .controller('BikeFormController', BikeFormController);

    BikeFormController.$inject = ['$state', 'maintenance'];

    function BikeFormController($state, maintenance) {
        var that = this;
        this.bike = {};
        this.addBike = addBike;



        /**
         * Submits bike information to addBike mehtod from service and then sends
         * user to a part-form view to add parts for their bike.
         * @param   {Object}            bikeInfo
         * @return  {Promise Object}
         */
        function addBike(bikeInfo) {
            if(!bikeInfo) {
                return; //TODO Add some kind of error
            }
            console.log(bikeInfo);
            return maintenance.addBike(bikeInfo)
                .then(function() {
                    that.bike = {};
                    $state.go('parts-form');
                })
                .catch(function(err) {
                    console.log(err);  //TODO add some kind of message or error for user
                });
        }

    }


})();
