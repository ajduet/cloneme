
    var assignforce = angular.module( "batchApp" );

    assignforce.service( "allBatchService", function($http, $q) {
        var abs = this;
        
        abs.getAllBatches = function(callback) {
            $http.get("../rest/batches").then(callback);
        }
        
        abs.createDate = function(ms){
            var date = new Date(ms).toDateString();

            if(date == "Invalid Date"){
                return "";
            }
            return date;
        }
    });