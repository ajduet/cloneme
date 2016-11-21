
    var assignforce = angular.module( "batchApp" );

    assignforce.controller( "homeCtrl", function($scope, batchService, trainerService, locationService) {
        console.log("Beginning dashboard controller.");
        var hc = this;

          // functions
            // calculate progress of batch as percentage
        hc.calcProgress = function( startDate, endDate ) {

            var today = new Date().getTime();
            var diff = endDate - startDate;

            today -= startDate;
            
            var percent = (today * 100 / diff).toFixed(5);
            if ( percent < 0 ) {
                return "0%";
            } else if ( percent > 100 ) {
                return "100%";
            } else {
                return "" + (today * 100 / diff).toFixed(5) + "%";
            }
        };

            // calulates and formats percentage
        hc.calcPercent = function( low, high ){

            if (low == 0) {
                return "0%";
            } else {
                return "" + ( low * 100 / high ).toFixed(5) + "%";
            }
        };

        hc.switchAvailable = function(unavailable) {

            if (hc.checkAvailability(unavailable) == "Available") {
                return "100%";
            } else {
                return "0%";
            }
        };

            // checks given list of timespans to see if current date resides within any of them
        hc.checkAvailability = function(dates) {
            
            var availability = "Available";
            var now = new Date().getTime();
            dates.forEach( function(item) {
                 if ( (item.startDate <= now) && (item.endDate > now) ) {
                    availability = "Unavailable";
                }
            });

            return availability;
        };

          // data
            // get all batches
        hc.batches = [];
        batchService.getAll(function(response) {
            console.log("  (HC) Retrieving all batches.");
            hc.batches = response;
        }, function() {
            console.log("  (HC) Error retrieving all batches.");
        });
        
            // get all trainers 
        hc.trainers = [];
        trainerService.getAll(function(response) {
            console.log("  (HC) Retrieving all trainers.");
            hc.trainers = response;
        }, function() {
            console.log("  (HC) Error retrieving all trainers.");
        });

            // get all locations 
        hc.locations = [];
        locationService.getAll(function(response) {
            console.log("  (HC) Retrieving all locations.");
            hc.locations = response;
        }, function() {
            console.log("  (HC) Error retrieving all locations.");
        });

            // date filter presets
        hc.filterPresets = { active  : { mode  : "active",
                                         params: {} },
                             upcoming: { mode  : "upcoming",
                                         params: { numWeeks: 2} },
                             none    : { mode  : "none",
                                         params: {} }
        };
        
            // radio button initial selections
        hc.batchRadio = hc.filterPresets["active"];
        hc.trainerRadio = hc.filterPresets["active"];
        hc.locationRadio = hc.filterPresets["active"];

    });