var assignforce = angular.module("batchApp");

assignforce.controller( "locationCtrl", function($scope, $window, locationService) {
    console.log("Beginning location controller.");
    var lc = this;

    lc.location = locationService.getEmptyLocation();

    lc.alerts = [];
    lc.locations = [];
    lc.isCollapsed = {addLocation:true};
	lc.states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
		'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN',
		'TX','UT','VT','VA','WA','WV','WI','WY'];

    lc.closeAlert = function(index){
        lc.alerts.splice(index,1);
    };

    lc.cancel = function(name){
    	lc.isCollapsed[name] = true;
    	lc.location = locationService.getEmptyLocation();
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
    	lc.alerts = [];
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

    lc.fetchLocations();

});