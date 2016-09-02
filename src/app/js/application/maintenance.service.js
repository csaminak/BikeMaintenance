(function() {
    'use strict';

    angular.module('cyclist')
        .factory('maintenance', MaintenanceService);

    MaintenanceService.$inject = ['$http', '$q'];

    function MaintenanceService($http, $q) {

        var stravaToken;
        var stravaUser;
        var currentCyclist;

        init();

        return {
            login: login,
            isLoggedIn: isLoggedIn,
            logout: logout,
            user: user,
            addBike: addBike,
            sendParts: sendParts,
            getBikes: getBikes
        };

        /**
         * If a cyclist has logged in previously, this function will retrieve
         * their info from local storage, so they won't have to login again.
         * @return {Void}
         */
        function init() {
            try {
                currentCyclist = JSON.parse(localStorage.getItem('currentCyclist'));
            } catch(err) {
                //does not matter if loggedInUser does not exist or is invalid
                //because user will just log in with form
            }

            if (currentCyclist) {
                stravaToken = currentCyclist.token;
            }
        }

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
                    'Content-Type': 'application/json',
                    'accept': 'json'
                },
                data: angular.toJson({'code': stravaCode})
            })
            .then(function(response) {
                console.log(stravaCode);
                stravaToken = response.data.access_token;
                stravaUser = response.data.athlete;
                currentCyclist = {
                    id: response.data.client.id,
                    name: {
                        first: response.data.client.first_name,
                        last: response.data.client.last_name,
                    },
                    email: response.data.client.email,
                };
                localStorage.setItem('currentCyclist', angular.toJson({
                    token: stravaToken,
                    id: currentCyclist.id
                }));
                return currentCyclist;
            })
            .catch(function(err) {
                console.log(stravaCode);
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
            return !!stravaToken;
        }

        /**
         * Logs cyclist out.
         * @return {Void} [description]
         */
        function logout() {
            stravaToken = null;
            currentCyclist = null;
            stravaUser = null;
            localStorage.removeItem('currentCyclist');
        }

        /**
         * Returns the current logged in cyclist info.
         * @return      {Object}     Includes id, name, email of cyclist
         */
        function user() {
            return currentCyclist;
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
            if(!bikeData.client_id) {
                return $q.reject(new Error('Need user to store bike to.'));
            }
            return $http({
                method: 'POST',
                url: 'https://cycling-app.herokuapp.com/bikes.json',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'json'
                },
                data: angular.toJson({
                    'brand': bikeData.bike_brand,
                    'model': bikeData.model,
                    'serial_number': bikeData.serial_number,
                    'bought_on': bikeData.bought_on,
                    'name': bikeData.name,
                    'client_id': bikeData.client_id
                })
            })
            .then(function(response) {
                console.log('then addBike', response);
                return response.data;
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
                url: 'https://cycling-app.herokuapp.com/parts.json',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'json'
                },
                data: angular.toJson({
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
            return $http({
                method: 'get',
                url: 'https://cycling-app.herokuapp.com/bikes',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'json'
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
