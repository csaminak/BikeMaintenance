(function() {
    'use strict';

    angular.module('cyclist')
        .controller('BikeStatsController', BikeStatsController);

    BikeStatsController.$inject = ['$q', '$state', 'maintenance'];

    function BikeStatsController($q, $state, maintenance) {
        var that = this;
        this.bikeId = null;
        this.allParts = null;
        this.allBikes = [];
        this.getParts = getParts;
        this.user = maintenance.user();


        maintenance.getBikes(this.user.id)
            .then(function(allBikes) {
                console.log(allBikes);
                that.allBikes = allBikes;
            })
            .catch(function(err) {
                console.log(err);
            });

        /**
         * Get's all parts for a specific bike.
         * @param  {String}    bikeId   bikeId to get parts
         * @return {Promise Object}
         */
        function getParts(bikeId) {
            if(!bikeId) {
                return $q.reject(new Error('no bike id provided'));
            }
            return maintenance.getParts(bikeId)
                .then(function(parts) {
                    console.log(parts);
                    that.allParts = parts;
                    return parts;
                })
                .catch(function() {
                    $state.go('server', {
                        message: 'Sorry, we were unable to retrieve your bikes right now.'
                    });
                });
        }

    }

})();
