(function() {
    'use strict';

    var assert = chai.assert;

    suite('nav controller', function() {

        var navCtrl;
        var mockMaintenanceService = {};
        var mockState = {};

        setup(module('cyclist'));

        setup(module(function($provide) {
            $provide.value('$state', mockState);
            $provide.value('maintenance', mockMaintenanceService);
        }));

        setup(inject(function($controller) {

            mockMaintenanceService.isLoggedIn = function() {
                return false;
            };

            mockMaintenanceService.logout = function() {
                return; //TODO When logout function is compelte
            };

            mockState.go = function(stateName) {
                mockState.go.called++;
                mockState.go.argument = stateName;
            };
            mockState.go.called = 0;

            navCtrl = $controller('NavController');
        }));


        test('isLoggedIn function returns expected value', function() {
            assert.isFunction(navCtrl.isLoggedIn, 'isLoggedIn is a fn');
            var result = navCtrl.isLoggedIn();
            assert.isBoolean(result, 'isLoggedIn returns a boolean value');
        });

        test('logout function returns expected value', function() {
            assert.isFunction(navCtrl.logout, 'logout is a fn');
            navCtrl.logout();
            assert.strictEqual(mockState.go.called, 1);
            assert.strictEqual(mockState.go.argument, 'home');
        });

    });

})();
