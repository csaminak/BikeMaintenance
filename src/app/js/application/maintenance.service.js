(function() {
    'use strict';

    angular.module('cyclist')
        .factory('maintenance', MaintenanceService);

    MaintenanceService.$inject = ['$http'];

    function MaintenanceService($http) {

        return {
            sendStravaCode: sendStravaCode,
            sendParts: sendParts,
            addBike: addBike
        };



        /**
         * Sends code retrieved from Strava login when redirected back to our app page,
         * Sent to the back-end to then get a token that will be used for all
         * other calls to Strava.
         * A token is expected with user Strava information is expected back.
         * @param  {String}     stravaCode   The code used to get a token
         * @return {XHR Object}              An object that holds promise methods
         */
        function sendStravaCode(stravaCode) {
            return $http({
                method: 'POST',
                url: 'localhost:3000/', //will change later
                headers: {
                    'Content-Type': 'application/json'
                },
                data: stravaCode
            });
        }


        /**
         * Sends an obect with info about parts to database to store.
         * @param  {Array}   partsData     Cyclist submitted parts info
         * @return {XHR Object}             An object that holds promise methods
         */
        function sendParts(partsData) {
            return $http({
                method: 'POST',
                url: 'localhost:3000/parts',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: angular.toJSON({
                    'part_type': partsData.part_type,
                    'description': partsData.description
                })
            })
            .then(function(xhr) {
                console.log(xhr);
            })
            .catch(function(err) {
                console.log(err);
            });
        }


        function addBike(bikeData) {
            return $http({
                method: 'POST',
                url: 'localhost:3000/bikes',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: bikeData
            })
            .then(function(xhr) {
                console.log(xhr);
            })
            .catch(function(err) {
                console.log(err);
            });
        }




    }


})();
