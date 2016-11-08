
    var assignforce = angular.module( "batchApp" );

    assignforce.controller('batchCtrl', function($scope, batchService, trainerService, locationService, transferService){

    //	$scope.submitButton = !isNaN(batchID) ? "Create Batch" : "Update Batch";
        $scope.submitButton = "Create Batch";
        
        $scope.viewBatch = batchService.getBatch(
                //passed in callback
                function(response){
                    console.log("i hope this works..");
                    console.log("response: ");
                    console.log(response);
                    console.log("ENDresponse: ");

                    transferService.set(null);
                    setTimeout(initViewData(response), 30000);

                }, 
                transferService.get()
        );

        $scope.noPlaceholder = function() {
            this.parentElement.style.color = "black";
        };

        $scope.skillCurr = { "Java": [ "Core Java", "Servlets/JSPs", "Hiberante", "Spring" ],
                            ".NET": [ "" ],
                            "SDET": [ "" ],
                            "Misc": [ "DevOps: Git", "DevOps: Maven", "DevOps: Jenkins", "DevOps: SonarQube", "DevOps: JIRA", "DevOps: Tomcat" ]
                            };

        $scope.locations = {};
        $scope.rooms = {};

        $scope.distributeRooms = function() {

            var roomLoc = {};
            for (var h = 0; h < $scope.locations.length; h++) {
                roomLoc[$scope.locations.locationName] = [];
            }

            for (var i = 0; i < $scope.rooms.length; i++) {
                for (var j = 0; j < $scope.locations.length; i++) {
                    if ($scope.rooms[i].locationID.locationID == $scope.locations[j].locationID) {
                        roomLoc[$scope.locations.locationName].push( [$scope.locations[j], $scope.rooms[i] ]);
                    }
                }
            }

            console.log("RoomLoc: ", roomLoc);
            $scope.roomLoc = roomLoc;
        };


        
        function initViewData(response){
            //Initializing data
            $scope.batchID = response.data.batchID;
            console.log("resp: "+ response.data.batchID);
            console.log("scopeBID: "+ $scope.batchID);
            
            $scope.batchName = response.data.bName;
            $scope.topic = $scope.topics[selectTopicByName(response.data.batchTopicID.topicName)];
            $scope.curr = $scope.currs[selectCurrByName(response.data.batchCurriculumID.curriculumName)];
            $scope.date = new Date(response.data.batchStartDate);
            $scope.date2 = new Date(response.data.batchEndDate);

    //		$scope.topic = $scope.topics[selectTopicByName(response.data.batchTopicID.topicName)];
            $scope.room = $scope.rooms[selectRoomByName(response.data.batchRoomID.roomName)];
            $scope.trainer = $scope.trainers[selectTrainerByName(response.data.batchTrainerID.trainerFirstName)];

        }
        
        
        function selectRoomByName(name){
            for(var i = 0; i < $scope.rooms.length; i++){
                if(name === $scope.rooms[i].roomName){
                    return i;
                }
            }
        }
        
        function selectTrainerByName(name){
            console.log("trainers?");
            console.log($scope.trainers);
            for(var i = 0; i < $scope.trainers.length; i++){
                if(name === $scope.trainers[i].trainerFirstName){
                    return i;
                }
            }
        }
        
        function selectCurrByName(currName){
            for(var i = 0; i < $scope.currs.length; i++){
                if(currName === $scope.currs[i].curriculumName){
                    return i;
                }
            }
            
        }
        
        
        function selectTopicByName(topicName){
            for(var i = 0; i < $scope.topics.length; i++){
                if(topicName === $scope.topics[i].topicName){
                    return i;
                }
            }
        }
        
        $scope.getCurrs = batchService.getCurrs(
                //passed in callback
                function(response){
                    console.log("Curricula: ", response)
                    $scope.currs = response.data;
                });
        
        $scope.getTrainers = trainerService.getAllTrainers(
                function(response){
                    $scope.trainers = response.data
                }
            );
        
        $scope.getTopics = batchService.getTopics(
                function(response){
                    $scope.topics = response.data
                }
            );
        
        $scope.getLocations = locationService.getAllLocations(
                function(response){
                    console.log("Locations: ", response)
                    $scope.locations = response.data
                }
            );

        $scope.getRooms = batchService.getRooms(
                function(response){
                    console.log("Rooms: ", response)
                    $scope.rooms = response.data

                    $scope.distributeRooms();
                }
            );

        $scope.saveBatch = function(batchName, topic, curr, trainer, room, date, date2, batchID){
            $scope.updateTask = 
                batchService.saveBatch(batchName, topic, curr, trainer, room, date, date2, batchID);
        }
        
        //////Date Data////////////////////////
        $scope.today = (function(){
            $scope.dt = new Date();
        })();
        
        // $scope.today();
        
        $scope.clear = function(){
            $scope.dt = null;
        };
        
        $scope.inlineOptions = {
                customClass : getDayClass,
                minDate : new Date(),
                showWeeks : true
        };
        
        $scope.dateOptions = {
                dateDisabled: disabled,
                formatYear: 'yy',
                minDate: new Date(),
                startingDay: 1
        };
        
        //Disable Weekend
        function disabled(data){
            var date = data.date,
            mode = data.mode;
            
            return mode == 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }
        
        $scope.toggleMin = function(){
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };
        
        $scope.toggleMin();
        
        $scope.open1 = function(){
            $scope.popup1.opened = true;
        };
        
        $scope.open2 = function(){
            $scope.popup2.opened = true;
        };
        
        $scope.setDate = function(year, month, day){
            $scope.dt = new Date(year, month, day);
        };

        // temporarily set end date 10 weeks ahead of selected start date
        $scope.setEndDate = function() {
            $scope.date2 = new Date( $scope.date.getFullYear(), $scope.date.getMonth(), $scope.date.getDate() + 74);
        };
        
        $scope.format = 'dd-MMM-yy';
        
        $scope.popup1 = {
            opened: false
        };
        
        $scope.popup2 = {
                opened: false
            };
        
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
            date: tomorrow,
            status: 'full'
            },
            {
            date: afterTomorrow,
            status: 'partially'
            }
        ];
        
        
        function getDayClass(data){
            var date = data.date,
            mode = data.mode;
            
            if (mode === 'day'){
                var dayToCheck = new Date(date).setHours(0,0,0,0);
                
                for(var i = 0; i < $scope.events[i].length; i++){
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
                    
                    if (dayToCheck === currentDay){
                        return $scope.events[i].status;
                    }
                }
            }
            return '';
        }
        
        
    });