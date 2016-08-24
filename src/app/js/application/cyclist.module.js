(function() {
    'use strict';

    angular.module('cyclist', ['ui.router'])
        .config(cyclistConfig);

    cyclistConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function cyclistConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/404');

        $stateProvider
            .state('home', {

            })
            .state('about', {

            })
            .state('profile', {

            })
            .state('bike-stats', {

            })
            .state('bike-form', {

            })
            .state('ride-form', {

            })
            .state('login', {

            })
            .state('create-account', {

            })
            .state('contact', {

            })
            .state('404', {

            });

    }




})();
