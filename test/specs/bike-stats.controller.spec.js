(function() {
    'use strict';

    var assert = chai.assert;

    suite('BikeStatsController', function() {
        var bsCtrl, $rootScope;
        var mockMaintenanceService = {};

        setup(module('cyclist'));

        setup(module(function($provide) {
            $provide.value('maintenance', mockMaintenanceService);
        }));

        setup(inject(function($controller, $q, _$rootScope_) {
            $rootScope = _$rootScope_;

            mockMaintenanceService.getBikes = function(clientId) {
                if(!clientId) {
                    return $q.reject('No cyclist Id provided');
                }
                return $q.resolve({data: {}});
            };

            mockMaintenanceService.user = function() {
                return {
                    id: 4,
                    email: 'email@email.com'
                };
            };

            mockMaintenanceService.getParts = function(bikeId) {
                if(!bikeId) {
                    return $q.reject(new Error('No bike id provided'));
                }
                return $q.resolve([
                    {'bike_id': '5'}, {'bike_id': '7'}
                ]);
            };

            mockMaintenanceService.deletePart = function(partId) {
                if(!partId) {
                    return $q.reject(new Error('No part id provided'));
                }
                return $q.resolve();
            };

            bsCtrl = $controller('BikeStatsController');

        }));


        test('Controller has expected data', function() {
            assert.instanceOf(bsCtrl.allBikes, Array, 'allBikes is an array');
            assert.isFunction(bsCtrl.getParts, 'getParts is a function');
        });

        test('getParts is executed when correct data is provided', function(done) {
            var bikeId = '46';
            var result = bsCtrl.getParts(bikeId);

            assert.isFunction(result.then, 'result has a then method');
            assert.isFunction(result.catch, 'result has a catch method');

            result
                .then(function(parts) {
                    assert.instanceOf(parts, Array, 'response expected is an array.');
                    assert.instanceOf(bsCtrl.allParts, Array, 'allPart is now an array.');

                    bsCtrl.allParts.forEach(function(part) {
                        assert.isObject(part, 'each part is an object');
                        assert.isString(part.bike_id, 'each part has a bike id that is a string');
                    });

                    done();
                })
                .catch(function() {
                    assert.fail('should not be in fail if corrext data is provided');
                    done();
                });
            $rootScope.$digest();
        });

        test('getParts does not execute if no bikeId has been provided', function(done) {
            var result = bsCtrl.getParts();
            result
                .then(function() {
                    assert.fail('should not be in then if id provided.');
                    done();
                })
                .catch(function(err) {
                    assert.instanceOf(err, Error, 'err is a type of Error');
                    assert.strictEqual(err.message, 'No bike id provided');
                    done();
                });
            $rootScope.$digest();
        });

        test('deletePart is executed when partId is provided', function(done) {
            bsCtrl.allParts = [{}];
            var result = bsCtrl.deletePart('2');
            result
                .then(function() {
                    assert.instanceOf(bsCtrl.allParts, Array, 'allParts is an array');
                    done();
                })
                .catch(function() {
                    assert.fail('should not be in catch if data provided is correct.');
                    done();
                });
            $rootScope.$digest();
        });

        test('deletePart does not execute if partId is not provided', function(done) {
            var result = bsCtrl.deletePart();
            result
                .then(function() {
                    assert.fail('should not be in then if no part id is given.');
                    done();
                })
                .catch(function(err) {
                    assert.strictEqual(err.message, 'No part id provided');
                    done();
                });
            $rootScope.$digest();
        });
    });

})();
