/**
 * allbatches.js
 * 
 * 
 * js for allbatches
 */


var app = angular.module("batchApp");


app.controller("allBatchCtrl", function($scope, $location, allBatchService, transferService) {
	
	$scope.selectedBatch;
	
	$scope.highlightBatch = function(batch){
		if($scope.selectedBatch !== undefined){
			d3.select('#'+$scope.selectedBatch.batchTrainerID.trainerFirstName+$scope.selectedBatch.batchStartDate)
				.attr('filter',null);
		}
		$scope.selectedBatch = batch;
		d3.select('#'+batch.batchTrainerID.trainerFirstName+batch.batchStartDate)
			.attr('filter', 'url(#highlight)');
	};
	
	$scope.getBatches = allBatchService.getAllBatches(function(response) {
		$scope.Batches = response.data;
	});
	
	$scope.createDate = function(ms){
		return allBatchService.createDate(ms);
	}
	
	$scope.editBatch = function(id){
		transferService.set(id);
		$location.path("/createbatches");
	}

});// end app.controller("allBatchCtrl")

app.service("allBatchService", function($http, $q) {
	this.getAllBatches = function(success,failure) {
		$http.get("rest/batches").then(success,failure);
	}
	
	this.createDate = function(ms){
		var date = new Date(ms).toDateString();

		if(date == "Invalid Date"){
			console.log("here");
			return "";
		}
		return date;
	}// end createDate
			

});// end app.service("batchService")

