
	var assignforce = angular.module( "batchApp" );

	assignforce.controller( "allBatchCtrl", function($scope, $location, allBatchService, transferService) {

		console.log("Beginging all batches controller.")
		var abc = $scope;

		  // functions
		abc.getBatches = allBatchService.getAllBatches(function(response) {
			abc.Batches = response.data
		});
		
		abc.createDate = function(ms){
			return allBatchService.createDate(ms);
		}
		
		abc.editBatch = function(id){
			transferService.set(id);
			$location.path("/createBatch");
		}

	});

