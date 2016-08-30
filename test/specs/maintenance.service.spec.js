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

        test('maintenance service functions exist', function() {
            assert.isFunction(maintenance.login, 'login fn exists!');
            assert.isFunction(maintenance.addBike, 'login fn exists!');
            assert.isFunction(maintenance.sendParts, 'login fn exists!');
            assert.isFunction(maintenance.getBikes, 'login fn exists!');
        });

    });




})();
