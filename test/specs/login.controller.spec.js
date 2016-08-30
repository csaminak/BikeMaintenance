(function() {
    'use strict';

    var assert = chai.assert;

    suite('login controller', function() {

        var loginCtrl;
        var mockMaintenanceService = {};

        setup(module('cyclist'));

        setup(module(function($provide) {
            $provide.value('maintenance', mockMaintenanceService);
        }));

        setup(inject(function($controller) {
            loginCtrl = $controller('LoginController');
        }));

        test('authorizeCyclist fn redirects user', function() {
            assert.isFunction(loginCtrl.login, 'authorizeCyclist is a fn');
        });

    });

})();
