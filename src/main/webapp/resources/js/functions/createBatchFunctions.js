
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