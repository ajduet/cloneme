
    var assignforce = angular.module( "batchApp" );

    assignforce.filter( "activeBatch", function() {
        return function(items) {

            if (items == undefined) {
                return items;
            }
            
            var now = new Date().getTime();
            var result = [];

            items.forEach( function(batch) {
                if ( (batch.batchStartDate < now) && (batch.batchEndDate > now) ) {
                    result.push( batch );
                }
            });

            return result;
        };
    });