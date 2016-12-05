
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

            if (newState == "create") {
                bc.batch = batchService.getEmptyBatch();
            } else {
                bc.batch.name = incomingBatch.name;
                bc.batch.curriculum = (incomingBatch.curriculum) ? incomingBatch.curriculum.id : undefined;
                
                bc.batch.trainer = (incomingBatch.trainer) ? incomingBatch.trainer.trainerID : undefined;
                bc.batch.cotrainer = (incomingBatch.cotrainer) ? incomingBatch.cotrainer.trainerID : undefined;
                
                bc.batch.location = incomingBatch.location.id;
                bc.batch.room = (incomingBatch.room) ? incomingBatch.room.roomID : undefined;
                
                bc.batch.startDate = (incomingBatch.startDate) ? new Date(incomingBatch.startDate) : undefined;
                bc.batch.endDate = (incomingBatch.endDate) ? new Date(incomingBatch.endDate) : undefined;
            }
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
            console.log("  (BC)  Restting form.");
            bc.batchesSelected = [];
            bc.changeState( "create", null );
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

            // repull batches
        bc.repull = function() {
            bc.batchesSelected = [];
            bc.changeState( "create", null );
            batchService.getAll( function(response) {
                console.log("  (BC)  Retrieving all batches.")
                bc.batches = response;
            }, function(error) {
                console.log("  (BC)  Failed to retrieve all batches with error:", error.data.message);
                bc.showToast( "Could not fetch batches.");
            });
        };

            // batch table button functions
        bc.edit = function() {
            if (bc.batchesSelected.length != 1) {
                bc.showToast("Please select a single batch.");
            } else {
                bc.batch = bc.batchesSelected[0];
                bc.changeState( "edit", bc.batchesSelected[0] );
            }
        };

        bc.clone = function() {
            if (bc.batchesSelected.length != 1) {
                bc.showToast("Please select a single batch.");
            } else {
                bc.batch = bc.batchesSelected[0];
                bc.changeState( "clone", bc.batchesSelected[0] );
            }
        };

        bc.delete = function() {
            // if (bc.batchesSelected.length > 0) {
            //     bc.batchesSelected.forEach( function(batch){
                    
            //     });
            // }
            if (bc.batchesSelected.length == 1) {
                batchService.delete( bc.batchesSelected[0], function(){
                    bc.showToast("Batch deleted.");
                    bc.repull();
                }, function(error){
                    console.log("  (BC)  Failed to delete batch.");
                    bc.showToast("Failed to delete batch.");
                });
            }
        };

            // saves/updates batch
        bc.saveBatch = function(isValid) {
            
            if (isValid) {
                switch(bc.state) {
                    case "create":
                        batchService.create( bc.batch, function(response){
                            bc.showToast("Batch saved.");
                            bc.repull();
                        }, function(error){
                            console.log("  (BC)  Failed to save batch with error:", error.data.message);
                            bc.showToast("Failed to save batch.");
                        });
                        break;
                    
                    case "edit":
                        batchService.update( bc.batch, function(response){
                            bc.showToast("Batch updated.");
                            bc.repull();
                        }, function(error){
                            console.log("  (BC)  Failed to update batch with error:", error.data.message);
                            bc.showToast("Failed to update batch.");
                        });
                        break;
                    
                    case "clone":
                        bc.batch.id = undefined;
                        batchService.create( bc.batch, function(response){
                            bc.showToast("Batch cloned.");
                            bc.repull();
                        }, function(error){
                            console.log("  (BC)  Failed to clone batch with error:", error.data.message);
                            bc.showToast("Failed to clone batch.");
                        });
                        break;
                    
                    default:
                        break;
                }
            } else {
                bc.showToast("Batch form is incomplete.");
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