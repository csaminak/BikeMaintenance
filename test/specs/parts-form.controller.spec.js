(function() {
    'use strict';

    var assert = chai.assert;

    suite('bike-form controller', function() {

        var partsCtrl, $rootScope;
        var mockMaintenanceService = {};
        var mockState = {};

        setup(module('cyclist'));

        setup(module(function($provide) {
            $provide.value('$state', mockState);
            $provide.value('maintenance', mockMaintenanceService);
        }));

        setup(inject(function($controller, $q, _$rootScope_) {
            $rootScope = _$rootScope_;

            mockMaintenanceService.getBikes = function(clientId) {
                if(!clientId) {
                    return $q.reject('no cyclist Id provided');
                }
                return $q.resolve({data: {}});
            };

            mockMaintenanceService.user = function() {
                return {
                    id: 4,
                    email: 'email@email.com'
                };
            };

            mockMaintenanceService.sendParts = function(part) {
                if(!part) {
                    return $q.reject('No parts to add.');
                }
                if(!part.part_type) {
                    return $q.reject('Need the type of part to save part.');
                }
                if(!part.description) {
                    return $q.reject('Need the specfic description for selected part.');
                }
                return $q.resolve({data:{}});
            };

            mockState.go = function(stateName) {
                mockState.go.called++;
                mockState.go.argument = stateName;
            };
            mockState.go.called = 0;

            partsCtrl = $controller('PartsFormController');

        }));

        test('PartsFormController has expected data', function() {
            assert.isFunction(partsCtrl.sendPart, 'sendPart is a function');
            assert.isArray(partsCtrl.allBikes, 'allBike is an array');
            assert.isObject(partsCtrl.part, 'part is an object');
        });

        test('sendPart does not execute if there is no data', function(done) {
            var result = partsCtrl.sendPart();

            result
                .then(function() {
                    assert.fail('should not be in then without any params');
                    done();
                })
                .catch(function(err) {
                    assert.instanceOf(err, Error, 'err would be a type of error');
                    assert.strictEqual(err.message,
                                        'Sorry, you have not selected any parts to add.');
                    done();
                });
            $rootScope.$digest();
        });

        test('sendPart executes', function(done) {
            var part = {
                bike_id: 1,
                part_type: 'Brakes',
                description: 'clip'
            };
            var result = partsCtrl.sendPart(part);

            result
                .then(function(response) {
                    assert.isObject(response);
                    done();
                })
                .catch(function() {
                    assert.fail('should not be in fail if the correct data is passed');
                    done();
                });
            $rootScope.$digest();
        });

    });


})();
