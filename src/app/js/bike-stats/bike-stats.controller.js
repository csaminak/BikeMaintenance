(function() {
    'use strict';

    angular.module('cyclist')
        .controller('BikeStatsController', BikeStatsController);

    BikeStatsController.$inject = ['maintenance'];

    function BikeStatsController(maintenance) {
        var that = this;
        this.bikeId = null;
        this.allBikes = [];

        maintenance.getBikes(maintenance.user.id)
            .then(function(allBikes) {
                console.log(allBikes);
                that.allBikes = allBikes;
            })
            .catch(function(err) {
                console.log(err);
            });

    }

})();
