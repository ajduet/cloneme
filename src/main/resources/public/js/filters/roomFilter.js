
    var assignforce = angular.module( "batchApp" );
    
    assignforce.filter( "roomFilter", function() {
        return function(locations, selLocID) {
            
            if (locations == null) {
                return locations;
            }

            locations.forEach( function(location) {
                console.log(location);
                if (location.id == selLocID) {
                    console.log(location.rooms);
                    return location.rooms;
                }
            });
            return [];
        };
    });