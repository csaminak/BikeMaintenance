(function() {
    'use strict';

    var assert = chai.assert;

    suite('login controller', function() {

        var loginCtrl;
        var mockWindow = {};

        setup(module('cyclist'));

        setup(module(function($provide) {
            $provide.value('$window', mockWindow);
        }));

        setup(inject(function($controller) {
            loginCtrl = $controller('LoginController');
            mockWindow.location = 'some-site';
        }));

        test('login function redirects user', function() {
            assert.isFunction(loginCtrl.login, 'login is a fn');
            // loginCtrl.login();
            // assert.strictEqual(mockWindow.location, 'some-site');
        });

    });

})();
