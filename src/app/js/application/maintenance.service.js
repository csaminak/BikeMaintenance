(function() {
    'use strict';

    angular.module('cyclist')
        .factory('maintenance', MaintenanceService);

    MaintenanceService.$inject = ['$http'];

    function MaintenanceService($http) {

        return {
            sendStravaCode: sendStravaCode,
            sendParts: sendParts,
            addBike: addBike,
            getBikes: getBikes
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
         * @param  {Object}   partsData     Cyclist submitted parts info, with specified bike
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

        /**
         * Sends an obect with info about a user's bike to database to store.
         * @param  {Object}        bikeData     Cyclist submitted bike
         * @return {XHR Object}                 An object that holds promise methods
         */
        function addBike(bikeData) {
            return $http({
                method: 'POST',
                url: 'http://localhost:3000/bikes',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: bikeData
            })
            .then(function(xhr) {
                console.log('then addBike', xhr);
            })
            .catch(function(err) {
                console.log('addBike error', err);
            });
        }

        /**
         * Gets all bikes for a specified cyclist
         * @param  {String}        cyclist     Cyclist id
         * @return {XHR Object}                An object that holds promise methods
         */
        function getBikes() {
            console.log('CORS?');
            return $http({
                method: 'get',
                url: 'http://localhost:3000/bikes',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(xhr) {
                console.log('getBikes then', xhr);
                return xhr.data;
            })
            .catch(function(err) {
                console.log('getBikes error: ', err);
            });
        }


    }


})();
