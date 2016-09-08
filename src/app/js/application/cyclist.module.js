(function() {
    'use strict';

    angular.module('cyclist', ['ui.router'])
        .config(cyclistConfig);
        // .run(cyclistStartup);

    cyclistConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function cyclistConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/not-found');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/app/templates/general-info/home.template.html'
            })
            .state('about', {
                url: '/about-us',
                templateUrl: '/app/templates/general-info/about-us.template.html'
            })
            .state('bike-stats', {
                url: '/bike-stats',
                templateUrl: '/app/templates/bike-stats/bike-stats.template.html',
                controller: 'BikeStatsController',
                controllerAs: 'bsCtrl',
                // secure: true
            })
            .state('bike-form', {
                url: '/bike-info',
                templateUrl: '/app/templates/bike-form/bike-form.template.html',
                controller: 'BikeFormController',
                controllerAs: 'bikeFormCtrl',
                // secure: true
            })
            .state('parts-form', {
                url: '/parts-info',
                templateUrl: '/app/templates/bike-form/parts-form.template.html',
                controller: 'PartsFormController',
                controllerAs: 'partsFormCtrl',
                // secure: true
            })
            .state('login', {
                url: '/authenticate',
                templateUrl: '/app/templates/account/login.template.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl',
                params: {
                    message: null
                }
            })
            .state('get-token', {
                url: '/get-token',
                templateUrl: '/app/templates/account/token.template.html',
                controller: 'TokenController',
                controllerAs: 'tokenCtrl'
            })
            .state('404', {
                url: '/not-found',
                templateUrl: '/app/templates/application/404.template.html'
            })
            .state('server', {
                url: '/issue',
                templateUrl: '/app/templates/application/serverIssue.template.html',
                controller: 'ServerIssueController',
                controllerAs: 'siCtrl',
                params: {
                    message: null
                }
            });
    }

    // cyclistStartup.$inject = ['$rootScope', '$state', 'maintenance'];
    //
    // function cyclistStartup($rootScope, $state, maintenance) {
    //     $rootScope.$on('$stateChangeStart', function(e, toState) {
    //         if(toState.secure && !maintenance.isLoggedIn()) {
    //             e.preventDefault();
    //
    //             $state.go('login', {
    //                 message: 'Please login first.'
    //             });
    //         }
    //     });
    // }



})();
