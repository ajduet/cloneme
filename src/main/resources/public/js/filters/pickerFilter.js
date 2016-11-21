
    var assignforce = angular.module( "batchApp" );

    assignforce.filter( "picker", function($filter) {
        return function(items, filterName) {
            if ( (filterName == "") || (filterName == undefined)) {
                return items;
            } else {
                return $filter(filterName)(items);
            }
        };
    });