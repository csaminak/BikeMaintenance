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


    });

})();
