var assignforce = angular.module("batchApp");

assignforce.controller( "locationCtrl", function($scope, $window, locationService) {
    console.log("Beginning location controller.");
    var lc = this;

    lc.location = {};

    lc.alerts;

    lc.closeAlert = function(index){
        lc.alerts.splice(index,1);
    };

    lc.isCollapsed = {addLocation:true};
    
    lc.changeCollapsed = function(name){
    	lc.isCollapsed[name] = !lc.isCollapsed[name];
    };

    lc.locations = [];

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
                error.data.message;
            }
        );
    };

    lc.fetchLocations();

    lc.saveLocation = function(isValid){
    	lc.alerts = [];
    	if(isValid){
    		locationService.create(
    			lc.location,
				function(){
    				console.log('Location created successfully');
    				lc.fetchLocations();
				},
				function(error){
					console.log(error.data.message);
				}
			);
		}
		else{
    		if(!lc.location.name){
    			lc.alerts.push({type: 'alert-danger', message: 'Name is required'});
			}
			if(!lc.location.city){
    			lc.alerts.push({type: 'alert-danger', message: 'City is required'});
			}
			if(!lc.location.state){
				lc.alerts.push({type: 'alert-danger', message: 'State is required'});
			}
		}
	};

});