(function() {
    'use strict';

    angular.module('cyclist')
        .controller('BikeStatsController', BikeStatsController);

    BikeStatsController.$inject = ['$q', 'maintenance'];

    function BikeStatsController($q, maintenance) {
        var that = this;
        this.bikeId = null;
        this.allBikes = [];
        this.user = maintenance.user();
        this.getBike = getBike;


        maintenance.getBikes(this.user.id)
            .then(function(allBikes) {
                console.log(allBikes);
                that.allBikes = allBikes;
            })
            .catch(function(err) {
                console.log(err);
            });


        function getBike(bikeId) {
            if(!bikeId) {
                return $q.reject(new Error('no bike id provided'));
            }
            maintenance.getABike(bikeId)
                .then(function(bike) {
                    console.log(bike);
                })
                .catch(function(err) {
                    console.log(err);
                });
        }

    }

})();
