
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

		  // send info to batchCtrl for editing
		abc.edit = function(batch) {
			abc.$broadcast( "state", { state: "edit", 
									   batch: batch });
		};

		  // send info to batchCtrl for cloning
		abc.clone = function(batch) {
			abc.$broadcast( "state", { state: "clone", 
									   batch: batch });
		};

		abc.$on( "repull", function( event, data ) {
			console.log("  (ABC) Repulling batches");
			abc.Batches = data.batches;
			console.log(abc.Batches);
		});

		//   // add new batch to list
		// abc.$on( "add", function(batch) {
		// 	abc.Batches.push(batch);	
		// });

		//   // edit existing batch in list
		// abc.$on( "edit", function(batch) {

		// 	for (var i = 0; i < abc.Batches.length; i++) {
		// 		if (abc.Batches[i].batchID == batch.batchID) {
		// 			abc.Batches[i] = batch;
		// 		}
		// 	}
		// });

	});

