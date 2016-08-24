(function() {
    'use strict';

    angular.module('cyclist', ['ui.router'])
        .config(cyclistConfig);

    cyclistConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function cyclistConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/not-found');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/app/templates/general-info/home.template.html',
                controller: '',
                controllerAs: ''
            })
            .state('about', {
                url: '',
                templateUrl: '/app/templates/general-info/about-us.template.html',
                controller: '',
                controllerAs: ''
            })
            .state('profile', {
                url: '',
                templateUrl: '/app/templates/**',
                controller: '',
                controllerAs: ''
            })
            .state('bike-stats', {
                url: '',
                templateUrl: '/app/templates/**',
                controller: '',
                controllerAs: ''
            })
            .state('bike-form', {
                url: '',
                templateUrl: '/app/templates/**',
                controller: '',
                controllerAs: ''
            })
            .state('ride-form', {
                url: '',
                templateUrl: '/app/templates/**',
                controller: '',
                controllerAs: ''
            })
            .state('login', {
                url: '',
                templateUrl: '/app/templates/**',
                controller: '',
                controllerAs: ''
            })
            .state('create-account', {
                url: '',
                templateUrl: '/app/templates/**',
                controller: '',
                controllerAs: ''
            })
            .state('contact', {
                url: '',
                templateUrl: '/app/templates/general-info/contact.template.html',
                controller: '',
                controllerAs: ''
            })
            .state('404', {
                url: '/not-found',
                templateUrl: '/app/templates/application/404.template.html',
                controller: '',
                controllerAs: ''
            });

    }




})();
