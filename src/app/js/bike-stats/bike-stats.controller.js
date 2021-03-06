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
        this.message = '';
        this.getParts = getParts;
        this.user = maintenance.user();
        this.deletePart = deletePart;


        maintenance.getBikes(this.user.id)
            .then(function(bikes) {
                if(bikes.length < 1) {
                    that.message = 'Sorry, you don\'t have any bikes to view parts.';
                    that.allBikes = null;
                    return;
                }
                that.allBikes = bikes;
            })
            .catch(function(err) {
                if(err.status >= 500) {
                    $state.go('server', {
                        message: 'Sorry, we were unable to retrieve your bikes right now.'
                    });
                }
            });

        /**
         * Get's all parts for a specific bike.
         * @param  {String}    bikeId   bikeId to get parts
         * @return {Promise Object}
         */
        function getParts(bikeId) {
            if(!bikeId) {
                return $q.reject(new Error('No bike id provided'));
            }
            that.message = '';
            return maintenance.getParts(bikeId)
                .then(function(parts) {
                    console.log(parts);
                    if(parts.length < 1) {
                        that.message = 'There are no parts for this bike.';
                    }
                    that.allParts = parts;
                    return parts;
                })
                .catch(function(err) {
                    if(err.status >= 500) {
                        $state.go('server', {
                            message: 'Sorry, we were unable to retrieve parts for\
                                            your bike right now.'
                        });
                    }
                });
        }

        /**
         * Deletes a part and removes it from the current array.
         * @param  {String}  partId     Passed in when user click delete button
         * @return {Array}              The parts array
         */
        function deletePart(partId) {
            if(!partId) {
                return $q.reject(new Error('No part id provided'));
            }
            return maintenance.deletePart(partId)
                .then(function() {
                    that.allParts.forEach(function(part) {
                        if(part.id === Number(partId)) {
                            that.allParts.splice(that.allParts.indexOf(part), 1);
                        }
                    });
                    that.message = 'Your part was deleted';
                    return that.allParts;
                })
                .catch(function(err) {
                    if(err.status >= 500) {
                        $state.go('server', {
                            message: 'Sorry, we were unable to expire your part right now.'
                        });
                    }
                });
        }

    }

})();
