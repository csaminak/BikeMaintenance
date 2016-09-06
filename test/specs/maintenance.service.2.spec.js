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




        }));


        test('maintenance service functions exist', function() {
            assert.isFunction(maintenance.sendParts, 'sendParts fn exists!');
            assert.isFunction(maintenance.getParts, 'getParts fn exists!');
            assert.isFunction(maintenance.getBikes, 'getBikes fn exists!');
            assert.isFunction(maintenance.getABike, 'getABike fn exists!');
        });


    });

})();
