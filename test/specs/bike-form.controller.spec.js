(function() {
    'use strict';

    var assert = chai.assert;

    suite('bike-form controller', function() {

        var bfCtrl, $rootScope,$httpBackend;
        var mockMaintenanceService = {};
        var mockState = {};

        setup(module('cyclist'));

        setup(module(function($provide) {
            $provide.value('$state', mockState);
            $provide.value('maintenance', mockMaintenanceService);
        }));

        setup(inject(function($controller, $q, _$rootScope_, _$httpBackend_) {
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;

            $httpBackend
                .whenGET('/app/templates/general-info/home.template.html')
                .respond('<h2>Home Page for Cycling App</h2>');

            mockMaintenanceService.addBike = function(bikeData) {
                if(bikeData.name && bikeData.model) {
                    return $q.resolve({data: {}});
                } else {
                    return $q.reject('either name or model of bike is missing');
                }
            };

            bfCtrl = $controller('BikeFormController');

        }));

        test('addBike is a function', function() {
            assert.isFunction(bfCtrl.addbike, 'addBike is a function');
        });

        // test('addBike is not called when no data', function(done) {
        //     var result = bfCtrl.addBike();
        //     result
        //         .then(function() {
        //             assert.fail('should not be in then if no params are given');
        //             done();
        //         })
        //         .catch(function() {
        //             assert.strictEqual('either name or model of bike is missing');
        //             done();
        //         });
        //
        // $httpBackend.flush();
        //
        // });


    });


})();
