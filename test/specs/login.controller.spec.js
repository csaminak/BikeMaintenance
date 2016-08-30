(function() {
    'use strict';

    var assert = chai.assert;

    suite('login controller', function() {

        var loginCtrl, $rootScope, $httpBackend;
        var mockMaintenanceService = {};
        var mockState = {};

        setup(module('cyclist'));

        setup(module(function($provide) {
            $provide.value('$state', mockState);
            $provide.value('maintenance', mockMaintenanceService);
        }));

        setup(inject(function($controller, $q, _$rootScope_, _$httpBackend_) {
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;

            $httpBackend
                .whenGET('/app/templates/general-info/home.template.html')
                .respond('<h2>Home Page for Cycling App</h2>');

            loginCtrl = $controller('LoginController');
        }));

        test('authorizeCyclist fn redirects user', function() {
            assert.isFunction(loginCtrl.authorizeCyclist, 'authorizeCyclist is a fn');
        });



    });

})();
