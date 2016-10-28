/**
 * location.js
 * 
 * stuff relating to the location viewing
 */

var app = angular.module("batchApp");

// -----------------------------------------------------------------------
// Location Section
app.controller("locationCtrl", function($scope, $window, locationService) {
	$scope.getLocations = locationService.getAllLocations(function(response) {
		$scope.locations = response.data
	});

	$scope.submitAndVerify = function(nLocation) {
		$scope.updateTask = locationService.saveLocation(nLocation);
		$scope.createLocation = !$scope.createLocation;
		$window.location.reload();
//		$state.reload():
//		locationService.getAllLocations(function(response){$scope.locations = response.data})
		//		$scope.locations += nLocation;
//		$scope.getLocations = $scope.getLocations;
	}
});// end app.controller("locationCtrl")

app.service("locationService", function($http, $q) {
	this.getAllLocations = function(callback) {
		$http.get("rest/getlocations").then(callback);
	}

	this.saveLocation = function(nLocation) {
		var promise = $http.post('rest/saveLocation', nLocation).then(function(response) {
			console.log(response + ' YAY!');
		}, function(error) {
			console.log($q.reject(error));
		})
	}//end saveLocation(nLocation)
});// end app.service("locationService")

