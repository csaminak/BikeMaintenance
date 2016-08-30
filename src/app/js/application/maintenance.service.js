(function() {
    'use strict';

    angular.module('cyclist')
        .factory('maintenance', MaintenanceService);

    MaintenanceService.$inject = ['$http', '$q'];

    function MaintenanceService($http, $q) {

        var token;
        var stravaUser;
        var cyclist;

        return {
            login: login,
            isLoggedIn: isLoggedIn,
            addBike: addBike,
            sendParts: sendParts,
            getBikes: getBikes
        };


        /**
         * Sends the code retrieved from Strava login, which is retrieved from the
         * redirect back to our app page. A token and user Strava information is
         * expected back.
         * @param  {String}     stravaCode   The code used to get a token
         * @return {XHR Object}              An object that holds promise methods
         */
        function login(stravaCode) {
            console.log('stravaCode', stravaCode); //TODO DELETE
            if(!stravaCode) {
                return $q.reject(new Error('no code obtained to send.'));
            }
            return $http({
                method: 'POST',
                url: 'https://cycling-app.herokuapp.com/oauth/strava',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: angular.toJson({'code': stravaCode})
            })
            .then(function(response) {
                token = response.data.token;
                stravaUser = response.data.athlete;
                cyclist = response.data.client;
                return response.data;
            })
            .catch(function(err) {
                console.log('sendStravaCode err', err);
                return err.data.errors;
            });
        }

        /**
         * Returns a boolean determining whether a token for a user exists,
         * if true, cyclists is logged in, if false, cyclist is not logged in
         * and therefore will need to login.
         * @return {Boolean}   Token     Determines the existence of a token
         */
        function isLoggedIn() {
            return !!token;
        }

        /**
         * Sends an obect with info about a user's bike to database to store.
         * @param  {Object}        bikeData     Cyclist submitted bike
         * @return {XHR Object}                 An object that holds promise methods
         */
        function addBike(bikeData) {
            if(!bikeData) {
                return $q.reject(new Error('No bike info was sent.'));
            }
            if(!bikeData.name) {
                return $q.reject(new Error('Need a name for bike to identify bike.'));
            }
            if(!bikeData.model) {
                return $q.reject(new Error('Need a model/type of bike to save.'));
            }
            return $http({
                method: 'POST',
                url: 'https://cycling-app.herokuapp.com/bikes',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: bikeData //TODO ANGULAR TO JSON?
            })
            .then(function(response) {
                console.log('then addBike', response);
            })
            .catch(function(err) {
                console.log('addBike error', err);
            });
        }

        /**
         * Sends an obect with info about parts to database to store.
         * @param  {Object}   partsData     Cyclist submitted parts info, with specified bike
         * @return {XHR Object}             An object that holds promise methods
         */
        function sendParts(partsData) {
            if(!partsData) {
                return $q.reject(new Error('No parts to add.'));
            }
            if(!partsData.part_type) {
                return $q.reject(new Error('Need the type of part to save part.'));
            }
            if(!partsData.description) {
                return $q.reject(new Error('Need the specfic description for selected part.'));
            }
            return $http({
                method: 'POST',
                url: 'https://cycling-app.herokuapp.com/parts',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: angular.toJSON({
                    'part_type': partsData.part_type,
                    'description': partsData.description
                })
            })
            .then(function(response) {
                console.log(response);
            })
            .catch(function(err) {
                console.log(err);
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
                url: 'https://cycling-app.herokuapp.com/bikes',
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
