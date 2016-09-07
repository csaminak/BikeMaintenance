(function() {
    'use strict';

    angular.module('cyclist')
        .controller('BikeFormController', BikeFormController);

    BikeFormController.$inject = ['$state', '$q', 'maintenance'];

    function BikeFormController($state, $q, maintenance) {
        var that = this;
        this.bike = {};
        this.errorMsg = '';
        this.addBike = addBike;
        this.user = maintenance.user();

        /**
         * Submits bike information to addBike mehtod from service and then sends
         * user to a part-form view to add parts for their bike.
         * @param   {Object}            bikeInfo
         * @return  {Promise Object}
         */
        function addBike(bikeInfo) {
            if(!bikeInfo) {
                that.errorMsg = 'No information about bike to submit.';
                return $q.reject(new Error(that.errorMsg));
            }
            if(!bikeInfo.name) {
                that.errorMsg = 'Please name your bike to easily identify it.';
                return $q.reject(new Error(that.errorMsg));
            }
            if(!bikeInfo.model) {
                that.errorMsg = 'Need to know the type of bike.';
                return $q.reject(new Error(that.errorMsg));
            }
            bikeInfo.client_id = that.user.id;
            return maintenance.addBike(bikeInfo)
                .then(function() {
                    that.bike = {};
                    $state.go('parts-form');
                })
                .catch(function(err) {
                    that.message = err.message;
                });
        }

    }


})();
