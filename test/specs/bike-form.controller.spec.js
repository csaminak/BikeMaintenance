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

            bfCtrl = $controller('BikeFormController');

        }));

        test('addBike is a function', function() {
            assert.isFunction(bfCtrl.addBike, 'addBike is a function');
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
