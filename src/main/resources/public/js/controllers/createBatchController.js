
    var assignforce = angular.module( "batchApp" );

    assignforce.controller( "createBatchCtrl", function($scope, batchService, curriculumService, locationService, roomService, trainerService, calendarService) {
        console.log("Beginning create batch controller.");
        var cbc = this;
        
          // functions
		  	// initializes batch service
        cbc.batch = batchService.getEmptyBatch();
        cbc.alerts = [];

        cbc.closeAlert = function(index){
            cbc.alerts.splice(index,1);
        };

        cbc.resetBatch = function(){
            cbc.batch = batchService.getEmptyBatch();
            cbc.changeState('create');
            cbc.alerts = [];
        };
        
            // changes form state and populates fields if need-be
        cbc.changeState = function(newState, incomingBatch) { 
            console.log("  (CBC) Changing to state [" + newState + "] from [" + cbc.state + "].");
            cbc.state = newState;
            cbc.initialize(incomingBatch); 
        };

            // retrieve lists
        curriculumService.getAll(
            function(curriculumData){
                console.log("  (CBC) Retrieved curricula.");
                cbc.curricula = curriculumData;
            },
            function(error){
                console.log(error.data.errorMessage);
            }
        );
        
        trainerService.getAll(
            function(trainerData){
                console.log("  (CBC) Retrieved trainers.");
                cbc.trainers = trainerData;
            },
            function(error){
                console.log(error.data.errorMessage);
            }
        );
        
        locationService.getAll(
            function(locationData){
                console.log("  (CBC) Retrieved locations.");
                cbc.locations = locationData;
            },
            function(error){
                console.log(error.data.errorMessage);
            }
        );
        
        cbc.filterRooms = function(locationID){
            if(locationID != undefined){
                return cbc.locations.filter(function(location){return location.id===locationID})[0].rooms;
            }
            else {
                return [];
            }
        };

            // auto increment end date to 10 weeks ahead of chosen start date
        cbc.setEndDate = function() {
            var startDate = new Date(cbc.batch.startDate);
            cbc.batch.endDate = new Date( startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 67).getTime();
        };

            // change weeks label
        cbc.updateWeeks = function() {
            cbc.weeks = calendarService.countWeeks(cbc.batch.startDate, cbc.batch.endDate);
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
        cbc.saveBatch = function(isValid){
            cbc.alerts = [];
            if(isValid) {
                switch (cbc.state) {
                    case 'edit':
                        batchService.update(
                            cbc.batch,
                            function () {
                                console.log("Successfully edited batch");
                                $scope.$emit("repull");
                                cbc.batch = batchService.getEmptyBatch();
                                cbc.alerts.push({type:'alert-success',message:'Batch successfully edited.'});
                            },
                            function (error) {
                                console.log(error.data.message);
                            }
                        );
                        break;
                    case 'create':
                    case 'clone':
                        batchService.create(
                            cbc.batch,
                            function () {
                                console.log("Successfully created batch.");
                                $scope.$emit("repull");
                                cbc.batch = batchService.getEmptyBatch();
                                cbc.alerts.push({type:'alert-success',message:'Batch successfully created.'})
                            },
                            function (error) {
                                console.log(error.data.message);
                            }
                        );
                        break;
                }
            }
            else{
                if(!cbc.batch.name){
                    cbc.alerts.push({type:'alert-danger',message:'Name required.'});
                }
                if(!cbc.batch.location){
                    cbc.alerts.push({type:'alert-danger',message:'Location required.'});
                }
            }
        };

            // initialize fields
        cbc.initialize = function(incomingBatch) {

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
                    if(cbc.state === 'edit'){
                        cbc.batch.id = incomingBatch.id;
                    }
                      // required 
                    cbc.batch.name = incomingBatch.name;
                    cbc.batch.location = incomingBatch.location.id;
                      // no required
                    if (cbc.batch.curriculum) { cbc.batch.curriculum = incomingBatch.curriculum.id; }
                    if (cbc.batch.trainer)    { cbc.batch.trainer    = incomingBatch.trainer.trainerID; }
                    if (cbc.batch.cotrainer)  { cbc.batch.cotrainer  = incomingBatch.cotrainer.trainerID; }
                    if (cbc.batch.startDate)  { cbc.batch.room       = incomingBatch.room.roomID; }
                    if (cbc.batch.curriculum) { cbc.batch.startDate  = incomingBatch.startDate; }
                    if (cbc.batch.endDate)    { cbc.batch.endDate    = incomingBatch.endDate; }

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
        $scope.$on( "state", function( event, data ){
            console.log("In event");
            cbc.changeState(data.state, data.batch);
        });

            // initialize page
        cbc.initialize(null);


    });