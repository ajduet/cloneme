
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
                cbc.locations = response.data
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
            cbc.updateTask = batchService.saveBatch(cbc.batchName, "J2EE", cbc.curr, cbc.trainer, cbc.room, cbc.startDate, cbc.endDate, cbc.batchID, function() {
                
                allBatchService.getAllBatches(function(response) {
				    cbc.$emit( "repull", { batches: response.data });
			    });
            });
        }

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

          // update searchable skills
        cbc.updateCurr = function() {
            if (cbc.curr != undefined) {
                cbc.searchableSkills = cbc.skillCurr["Misc"].concat(cbc.skillCurr[cbc.curr]);
            } else {
                cbc.searchableSkills = cbc.skillCurr["Misc"];
            }
        };

          // add chosen skill to skill list
        cbc.addToSkills = function(data) {
            if (data != undefined) {
                cbc.skills.push(data.title);
            }
        };

          // initialize fields
        cbc.initialize = function(incomingBatch) {

            cbc.skills = [];
            cbc.searchableSkills = [];

            switch(cbc.state) {
                case "create":
                    break;
                case "edit": 
                case "clone":

                    if (incomingBatch == null) {
                        console.log("    Invalid batch.");
                        break;
                    }

                    console.log("    (CBC) Populating fields.");
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
        cbc.skillCurr = { "Java": [ { skill: "Core Java"},         { skill: "SQL"},                { skill: "Servlets/JSPs"}, 
                                    { skill: "HTML/CSS"},          { skill: "JavaScript"},         { skill: "Hiberante"}, 
                                    { skill: "Spring"},            { skill: "Web Services"},       { skill: "AngularJS"} ],

                          ".NET": [ { skill: "Core C#"},           { skill: "ADO.NET"},            { skill: "ASP.NET"}, 
                                    { skill: "Web Services"},      { skill: "HTML/CSS"},           { skill: "JavaScript"}, 
                                    { skill: "AngularJS"},         { skill: "Entity"} ],

                          "SDET": [ { skill: "Core Java"},         { skill: "SQL"},                { skill: "Servlets/JSPs"}, 
                                    { skill: "HTML/CSS"},          { skill: "Selenium/WebDriver"}, { skill: "QTP/UFT"}, 
                                    { skill: "Cucumber"},          { skill: "Web Services"} ],

                          "Misc": [ { skill: "DevOps: Git"},       { skill: "DevOps: Maven"},      { skill: "DevOps: Jenkins"}, 
                                    { skill: "DevOps: SonarQube"}, { skill: "DevOps: JIRA"},       { skill: "DevOps: Tomcat"} ] };

        cbc.searchableSkills = cbc.skillCurr["Misc"];

          // configurations
            // calendar configs
        cbc.dateOptions = {
            showWeeks: true
        };
        cbc.isDisabledDate = function(currentDate, mode) {
            return mode === 'day' && (currentDate.getDay() === 0 || currentDate.getDay() === 6);
        };

            // typeahead configs
        cbc.onAdd = function () {
            if (_.isObject($scope.selectedItem)) {
                var exists = _.find($scope.people, function (person) {
                    return person.id === $scope.selectedItem.id;
                });

                if (!exists) {
                    $scope.people.push($scope.selectedItem);
                }

                // a blank string will tell the control to clear/reset.
                $scope.selectedItem = '';
            }
        };

        cbc.onFilter = function (parsedResponse) {
            // Remove any users already in the person list.
            return _.filter(parsedResponse, function (item) {
                return !_.find($scope.people, function (person) {
                    return person.id === item.id;
                });
            });
        };

        cbc.onSave = function () {
            // ...
        };

          // broadcasters/listeners
            // listens for an event "state" to be broadcasted to change states to the supplied state and populates fields grom given batch 
        cbc.$on( "state", function( event, data ){
            cbc.changeState(data.state, data.batch);
        });

          // initialize page
        cbc.initialize(null);

    });