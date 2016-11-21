var assignforce = angular.module("batchApp");

assignforce.controller( "locationCtrl", function($scope, $window, locationService) {
    console.log("Beginning location controller.");
    var lc = this;

    lc.isCollapsed = {};
    
    lc.changeCollapsed = function(location){
    	lc.isCollapsed[location.name] = !lc.isCollapsed[location.name];
    };

    lc.locations = [];
    locationService.getAll(
    	function(locationData) {
    		lc.locations = locationData;
    		lc.locations.forEach(function(location){lc.isCollapsed[location.name]=true;});
    		console.log("Successfully pulled locations");
    	},
    	function(error){
    		error.data.message;
    	}
    );

});