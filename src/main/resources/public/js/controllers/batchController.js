
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
					console.log("  (BC)  Successfully pulled batches.");
					bc.batches = batchData;
					$scope.$broadcast( "timeline", {batches: bc.batches})
				},
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

        bc.delete = function(batch) {
            batchService.delete(batch, function() {
                console.log("  (BC)  Batch successfully deleted.");
                if (bc.batches.indexOf( batch ) != -1) {
                    console.log("Before:", bc.batches);
                    bc.getAllBatches();
                    console.log(" After:", bc.batches);
					$scope.$broadcast( "timeline", {batches: bc.batches})
                }
            }), function(errorMessage) {
                console.log("  (BC)  Batched failed to delete with message: ", errorMessage);
            };
        };

		$scope.$on("repull", function() {
			console.log("  (BC)  Repulling batches.");
			bc.getAllBatches();
        });
		
		bc.getAllBatches();
	});

