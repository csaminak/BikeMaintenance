(function() {
    'use strict';

    var assert = chai.assert;

    suite('maintenance service functions', function() {
        var maintenance, $httpBackend;

        setup(module('cyclist'));

        setup(inject(function(_maintenance_, _$httpBackend_) {
            maintenance = _maintenance_;
            $httpBackend = _$httpBackend_;

            $httpBackend
                .whenGET('/app/templates/general-info/home.template.html')
                .respond('<h2>Home Page for Cycling App</h2>');

            $httpBackend
                .when('POST', 'https://cycling-app.herokuapp.com/oauth/strava', {
                    code: '32twehdtu8'
                })
                .respond({
                    client: {
                        token: 'd4756ruytgt678oygy',
                        id: 5
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
            assert.isFunction(maintenance.addBike, 'login fn exists!');
            assert.isFunction(maintenance.sendParts, 'login fn exists!');
            assert.isFunction(maintenance.getBikes, 'login fn exists!');
        });

        test('login sends a code and gets back user data', function(done) {
            var result = maintenance.login('32twehdtu8');
            assert.isObject(result);
            assert.isFunction(result.then);
            assert.isFunction(result.catch);
            result
                .then(function(client) {
                    assert.isObject(client);
                    assert.isString(client.id);
                    assert.isString(client.token);
                    done();
                })
                .catch(function(err) {
                    console.log(err);
                    assert.fail('should not be in catch if all info is submitting');
                    done();
                });
            done();
            $httpBackend.flush();
        });









    });

})();
