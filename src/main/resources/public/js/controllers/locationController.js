var assignforce = angular.module("batchApp");

assignforce.controller( "locationCtrl", function($scope, $window, locationService, roomService) {
    console.log("Beginning location controller.");
    var lc = this;

    lc.location = locationService.getEmptyLocation();
    lc.roomInfo = {};
	lc.locationState = 'create';
	lc.roomState = 'create';
    lc.locationAlerts = [];
    lc.roomAlerts = [];
    lc.locations = [];
    lc.isCollapsed = {addLocation:true, addRoom:true};
	lc.USStates = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
		'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN',
		'TX','UT','VT','VA','WA','WV','WI','WY'];

	lc.locationStateInfo = {edit:{title:'Edit Location',button:'Edit location'},create:{title:'Add Location',button:'Save new location'}};
    lc.roomStateInfo = {edit:{title:'Edit Room',button:'Edit room'},create:{title:'Add Room',button:'Save new room'}};

    lc.closeAlert = function(type, index){
    	if (type === 'location'){
            lc.locationAlerts.splice(index,1);
		}
		else {
    		lc.roomAlerts.splice(index,1);
		}
    };

    lc.cancel = function(type){
    	if(type === 'location'){
            lc.isCollapsed['addLocation'] = true;
            lc.location = locationService.getEmptyLocation();
            lc.locationState = 'create';
            lc.locationAlerts = [];
		}
		else{
            lc.isCollapsed['addRoom'] = true;
            lc.roomState = 'create';
            lc.roomInfo = {};
            lc.roomAlerts = [];
		}

	};

    lc.changeCollapsedForm = function(name){
    	lc.isCollapsed['addLocation'] = true;
    	lc.isCollapsed['addRoom'] = true;
    	lc.isCollapsed[name] = false;
	};

    lc.changeCollapsed = function(name){
    	lc.isCollapsed[name] = !lc.isCollapsed[name];
    };

    lc.fetchLocations = function() {
        locationService.getAll(
            function (locationData) {
                lc.locations = locationData;
                lc.locations.forEach(function (location) {
                    lc.isCollapsed[location.name] = true;
                });
                console.log("Successfully pulled locations");
            },
            function (error) {
                console.log(error.data.message);
            }
        );
    };

    lc.saveLocation = function(isValid){
    	lc.locationAlerts = [];
    	if(isValid){
    		if(lc.locationState === 'create'){
                locationService.create(
                    lc.location,
                    function(){
                        console.log('Location created successfully');
                        lc.location = locationService.getEmptyLocation();
                        lc.fetchLocations();
                    },
                    function(error){
                        console.log(error.data.message);
                    }
                );
			}
			else if (lc.locationState === 'edit'){
				locationService.update(
					lc.location,
					function(){
						console.log('Location editted successfully');
						lc.location = locationService.getEmptyLocation();
						lc.fetchLocations();
					},
					function(error){
						console.log(error.data.message);
					}
				)
			}
			lc.isCollapsed['addLocation'] = true;
			lc.locationState = 'create';

		}
		else{
    		if(!lc.location.name){
    			lc.locationAlerts.push({type: 'alert-danger', message: 'Name is required'});
			}
			if(!lc.location.city){
    			lc.locationAlerts.push({type: 'alert-danger', message: 'City is required'});
			}
			if(!lc.location.state){
				lc.locationAlerts.push({type: 'alert-danger', message: 'State is required'});
			}
		}
	};

    lc.editLocation = function(location){
        lc.locationState = 'edit';
		lc.isCollapsed['addLocation'] = false;
		lc.location = location;
	};

    lc.deleteLocation = function(location){
		locationService.delete(
			location,
			function(){
				console.log('Successfully deleted location');
				lc.fetchLocations();
			},
			function(error){
				console.log(error.data.message);
			}
		);
	};

    lc.saveRoom = function(isValid){
    	lc.roomAlerts = [];
		if(isValid){
			if(lc.roomState === 'create'){
                var room = roomService.getEmptyRoom();
                if(lc.roomInfo.building){
                    room.roomName = lc.roomInfo.building+'-'+lc.roomInfo.name;
                }
                else{
                    room.roomName = lc.roomInfo.name;
                }

                var location = lc.roomInfo.location;
                location.rooms.push(room);
                locationService.update(
                    location,
                    function(){
                        console.log('Created room successfully');
                    },
                    function(error){
                        console.log(error.data.message);
                    }
                );
			}
			else if(lc.roomState === 'edit'){
                var room = roomService.getEmptyRoom();
                room.roomID = lc.roomInfo.roomID;
                if(lc.roomInfo.building){
                    room.roomName = lc.roomInfo.building+'-'+lc.roomInfo.name;
                }
                else{
                    room.roomName = lc.roomInfo.name;
                }

                roomService.update(
                	room,
					function(){
                		console.log('Room updated succesfully');
                        lc.roomInfo = {};
                		lc.fetchLocations();
					},
					function(error){
						console.log(error.data.message);
					}
				);
			}
			lc.isCollapsed['addRoom'] = true;
			lc.roomState = 'create';
		}
		else {
			if(!lc.roomInfo.name){
				lc.roomAlerts.push({type: 'alert-danger', message: 'Name is required'});
			}
			if(!lc.roomInfo.location){
				lc.roomAlerts.push({type: 'alert-danger', message: 'Location is required'});
			}
		}
	};

    lc.editRoom = function(room){
		lc.roomState = 'edit';
		lc.isCollapsed['addRoom'] = false;
		lc.roomInfo = {};
		lc.roomInfo.roomID = room.roomID;
		if(room.roomName.includes('-')){
			var roomSplit = room.roomName.split('-');
			lc.roomInfo.building = roomSplit[0];
			lc.roomInfo.name = roomSplit[1];
		}
		else{
			lc.roomInfo.name = room.roomName;
		}
	};

    lc.deleteRoom = function(room){
    	var resourceRoom = roomService.cloneRoom(room);
    	roomService.delete(
    		resourceRoom,
			function(){
    			console.log('Room successfully deleted');
    			lc.fetchLocations();
			},
			function(error){
				console.log(error.data.message);
			}
		);
	};

    lc.fetchLocations();

});