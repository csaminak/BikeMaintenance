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
                url: '/about-us',
                templateUrl: '/app/templates/general-info/about-us.template.html',
                controller: '',
                controllerAs: ''
            })
            .state('profile', {
                url: '/profile',
                templateUrl: '/app/templates/profile/profile.template.html',
                controller: '',
                controllerAs: ''
            })
            .state('bike-stats', {
                url: '/bike-stats',
                templateUrl: '/app/templates/**',
                controller: '',
                controllerAs: ''
            })
            .state('bike-form', {
                url: '/bike-info',
                templateUrl: '/app/templates/**',
                controller: '',
                controllerAs: ''
            })
            .state('ride-form', {
                url: '/ride-info',
                templateUrl: '/app/templates/**',
                controller: '',
                controllerAs: ''
            })
            .state('login', {
                url: '/authenticate',
                templateUrl: '/app/templates/**',
                controller: '',
                controllerAs: ''
            })
            .state('create-account', {
                url: '/create-account',
                templateUrl: '/app/templates/**',
                controller: '',
                controllerAs: ''
            })
            .state('contact', {
                url: '/contact-us',
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
