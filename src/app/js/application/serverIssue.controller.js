(function() {
    'use strict';

    angular.module('cyclist')
        .controller('ServerIssueController', ServerIssueController);

    ServerIssueController.$inject = ['$stateParams'];

    function ServerIssueController($stateParams) {
        this.message = $stateParams.message;
    }

})();
