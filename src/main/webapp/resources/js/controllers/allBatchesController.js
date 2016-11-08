
	var assignforce = angular.module( "batchApp" );

	assignforce.controller( "allBatchCtrl", function($scope, $location, allBatchService, transferService) {

		console.log("Beginging all batches controller.")
		var abc = $scope;

		// functions
		
		abc.selectedBatch;
		
		abc.highlightBatch = function(batch){
			if($scope.selectedBatch !== undefined){
				d3.select('#'+$scope.selectedBatch.batchTrainerID.trainerFirstName+$scope.selectedBatch.batchStartDate)
					.attr('filter',null);
			}
			$scope.selectedBatch = batch;
			d3.select('#'+batch.batchTrainerID.trainerFirstName+batch.batchStartDate)
				.attr('filter', 'url(#highlight)');
		};
		
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

