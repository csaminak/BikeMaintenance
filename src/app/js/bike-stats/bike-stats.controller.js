(function() {
    'use strict';

    angular.module('cyclist')
        .controller('BikeStatsController', BikeStatsController);

    BikeStatsController.$inject = ['$q', 'maintenance'];

    function BikeStatsController($q, maintenance) {
        var that = this;
        this.bikeId = null;
        this.allBikes = [];
        this.allParts = null;
        this.user = maintenance.user();
        this.getParts = getParts;


        maintenance.getBikes(this.user.id)
            .then(function(allBikes) {
                console.log(allBikes);
                that.allBikes = allBikes;
            })
            .catch(function(err) {
                console.log(err);
            });

        /** //TODO DEFINE MY DOT BLOCK
         * Get's all parts for a specific bike.
         * @param  {String}    bikeId   bikeId to get parts
         * @return {[type]}             [description]
         */
        function getParts(bikeId) {
            if(!bikeId) {
                return $q.reject(new Error('no bike id provided'));
            }
            console.log(bikeId);
            return maintenance.getParts(bikeId)
                .then(function(parts) {
                    console.log(parts);
                    that.allParts = parts;
                })
                .catch(function(err) {
                    console.log(err);
                });
        }

    }

})();
