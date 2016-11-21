var app = angular.module("batchApp");

app.controller('trainerCtrl', function(trainerService) {
	console.log("Beginning trainer controller.");
    var tc = this;
    
    //Pull Trainer Data
    tc.trainers = [];
    trainerService.getAll(
    	function(trainerData){
    		console.log("Successfully pulled trainers");
    		tc.trainers = trainerData;
    	},
    	function(error){
    		console.log(error.data.message);
    	}
    );
    
});