
    var assignforce = angular.module( "batchApp" );

    assignforce.controller( "locationCtrl", function($scope, $window, locationService) {
        console.log("Beginning location controller.");
        var lc = $scope;

        lc.getLocations = locationService.getAllLocations(function(response) {
            lc.locations = response.data
        });

        lc.submitAndVerify = function(nLocation) {
            lc.updateTask = locationService.saveLocation(nLocation);
            lc.createLocation = !lc.createLocation;
            $window.location.reload();
        }
    });