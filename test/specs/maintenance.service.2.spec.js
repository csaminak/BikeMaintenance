(function() {
    'use strict';

    var assert = chai.assert;

    suite('maintenance service functions (sendParts, getParts, getBikes, getABike)', function() {
        var maintenance, $httpBackend, $rootScope;

        setup(module('cyclist'));

        setup(inject(function(_maintenance_, _$httpBackend_, _$rootScope_) {
            maintenance = _maintenance_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;

            $httpBackend
                .whenGET('/app/templates/general-info/home.template.html')
                .respond('<h2>Home Page for Cycling App</h2>');

            $httpBackend
                .when('POST', 'https://cycling-app.herokuapp.com/oauth/strava', {
                    code: '32twehdtu8'
                })
                .respond({
                    client: {
                        id: 5,
                        first_name: 'firstname',
                        last_name: 'lastname',
                        email: 'email@email.com'
                    },
                    athlete: {},
                    access_token: '54657o8iyugi'
                });

            $httpBackend
                .when('POST', 'https://cycling-app.herokuapp.com/parts.json', {
                    'part_type': 'Brake',
                    'description': 'Disc',
                    'bike_id': 2,
                    'mounted_on': '09/01/2015'
                })
                .respond({});

            $httpBackend
                .whenGET('https://cycling-app.herokuapp.com/parts')
                .respond([
                    {
                        'bike_id': 4,
                        'part_type': 'Brake',
                        'description': 'Disc',
                        'mounted_on': '09/01/2015'
                    }
                ]);

            $httpBackend
                .whenGET('https://cycling-app.herokuapp.com/bikes.json')
                .respond([
                    {
                        'bike_id': 4,
                        'model': 'Road',
                        'name': 'Coolest Bike Ever',
                        'client_id': 6
                    }
                ]);

            $httpBackend
                .whenGET('https://cycling-app.herokuapp.com/bikes/1')
                .respond({});

            maintenance.login('32twehdtu8')
                .then(function() {
                    return {
                        id: 5,
                        first_name: 'firstname',
                        last_name: 'lastname',
                        email: 'email@email.com'
                    };
                })
                .catch(function(err) {
                    return err;
                });

        }));

        teardown(function() {
            maintenance.logout();
        });

        test('maintenance service functions exist', function() {
            assert.isFunction(maintenance.sendParts, 'sendParts fn exists!');
            assert.isFunction(maintenance.getParts, 'getParts fn exists!');
            assert.isFunction(maintenance.getBikes, 'getBikes fn exists!');
            assert.isFunction(maintenance.getABike, 'getABike fn exists!');
        });

        test('sendParts executes when correct data is passed', function(done) {
            var result = maintenance.sendParts({
                'part_type': 'Brake',
                'description': 'Disc',
                'bike_id': 2,
                'mounted_on': '09/01/2015'
            });

            result
                .then(function(response) {
                    assert.isObject(response);
                    done();
                })
                .catch(function() {
                    assert.fail('should not be in fail if correct data is passed');
                    done();
                });

            $httpBackend.flush();
            $rootScope.$digest();
        });

        test('sendParts does not execute when part_type is not passed', function(done) {
            var result = maintenance.sendParts({
                'description': 'Disc',
                'bike_id': 2,
                'mounted_on': '09/01/2015'
            });

            result
                .then(function() {
                    assert.fail('should not be in then if there is no part_type for part.');
                    done();
                })
                .catch(function(err) {
                    assert.instanceOf(err, Error, 'err is a type of error.');
                    assert.strictEqual(err.message, 'Need the type of part to save part.');
                    done();
                });

            $httpBackend.flush();
            $rootScope.$digest();
        });

        test('sendParts does not execute when description is not passed', function(done) {
            var result = maintenance.sendParts({
                'part_type': 'Brake',
                'bike_id': 2,
                'mounted_on': '09/01/2015'
            });

            result
                .then(function() {
                    assert.fail('should not be in then if there is no description for part.');
                    done();
                })
                .catch(function(err) {
                    assert.instanceOf(err, Error, 'err is a type of error.');
                    assert.strictEqual(err.message,
                                'Need the specfic description for selected part.');
                    done();
                });

            $httpBackend.flush();
            $rootScope.$digest();
        });

        test('sendParts does not execute when bike_id is not passed', function(done) {
            var result = maintenance.sendParts({
                'part_type': 'Brake',
                'description': 'Disc',
                'mounted_on': '09/01/2015'
            });

            result
                .then(function() {
                    assert.fail('should not be in then if there is no bike_id for part.');
                    done();
                })
                .catch(function(err) {
                    assert.instanceOf(err, Error, 'err is a type of error.');
                    assert.strictEqual(err.message, 'Need to know the bike to attach part to.');
                    done();
                });

            $httpBackend.flush();
            $rootScope.$digest();
        });

        test('sendParts does not execute when mounted_on data is not passed', function(done) {
            var result = maintenance.sendParts({
                'part_type': 'Brake',
                'description': 'Disc',
                'bike_id': 2
            });

            result
                .then(function() {
                    assert.fail('should not be in then if there is no mounted_on date for part.');
                    done();
                })
                .catch(function(err) {
                    assert.instanceOf(err, Error, 'err is a type of error.');
                    assert.strictEqual(err.message, 'Need to know when part was attached to bike.');
                    done();
                });

            $httpBackend.flush();
            $rootScope.$digest();
        });

        test('getParts returns expected data', function(done) {
            var result = maintenance.getParts(4);
            assert.isObject(result, 'result is an object.');
            assert.isFunction(result.then, 'result has a then method.');
            assert.isFunction(result.catch, 'result has a catch method.');

            result
                .then(function(parts) {
                    console.log('parts', parts);
                    assert.instanceOf(parts, Array, 'the returned value is an array.');
                    assert.isObject(parts[0], 'data inside parts is an object.');
                    assert.strictEqual(parts[0].bike_id, 4, 'each part has a bike id');
                    done();
                })
                .catch(function() {
                    assert.fail('should not be in catch if correct data in passed.');
                    done();
                });
            $httpBackend.flush();
            $rootScope.$digest();
        });

        test('getParts returns an error when bikeId isn\'t passed', function(done) {
            var result = maintenance.getParts();

            result
                .then(function() {
                    assert.fail('should not be in then if no bikeId is given');
                    done();
                })
                .catch(function(err) {
                    assert.instanceOf(err, Error, 'error is a type of error');
                    assert.strictEqual(err.message, 'no bike id provided');
                    done();
                });

            $httpBackend.flush();
            $rootScope.$digest();
        });

        test('getBikes returns expected data', function(done) {
            var result = maintenance.getBikes(6);
            result
                .then(function(bikes) {
                    assert.instanceOf(bikes, Array, 'getBikes returns an array of bikes');
                    assert.isObject(bikes[0], 'bikes array has object');
                    done();
                })
                .catch(function() {
                    assert.fail('should not be in catch if correct data is passed');
                    done();
                });
            $httpBackend.flush();
            $rootScope.digest();
        });

        test('getBikes returns an error if no cyclistId is provided', function(done) {
            var result = maintenance.getBikes();
            result
                .then(function() {
                    assert.fail('should not be in then if no cyclistId is provided');
                    done();
                })
                .catch(function(err) {
                    assert.instanceOf(err, Error, 'err is a type of error');
                    assert.strictEqual(err.message, 'no cyclist Id provided');
                    done();
                });
            $httpBackend.flush();
            $rootScope.digest();
        });

        test('getABike returns expected data when called', function(done) {
            var result = maintenance.getABike(1);
            result
                .then(function(response) {
                    assert.isObject(response);
                    done();
                })
                .catch(function() {
                    assert.fail('should not be in catch if provided a bikeId');
                    done();
                });
            $httpBackend.flush();
            $rootScope.digest();
        });

        test('getABike returns an err when bikeId is not provided', function(done) {
            var result = maintenance.getABike();
            result
                .then(function() {
                    assert.fail('should not be in catch if bikeId is not provided');
                    done();
                })
                .catch(function(err) {
                    assert.strictEqual(err.message, 'no bike id provided');
                    done();
                });
            $httpBackend.flush();
            $rootScope.digest();
        });

    });

})();
