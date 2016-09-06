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

            mockMaintenanceService.getParts = function(bikeId) {
                if(!bikeId) {
                    return $q.reject(new Error('no bike id provided'));
                }
                return $q.resolve([
                    {'bike_id': '5'}, {'bike_id': '7'}
                ]);
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

        test('', function() {

        });



    });

})();
