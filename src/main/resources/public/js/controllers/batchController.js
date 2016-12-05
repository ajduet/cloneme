
    var assignforce = angular.module( "batchApp" );

    assignforce.controller( "batchCtrl", function($scope, batchService, curriculumService, skillService, trainerService, locationService, calendarService ) {
        console.log("Beginning create batch controller.");
        var bc = this;

          // functions
            // calls showToast method of aCtrl
        bc.showToast = function( message ) {
            $scope.$parent.aCtrl.showToast( message );
        };

            // changes form state and populates fields if need-be
        bc.changeState = function( newState, incomingBatch ) { 
            console.log("  (BC)  Changing to state [" + newState + "] from [" + bc.state + "].");
            bc.state = newState;
            // bc.initialize(incomingBatch); 
        };

            // select end date based on start date
        bc.selectEndDate = function() {
            var startDate = new Date(bc.batch.startDate);
            bc.batch.endDate = new Date( startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 67 );
        };

            // disables weekends in datepickers
        bc.disableWeekends = function( date ) {
            if ( date.getDay() == 0 || date.getDay() == 6 ) {
                return false;
            } else {
                return true;
            }
        };

            // filters rooms based on selected location
        bc.filterRooms = function(locationID){
            if(locationID != undefined){
                return this.locations.filter(function(location){return location.id===locationID})[0].rooms;
            }
            else {
                return [];
            }
        };

            // counts the number of weeks between the start and end dates
        bc.updateWeeks = function() {
            var weeks = calendarService.countWeeks( bc.batch.startDate, bc.batch.endDate );
            if (!weeks) {
                bc.weeksSpan = "spans 0 weeks";
            } else {
                bc.weeksSpan = "spans " + weeks + " weeks";
            }
        };

            // outputs progress as a percent
        bc.calcProgress = function( paramLow, paramHigh ) {

            if (!paramLow || !paramHigh) {
                return 0;
            }

            var today = new Date().getTime();
            var diff = paramHigh - paramLow;

            today -= paramLow;
            
            var percent = (today * 100 / diff).toFixed(5);
            if ( percent < 0 ) {
                return 0;
            } else if ( percent > 100 ) {
                return 100;
            } else {
                return (today * 100 / diff).toFixed(5);
            }
        };

            // resets form
        bc.resetForm = function() {
            batchService.getEmptyBatch( function(response) {
                console.log("  (BC)  Resetting form.");
                bc.batch = response;
            }, function(error) {
                console.log("  (BC)  Failed to reset form with error:", error.data.message);
                bc.showToast( "Could not reset form.");
            });
        };

            // table checkbox functions
              // toggle all
        bc.toggleAll = function() {

            if ( bc.batchesSelected.length == bc.batches.length ) {
                bc.batchesSelected = [];
            } else {
                bc.batchesSelected = bc.batches;
            }
        };
              // check if all are selected
        bc.allSelected = function() {
            return bc.batchesSelected.length == bc.batches.length;
        }

              // checks box if batch is in batchesSelected list
        bc.exists = function(batch) {
            return bc.batchesSelected.indexOf( batch ) > -1;
        };

              // adds/removes batch from batchesSelected list
        bc.toggle = function(batch) {

            var idx = bc.batchesSelected.indexOf(batch);
            if (idx == -1) {
                bc.batchesSelected.push(batch);
            } else {
                bc.batchesSelected.splice( idx, 1 );
            }
        };

            // batch table button functions
        bc.edit = function() {

            if (bc.batchesSelected.length != 1) {
                bc.showToast("Please select a single batch.");
            }
        };

        bc.clone = function() {
            bc.showToast( "Test toast." );
            // console.log($scope);
        };

        bc.delete = function() {

        };

            // saves/updates batch
        bc.saveBatch = function(isValid) {
            if (isValid) {
                console.log("Saving batch.");
            } else {
                console.log("Invalid form.");
            }
        };

          // data
        bc.weeksSpan = "spans 0 weeks";
        bc.batchOrder = "startDate";

        // bc.batches = [];
        bc.batchesSelected = [];

            // state information
        bc.state = "create";
        bc.stateMux = { "create": { "header": "Create new batch",
                                    "submit": "Create new batch" },
                        "edit"  : { "header": "Edit batch",
                                    "submit": "Save changes" },
                        "clone" : { "header": "Create clone",
                                    "submit": "Save clone" } };

          // page initialization
            // data gathering
        batchService.getAll( function(response) {
            console.log("  (BC)  Retrieving all batches.")
            bc.batches = response;
        }, function(error) {
            console.log("  (BC)  Failed to retrieve all batches with error:", error.data.message);
            bc.showToast( "Could not fetch batches.");
        });

        curriculumService.getAll( function(response) {
            console.log("  (BC)  Retrieving all curricula.")
            bc.curricula = response;
        }, function(error) {
            console.log("  (BC)  Failed to retrieve all curricula with error:", error.data.message);
            bc.showToast( "Could not fetch curricula.");
        });

        // skillService.getAll( function(response) {
        //     console.log("  (BC)  Retrieving all skills.")
        //     bc.skills = response;
        // }, function(error) {
        //     console.log("  (BC)  Failed to retrieve all skills with error:", error.data.message);
            // bc.showToast( "Could not fetch skills.");
        // });

        trainerService.getAll( function(response) {
            console.log("  (BC)  Retrieving all trainers.")
            bc.trainers = response;
        }, function(error) {
            console.log("  (BC)  Failed to retrieve all trainers with error:", error.data.message);
            bc.showToast( "Could not fetch trainers.");
        });

        locationService.getAll( function(response) {
            console.log("  (BC)  Retrieving all locations.")
            bc.locations = response;
        }, function(error) {
            console.log("  (BC)  Failed to retrieve all locations with error:", error.data.message);
            bc.showToast( "Could not fetch locations.");
        });

    });