(function() {
    'use strict';

    var assert = chai.assert;

    suite('token controller', function() {

        var tokenCtrl, $rootScope;
        var mockMaintenanceService = {};

        setup(module('cyclist'));

        setup(module(function($provide) {
            $provide.value('maintenance', mockMaintenanceService);
        }));

        setup(inject(function($controller, $q, _$rootScope_) {
            $rootScope = _$rootScope_;
            mockMaintenanceService.login = function(code) {
                if(code) {
                    return $q.resolve({'code': code});
                } else {
                    return $q.reject(new Error('no code obtained to send.'));
                }
            };
            tokenCtrl = $controller('TokenController');
        }));

        test('errorMsg exists', function() {
            assert.isString(tokenCtrl.errorMsg);
        });

    });

})();
