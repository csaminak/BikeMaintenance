(function() {
    'use strict';

    var assert = chai.assert;

    suite('login controller', function() {

        var loginCtrl;

        setup(module('cyclist'));

        setup(inject(function($controller) {
            loginCtrl = $controller('LoginController');
        }));

        test('login function redirects user', function() {
            assert.isFunction(loginCtrl.login, 'login is a fn');
        });

    });

})();
