
	var app = angular.module("batchApp");

	app.controller("batchCtrl", function($scope, batchService) {
		console.log("Beginging batches controller.")
        var bc = this;

		bc.selectedBatch;
		bc.batches;
		
		bc.highlightBatch = function(batch){
			if(bc.selectedBatch !== undefined){
				d3.select('#id'+bc.selectedBatch.id)
					.attr('filter',null);
			}
			bc.selectedBatch = batch;
			d3.select('#id'+batch.id)
				.attr('filter', 'url(#highlight)');
		};
		
		bc.getAllBatches = function(){
			batchService.getAll(
				function(batchData){
					console.log("Successfully pulled batches");
					bc.batches = batchData;
					$scope.$broadcast("timeline",{batches: bc.batches})
				}.bind(bc),
				function(error){
					console.log(error.data.errorMessage);
				}
			);
		};

		  // send info to batchCtrl for editing
		bc.edit = function(batch) {
			$scope.$broadcast( "state", { state: "edit", 
									   batch: batch });
		};

		  // send info to batchCtrl for cloning
		bc.clone = function(batch) {
			$scope.$broadcast( "state", { state: "clone", 
									   batch: batch });
		};

		$scope.$on("repull", function() {
			console.log("  (ABC) Repulling batches");
			bc.getAllBatches();
        });
		
		bc.getAllBatches();
	});

