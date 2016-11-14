
    var assignforce = angular.module( "batchApp" );

    assignforce.controller( "batchCtrl", function($scope, allBatchService, batchService, calendarService, locationService, trainerService) {//, transferService) {

        console.log("Beginning create batch controller.");
        var cbc = $scope;

          // functions
            // changes form state and populates fields if need-be
        cbc.changeState = function(newState, incomingBatch) { 
            console.log("  (CBC) Changing to state [" + newState + "] from [" + cbc.state + "].");
            cbc.state = newState;
            cbc.initialize(incomingBatch); 
        };
        cbc.edit = function(editBatch) {
            cbc.changeState("edit", editBatch);
        };
        cbc.clone = function(cloneBatch) {
            cbc.changeState("clone", cloneBatch);
        };

            // retrieve lists
        cbc.getCurrs = batchService.getCurrs(
                function(response){
                    console.log("  (CBC) Retrieving curricula.");
                    cbc.currs = response.data;
                });
        
        cbc.getTrainers = trainerService.getAllTrainers(
                function(response){
                    console.log("  (CBC) Retrieving trainers.");
                    cbc.trainers = response.data;
                });
        
        cbc.getLocations = locationService.getAllLocations(
                function(response){
                    console.log("  (CBC) Retrieving locations.");
                    cbc.locations = response.data;

                    for (var i = 0; i < cbc.locations.length; i++) {
                        if (cbc.locations[i].locationID == 0) {
                            cbc.locations.splice(i);
                            break;
                        }
                    };

                    if (cbc.rooms != null) {
                        cbc.roomLoc = batchService.attachRooms(cbc.locations, cbc.rooms);
                    }
                });

        cbc.getRooms = batchService.getRooms(
                function(response){
                    console.log("  (CBC) Retrieving rooms.");
                    cbc.rooms = response.data
                    if (cbc.locations != null) {
                        cbc.roomLoc = batchService.attachRooms(cbc.locations, cbc.rooms);
                    }
                });

          // auto increment end date to 10 weeks ahead of chosen start date
        cbc.setEndDate = function() {
            var startDate = new Date(cbc.startDate);
            cbc.endDate = new Date( startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 67).getTime();
        };

          // change weeks label
        cbc.updateWeeks = function() {
            cbc.weeks = calendarService.countWeeks(cbc.startDate, cbc.endDate);
        };

          // changes dropdown CSS
        cbc.noPlaceholder = function() {
        };

          // change default option to "none"
        cbc.changeToNone = function() {
            event.target.children[0].label = "No" + event.target.children[0].innerText.toLowerCase().replace("*", "") + "selected";
        };

          // functions for skillSearchItem directives
        cbc.remove = function() {
            cbc.skills.splice( cbc.skills.indexOf( event.target.parentElement.innerText.replace(" clear", "") ), 1);
        };

          // save/update batch
        cbc.saveBatch = function(){
            
            var ID;
            if (cbc.state == "edit") {
                ID = cbc.batchID;
            } else {
                ID = "NEW";
            }

            var curr = cbc.curr;
            if (curr == null) {
                curr = "No curriculum selected";
            }

            var trainer = cbc.trainer;
            if (trainer == null) {
                trainer = "No trainer selected";
            }
            
            var cotrainer = cbc.cotrainer;
            if (cotrainer == null) {
                cotrainer = "No trainer selected";
            }

            var room = cbc.room;
            if (room == null) {
                room = "Dummy LocID" + cbc.location.locationID;
            }

            cbc.updateTask = batchService.saveBatch(cbc.batchName, "J2EE", curr, trainer, room, cbc.startDate, cbc.endDate, cbc.batchID, function() {
                allBatchService.getAllBatches(function(response) {
				    cbc.$emit( "repull", { batches: response.data });
			    });
            });
        }

        cbc.validate = function() {
            console.log("  (CBC) Validating inputs.");

            var valid = 1;

              // batch name
            if (cbc.batchName == undefined || cbc.batchName == "") {
                $("#name").addClass("invalidInput");
                valid = 0;                
            } else {
                $("#name").removeClass("invalidInput");
            }

            //   // curriculum
            // if (cbc.curr == null) {
            //     $("#curr").addClass("invalidInput");
            //     valid = 0;                
            // } else {
            //     $("#curr").removeClass("invalidInput");
            // }

            //   // trainer
            // if (cbc.trainer == null) {
            //     $("#trainer").addClass("invalidInput");
            //     valid = 0;                
            // } else {
            //     $("#trainer").removeClass("invalidInput");
            // }

            //   // cotrainer
            // if (cbc.cotrainer == null) {
            //     $("#cotrainer").addClass("invalidInput");
            //     valid = 0;                
            // } else {
            //     $("#cotrainer").removeClass("invalidInput");
            // }

              // location
            if (cbc.location == null) {
                $("#location").addClass("invalidInput");
                valid = 0;
            } else {
                $("#location").removeClass("invalidInput");
            }

            //   // room
            // if (cbc.room == null) {
            //     $("#room").addClass("invalidInput");
            //     valid = 0;                
            // } else {
            //     $("#room").removeClass("invalidInput");
            // }

            if (valid == 1) {
                console.log("    All fields valid.");
                cbc.saveBatch();
            }
        };

          // print batch info
        cbc.printBatch = function() {
            console.log("Name       :", cbc.batchName,
                      "\nCurriculum :", cbc.curr,
                      "\nTrainer    :", cbc.trainer,
                      "\nCotrainer  :", cbc.cotrainer,
                      "\nLocation   :", cbc.location,
                      "\nRoom       :", cbc.room,
                      "\nStart date :", cbc.startDate,
                      "\nEnd date   :", cbc.endDate,
                      "\nBatchID    :", cbc.batchID );
        };

          // remove placeholder coloring
        cbc.removeGrey = function() {
            event.target.style.color = "#000000";
        };

          // enable selection of room
        cbc.enableRoom = function() {
            cbc.roomDis = false;
        };

          // initialize fields
        cbc.initialize = function(incomingBatch) {
            
            // cbc.distributeRooms();

            switch(cbc.state) {
                case "create":
                    break;
                case "edit": 
                case "clone":

                    if (incomingBatch == null) {
                        console.log("    Invalid batch.");
                        break;
                    }

                    console.log("    Populating fields.");
                    cbc.batchName = incomingBatch.bName;
                    cbc.batchID   = (cbc.state == "edit") ? incomingBatch.batchID : 0;
                    cbc.curr      = incomingBatch.batchCurriculumID.curriculumName;
                    cbc.trainer   = incomingBatch.batchTrainerID.trainerFirstName;
                    cbc.cotrainer = incomingBatch.batchTrainerID.trainerFirstName; // correct once cotrainer added to database
                    cbc.location  = incomingBatch.batchRoomID.locationID.locationName;
                    cbc.room      = incomingBatch.batchRoomID.roomName;
                    cbc.startDate = incomingBatch.batchStartDate;
                    cbc.endDate   = incomingBatch.batchEndDate;

                    cbc.updateWeeks();

                    break;
            }
        };

          // data
            // current state and the changes associated with it 
        cbc.state = "create";                         
        cbc.stateChanges = { "create": { "header": "Create new batch",
                                         "submit": "Create new batch" },
                             "edit"  : { "header": "Edit batch",
                                         "submit": "Save changes" },
                             "clone" : { "header": "Create clone",
                                         "submit": "Save clone" } };

            // connection of trainer skills to curricula
        cbc.skillCurr = { "Java": [ "Core Java", "SQL", "Servlets/JSPs", "HTML/CSS", "JavaScript", "Hiberante", "Spring", "Web Services", "AngularJS" ],
                          ".NET": [ "Core C#", "ADO.NET", "ASP.NET", "Web Services", "HTML/CSS", "JavaScript", "AngularJS", "Entity" ],
                          "SDET": [ "Core Java", "SQL", "Servlets/JSPs", "HTML/CSS", "Selenium/WebDriver", "QTP/UFT", "Cucumber", "Web Services" ],
                          "Misc": [ "DevOps: Git", "DevOps: Maven", "DevOps: Jenkins", "DevOps: SonarQube", "DevOps: JIRA", "DevOps: Tomcat" ] };

        cbc.roomDis = true;

          // configurations
            // calendar configs
        cbc.dateOptions = {
            showWeeks: true
        };
        cbc.isDisabledDate = function(currentDate, mode) {
            return mode === 'day' && (currentDate.getDay() === 0 || currentDate.getDay() === 6);
        };

          // broadcasters/listeners
            // listens for an event "state" to be broadcasted to change states to the supplied state and populates fields grom given batch 
        cbc.$on( "state", function( event, data ){
            cbc.changeState(data.state, data.batch);
        });

          // initialize page
        cbc.initialize(null);

        // var response = batchService.getBatch(
        //         function(response){
        //             cbc.weeks = calendarService.countWeeks(response.data.batchStartDate, response.data.batchEndDate);
        //             cbc.changeState("clone", response.data);
        //         },
        //         48);

        

    });