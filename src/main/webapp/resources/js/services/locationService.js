
    var assignforce = angular.module( "batchApp" );

    assignforce.service( "locationService", function($http, $q) {
        var ls = this;

        ls.getAllLocations = function(callback) {
            $http.get("rest/getlocations").then( callback );
        }

        ls.saveLocation = function(nLocation) {
            var promise = $http.post('rest/saveLocation', nLocation).then(function(response) {
            }, function(error) {
                console.log($q.reject(error));
            })
        }

    });