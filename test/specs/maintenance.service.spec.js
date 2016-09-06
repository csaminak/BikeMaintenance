(function() {
    'use strict';

    var assert = chai.assert;

    suite('maintenance service functions', function() {
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
                        id: '5',
                        first_name: 'firstname',
                        last_name: 'lastname',
                        email: 'email@email.com'
                    },
                    athlete: {},
                    access_token: '54657o8iyugi'
                });

            $httpBackend
                .when('POST', 'https://cycling-app.herokuapp.com/oauth/strava', {
                    code: null
                })
                .respond({
                    err: {message: 'no code obtained to send.'}
                });


        }));


        //TESTS
        test('maintenance service functions exist', function() {
            assert.isFunction(maintenance.login, 'login fn exists!');
            assert.isFunction(maintenance.isLoggedIn, 'isLoggedIn fn exists!');
            assert.isFunction(maintenance.logout, 'logout fn exists!');
            assert.isFunction(maintenance.user, 'user fn exists!');
            assert.isFunction(maintenance.addBike, 'addBike fn exists!');
            assert.isFunction(maintenance.sendParts, 'sendParts fn exists!');
            assert.isFunction(maintenance.getParts, 'getParts fn exists!');
            assert.isFunction(maintenance.getBikes, 'getBikes fn exists!');
            assert.isFunction(maintenance.getABike, 'getABike fn exists!');
        });

        test('login sends a code and gets back user data', function(done) {
            var result = maintenance.login('32twehdtu8');
            assert.isObject(result);
            assert.isFunction(result.then, 'result has a then method');
            assert.isFunction(result.catch, 'result has a catch method');

            result
                .then(function(client) {
                    assert.isObject(client);
                    assert.strictEqual(client.name.first, 'firstname');
                    assert.strictEqual(client.id, '5');
                    done();
                })
                .catch(function() {
                    assert.fail('should not be in catch if all info is submitting');
                    done();
                });

            $httpBackend.flush();
            $rootScope.$digest();
        });

        test('login function does not execute if no strava code is provided', function(done) {
            var result = maintenance.login();

            result
                .then(function(done) {

                    done();
                })
                .catch(function(err) {
                    assert.instanceOf(err, Error, 'err is a type of Error');
                    assert.strictEqual(err.message, 'no code obtained to send.');
                    done();
                });
            $rootScope.$digest();
        });








    });

})();
