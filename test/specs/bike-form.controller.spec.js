(function() {
    'use strict';

    var assert = chai.assert;

    suite('bike-form controller', function() {

        var bfCtrl, $rootScope;
        var mockMaintenanceService = {};
        var mockState = {};

        setup(module('cyclist'));

        setup(module(function($provide) {
            $provide.value('$state', mockState);
            $provide.value('maintenance', mockMaintenanceService);
        }));

        setup(inject(function($controller, $q, _$rootScope_) {
            $rootScope = _$rootScope_;

            mockMaintenanceService.addBike = function(bikeData) {
                if(!bikeData) {
                    return $q.reject('no data for bike to add');
                }
                if(!bikeData.name) {
                    return $q.reject('name of bike is missing');
                }
                if(!bikeData.model) {
                    return $q.reject('model of bike is missing');
                }

                return $q.resolve({data: {}});
            };

            mockMaintenanceService.user = function() {
                return {id: 5, email: 'email@email.com', name: {}};
            };

            mockState.go = function(stateName) {
                mockState.go.called++;
                mockState.go.argument = stateName;
            };
            mockState.go.called = 0;

            bfCtrl = $controller('BikeFormController');

        }));

        test('BikeFormController has expected data', function() {
            assert.isFunction(bfCtrl.addBike, 'addBike is a function');
            assert.isObject(bfCtrl.bike, 'bike is an object');
            assert.isString(bfCtrl.errorMsg, 'errorMsg is a string');
        });

        test('addBike can be called and will return data', function(done) {
            var bikeData = {
                client_id: 5,
                name: 'My Cool Bike',
                model: 'Model Bike'
            };

            var result = bfCtrl.addBike(bikeData);

            assert.isFunction(result.then, 'result has a then method.');
            assert.isFunction(result.catch, 'result has a catch method.');

            result
                .then(function() {
                    assert.strictEqual(mockState.go.called, 1);
                    assert.strictEqual(mockState.go.argument, 'parts-form');
                    done();
                })
                .catch(function() {
                    assert.fail('should not be in fail if all data is correct');
                    done();
                });
            $rootScope.$digest();
        });

        test('addBike is not called when there is no data', function(done) {
            var result = bfCtrl.addBike();
            result
                .then(function() {
                    assert.fail('should not be in then if no params are given');
                    done();
                })
                .catch(function(err) {
                    assert.instanceOf(err, Error, 'err should be a type of Error');
                    assert.strictEqual(err.message, 'No information about bike to submit.');
                    done();
                });

            //Needed because i'm returning a promise
            $rootScope.$digest();
        });

        test('addBike won\'t run if there is no name in bikeData', function(done) {
            var bikeData = {
                client_id: 5,
                model: 'Model Test'
            };
            var result = bfCtrl.addBike(bikeData);

            result
                .then(function() {
                    assert.fail('should not be in then if there is no name for bike');
                    done();
                })
                .catch(function(err) {
                    assert.instanceOf(err, Error, 'err should be a type of Error');
                    assert.strictEqual(err.message, 'Please name your bike to easily identify it.');
                    done();
                });
            $rootScope.$digest();
        });

        test('addBike won\'t run if there is no model in bikeData', function(done) {
            var bikeData = {
                client_id: 5,
                name: 'Bike Test'
            };
            var result = bfCtrl.addBike(bikeData);

            result
                .then(function() {
                    assert.fail('should not be in then if no model for bike is given');
                    done();
                })
                .catch(function(err) {
                    assert.instanceOf(err, Error, 'err should be a type of Error');
                    assert.strictEqual(err.message, 'Need to know the type of bike.');
                    done();
                });
            $rootScope.$digest();
        });

    });


})();
