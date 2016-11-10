
	var assignforce = angular.module( "batchApp", ['ngRoute', 'ui.bootstrap', 'ui.bootstrap.datetimepicker']);
		
		  // url routing
		assignforce.config(function($routeProvider, $locationProvider){
			$routeProvider
				.when("/home", {
					templateUrl : "html/views/home.html",
					contoller: "homeController"
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
				})
				.otherwise({"redirectTo": "/home"});
			
			$locationProvider.html5Mode(true);
		});
