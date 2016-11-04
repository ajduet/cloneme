    
    var assignforce = angular.module( "batchApp" );

    assignforce.service("roomService", function($http, $q) {
        var rs = this;

        rs.getAllRooms = function(callback) {
            $http.get("rest/getRooms").then(callback);
        }
    });