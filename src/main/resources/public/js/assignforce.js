
	var assignforce = angular.module( "batchApp", ['ngRoute', 'ngAria', 'ngAnimate', 'ngMaterial', 'ngResource', 'ui.bootstrap', 'ui.bootstrap.datetimepicker']);
		
		  // url routing
		assignforce.config(function($routeProvider, $locationProvider){
			$routeProvider
				.when("/home", {
					templateUrl : "html/views/home.html",
					controller  : "homeCtrl as hCtrl"
				})
				.when("/batches", {
					templateUrl : "html/views/batches.html",
					controller  : "batchCtrl as bCtrl"
				})
				.when("/trainers", {
					templateUrl : "html/views/trainers.html",
					controller  : "trainerCtrl as tCtrl"
				})
				.when("/locations", {
					templateUrl : "html/views/locations.html",
					controller  : "locationCtrl as lCtrl"
				})
				.otherwise({"redirectTo": "/home"});
			
			$locationProvider.html5Mode(true);
		});

        assignforce.constant("secWeek", 604800000);
