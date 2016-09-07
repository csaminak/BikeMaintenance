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
            getParts: getParts,
            getBikes: getBikes,
            getABike: getABike,
            deletePart: deletePart
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
                //does not matter if currentCyclist does not exist or is invalid
                //because user will just reauthorize through strava and then login
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
            if(!stravaCode) {
                return $q.reject(new Error('No code obtained to send.'));
            }
            return $http({
                method: 'POST',
                url: 'https://cycling-app.herokuapp.com/oauth/strava',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: angular.toJson({'code': stravaCode})
            })
            .then(function(response) {
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
         * Logs cyclist out of application.
         * @return {Void}
         */
        function logout() {
            stravaToken = null;
            currentCyclist = null;
            stravaUser = null;
            localStorage.removeItem('currentCyclist');
            return;
        }

        /**
         * Returns the current logged in cyclist info.
         * @return  {Object}     Includes id, name, email of cyclist
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
                return $q.reject(new Error('Need user id to identify bike ownership.'));
            }
            return $http({
                method: 'POST',
                url: 'https://cycling-app.herokuapp.com/bikes.json',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
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
                console.log('Bike added: ', response);
                return response.data;
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
            if(!partsData.bike_id) {
                return $q.reject(new Error('Need to know the bike to attach part to.'));
            }
            if(!partsData.mounted_on) {
                return $q.reject(new Error('Need to know when part was attached to bike.'));
            }
            return $http({
                method: 'POST',
                url: 'https://cycling-app.herokuapp.com/parts.json',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: angular.toJson({
                    'part_type': partsData.part_type,
                    'description': partsData.description,
                    'bike_id': partsData.bike_id,
                    'mounted_on': partsData.mounted_on,
                    'purchased_on': partsData.purchased_on
                })
            })
            .then(function(response) {
                console.log('part added: ', response.data);
                return response.data;
            });
        }

        /**
         * Gets an array of parts for a specified bike.
         * @param  {String}     bikeId      Passed in bike Id
         * @return {XHR Object}             An object that holds promise methods
         */
        function getParts(bikeId) {
            if(!bikeId) {
                return $q.reject(new Error('no bike id provided'));
            }
            return $http({
                method: 'GET',
                url: 'https://cycling-app.herokuapp.com/parts',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(function(response) {
                console.log('getParts: ', response);
                var parts = [];
                response.data.forEach(function(part) {
                    if((part.bike_id === Number(bikeId)) && (!part.is_expired)) {
                        parts.push(part);
                    }
                });
                return parts;
            });
        }

        /**
         * Gets all bikes for a specified cyclist
         * @param  {String}    cyclistId     Cyclist id
         * @return {XHR Object}              An object that holds promise methods
         */
        function getBikes(cyclistId) {
            if(!cyclistId) {
                return $q.reject(new Error('no cyclist Id provided'));
            }
            return $http({
                method: 'GET',
                url: 'https://cycling-app.herokuapp.com/bikes.json',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: {
                    'client_id': cyclistId
                }
            })
            .then(function(response) {
                console.log('Retrieve all Bikes call: ', response);
                var bikes = [];
                response.data.forEach(function(bike) {
                    if(bike.client_id === parseInt(cyclistId)) {
                        bikes.push(bike);
                    }
                });
                return bikes;
            });
        }

        /**
         * Gets the data for a specific bike.
         * @param  {String}     bikeId      Passed in bike Id
         * @return {XHR Object}             An object that holds promise methods
         */
        function getABike(bikeId) {
            if(!bikeId) {
                return $q.reject(new Error('no bike id provided'));
            }
            return $http({
                method: 'GET',
                url: 'https://cycling-app.herokuapp.com/bikes/' + bikeId,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(function(response) {
                console.log('getABike: ', response);
                return response.data;
            });
        }

        /**
         * Deletes a part from database.
         * @param  {String}     partId  Passed in part id
         * @return {XHR Object}         An object that holds promise methods
         */
        function deletePart(partId) {
            if(!partId) {
                return $q.reject(new Error('no part id provided'));
            }
            return $http({
                method: 'DELETE',
                url: 'https://cycling-app.herokuapp.com/parts/' + partId,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
        }

    }

})();
