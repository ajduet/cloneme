var assignforce = angular.module("batchApp");

assignforce.controller( "locationCtrl", function($scope, $window, locationService, roomService) {
    console.log("Beginning location controller.");
    var lc = this;

    lc.location = locationService.getEmptyLocation();
    lc.roomInfo = {};

    lc.locationAlerts = [];
    lc.roomAlerts = [];
    lc.locations = [];
    lc.isCollapsed = {addLocation:true, addRoom:true};
	lc.states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
		'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN',
		'TX','UT','VT','VA','WA','WV','WI','WY'];

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
            lc.locationAlerts = [];
		}
		else{
            lc.isCollapsed['addRoom'] = true;
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

    lc.saveRoom = function(isValid){
    	lc.roomAlerts = [];
		if(isValid){
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

			/*roomService.create(
				room,
				function(newRoom){
					console.log('Room created successfully');
					var location = lc.roomInfo.location;
					location.rooms.push(newRoom);
					locationService.update(
						location,
						function(){
							console.log('Room added to location successfully');
							lc.fetchLocations();
						},
						function(error){
							console.log(error.data.message)
						}
					);
				},
				function(error){
					console.log(error.data.message);
				}
			);*/
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

    lc.fetchLocations();

});