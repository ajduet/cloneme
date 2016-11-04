
    var assignforce = angular.module( "batchApp" );

    assignforce.controller( "batchCtrl", function($scope, batchService, calendarService, locationService, trainerService) {//, transferService) {

        console.log("Beginning create batch controller.");
        var cbc = $scope;

          // functions
            // changes form state and populates fields if need-be
        cbc.changeState = function(newState, incomingBatch) { 
            console.log("  Changing to state [" + newState + "] from [" + cbc.state + "].");
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
                    console.log("  Retrieving curricula.");
                    cbc.currs = response.data;
                });
        
        cbc.getTrainers = trainerService.getAllTrainers(
                function(response){
                    console.log("  Retrieving trainers.");
                    cbc.trainers = response.data;
                });
        
        cbc.getLocations = locationService.getAllLocations(
                function(response){
                    console.log("  Retrieving locations.");
                    cbc.locations = response.data
                    if (cbc.rooms != null) {
                        cbc.roomLoc = batchService.attachRooms(cbc.locations, cbc.rooms);
                    }
                });

        cbc.getRooms = batchService.getRooms(
                function(response){
                    console.log("  Retrieving rooms.");
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

          // changes all dropdowns to imported data
        cbc.autofill = function() {

            var i;
            var children = $("#curr")[0].children;
            for (i = 0; i < children.length; i++) {
                console.log(children[i].label, cbc.curr);
                if (children[i].label == cbc.curr) {
                    console.log("  Match!");

                    console.log($("#curr")[0].selectedIndex);
                    $("#curr")[0].selectedIndex = i;
                    console.log($("#curr")[0].selectedIndex);
                    children[i].selected = true;
                    // $("#curr")[0].selectedIndex = i;
                }
            }
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
                    cbc.curr      = incomingBatch.batchCurriculumID.curriculumName;
                    cbc.trainer   = incomingBatch.batchTrainerID.trainerFirstName;
                    cbc.cotrainer = incomingBatch.batchTrainerID.trainerFirstName; // correct once cotrainer added to database
                    cbc.location  = incomingBatch.batchRoomID.locationID.locationName;
                    cbc.room      = incomingBatch.batchRoomID.roomName;
                    cbc.startDate = incomingBatch.batchStartDate;
                    cbc.endDate   = incomingBatch.batchEndDate;

                    cbc.autofill();

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

        cbc.skills = cbc.skillCurr.Java;

          // configurations
            // calendar configs
        cbc.dateOptions = {
            showWeeks: true
        };
        cbc.isDisabledDate = function(currentDate, mode) {
            return mode === 'day' && (currentDate.getDay() === 0 || currentDate.getDay() === 6);
        };

          // initialize page
        cbc.initialize(null);

        var response = batchService.getBatch(
                function(response){
                    cbc.weeks = calendarService.countWeeks(response.data.batchStartDate, response.data.batchEndDate);
                    cbc.changeState("edit", response.data);
                },
                48);

        cbc.test = function() {
            console.log("Name       :", cbc.batchName,
                      "\nCurriculum :", cbc.curr.curriculumName,
                      "\nTrainer    :", cbc.trainer.trainerFirstName,
                      "\nCotrainer  :", cbc.cotrainer.trainerFirstName,
                      "\nLocation   :", cbc.location[0].locationName,
                      "\nRoom       :", cbc.room.roomName,
                      "\nStart date :", cbc.startDate,
                      "\nEnd date   :", cbc.endDate );
        };

    });