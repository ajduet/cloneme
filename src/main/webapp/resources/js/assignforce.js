
	var assignforce = angular.module( "batchApp", ['ngRoute', 'ui.bootstrap', 'ui.bootstrap.datetimepicker']);
		
		  // url routing
		assignforce.config(['$routeProvider', function($routeProvider){
			$routeProvider
				.when("/home", {
					templateUrl : "index.html"
				})
				.when("/batches", {
					templateUrl : "html/views/batches.html",
					controller  : "allBatchCtrl"
				})
				.when("/trainers", {
					templateUrl : "html/views/trainers.html",
					controller  : "trainerCtrl"
				})
				.when("/locations", {
					templateUrl : "html/views/locations.html",
					controller  : "locationCtrl"
				});
		}]);
