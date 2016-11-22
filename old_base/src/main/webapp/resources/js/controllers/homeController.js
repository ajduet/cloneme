
    var assignforce = angular.module( "batchApp" );

    assignforce.controller( "homeCtrl", function($scope, allBatchService, batchService, trainerService) {

        console.log("Beginning dashboard controller.");
        var hc = $scope;

          // functions
            // get all batches
        hc.getBatches = allBatchService.getAllBatches( function(response) {
            console.log("  (HC) Retrieving active batches.");
            hc.active = response.data.sort( function(a,b){
                return a.batchStartDate < b.batchStartDate; 
            });
        });

            // calculate progress of batch as percentage
        hc.calcProgress = function( startDate, endDate ) {
            var today = new Date().getTime();
            var diff = endDate - startDate;

            today -= startDate;

            return "" + today * 100 / diff + "%";
        };

          // data

    });