
	var assignforce = angular.module( "batchApp" );

	assignforce.controller( "allBatchCtrl", function($scope, $location, allBatchService, transferService) {

		console.log("Beginging all batches controller.")
		var abc = $scope;

		// functions
		
		abc.selectedBatch;
		
		abc.highlightBatch = function(batch){
			if(abc.selectedBatch !== undefined){
				d3.select('#id'+abc.selectedBatch.batchID)
					.attr('filter',null);
			}
			console.log(batch);
			abc.selectedBatch = batch;
			console.log(abc.selectedBatch);
			d3.select('#id'+batch.batchID)
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
			abc.$broadcast( "repullTimeline", data );
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

