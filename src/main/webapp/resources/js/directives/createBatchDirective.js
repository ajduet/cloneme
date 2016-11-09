
    var assignforce = angular.module( "batchApp" );

    assignforce.directive( "createBatch", function() {
        return {
            restrict    : "AE",
            controller  : "batchCtrl",
            templateUrl : "html/views/createbatches.html" 
        }
    });