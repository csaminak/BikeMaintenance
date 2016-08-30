(function() {
    'use strict';

    var assert = chai.assert;

    suite('token controller', function() {

        var tokenCtrl, $rootScope;
        var mockMaintenanceService = {};
        var mockState = {};

        setup(module('cyclist'));

        setup(module(function($provide) {
            $provide.value('$state', mockState);
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

            mockState.go = function(stateName) {
                mockState.go.called++;
                mockState.go.argument = stateName;
            };
            mockState.go.called = 0;

            tokenCtrl = $controller('TokenController');
        }));

        //TODO Create a test or delete if not needed
        test('', function() {

        });

    });

})();
