(function() {
    'use strict';

    angular.module('cyclist')
        .factory('maintenance', MaintenanceService);

    MaintenanceService.$inject = ['$http'];

    function MaintenanceService($http) {

        return {

        };


    }


})();
