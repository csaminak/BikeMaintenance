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
                    data: {
                        token: '45etycfghvgyhiuop54678',
                        athlete: {
                            firstname: 'Jane',
                            lastname: 'Doe',
                            email: 'email@email.com'
                        },
                        client: {
                            id: 5
                        }
                    }
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
                .then(function(response) {
                    assert.isObject(response.data);
                    assert.strictEqual(response.data.token, '45etycfghvgyhiuop54678');
                    assert.isObject(response.data.athlete);
                    assert.isObject(response.data.client);
                    done();
                })
                .catch(function(err) {
                    console.log(err);
                    assert.fail('should not be in catch if all info is submitting');
                    done();
                });
            $httpBackend.flush();
        });









    });

})();
