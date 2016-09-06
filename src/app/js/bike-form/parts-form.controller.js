(function() {
    'use strict';

    angular.module('cyclist')
        .controller('PartsFormController', PartsFormController);

    PartsFormController.$inject = ['maintenance'];

    function PartsFormController(maintenance) {
        var that = this;
        this.allBikes = [];
        this.part = {};
        this.errorMsg = '';
        this.sendPart = sendPart;
        this.user = maintenance.user();


        /**
         * Gets all the bikes for a user.
         * @return {VOID}
         */
        maintenance.getBikes(this.user.id)
            .then(function(bikes) {
                if(bikes.length < 1) {
                    that.errorMsg = 'Sorry, you don\'t have any bikes.\
                                        Please add a bike before adding a part.';
                    that.allBikes = null;
                    return;
                }
                that.allBikes = bikes;
            })
            .catch(function(err) {
                console.log(err);
            });

        /**
         * Takes a part and sends it to the service function to get added into db.
         * @param  {Object}          part    The part user adds
         * @return  {Promise Object}
         */
        function sendPart(part) {
            if(!part) {
                that.errorMsg = 'Sorry, you have not selected any parts to add.';
                return;
            }
            if(!part.part_type) {
                that.errorMsg = 'Sorry, must select a part-type to add.';
                return;
            }
            if(!part.description) {
                that.errorMsg = 'Sorry, what is the name of this part?';
                return;
            }
            console.log(part);
            return maintenance.sendParts(part)
                .then(function() {
                    that.part = {};
                })
                .catch(function(err) {
                    console.log(err);
                });
        }


    }

})();
