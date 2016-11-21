
    var assignforce = angular.module( "batchApp" );

    assignforce.filter( "upcoming", function() {
        return function(items) {

            var weeks = 2;
              // define time given number of weeks from now
            var now = new Date().getTime();
            var future = now + 604800000 * weeks;
            var result = [];

            items.forEach( function(item) {
                if ( (item.startDate > now) && (item.startDate < future) ) {
                    result.push(item);
                } 
            });

            return result;
        };
    });