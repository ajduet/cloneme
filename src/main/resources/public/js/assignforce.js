
	var assignforce = angular.module( "batchApp", ['ngRoute', 'ngAnimate', 'ngAria', 'ngResource', 'ngMaterial', 'md.data.table']);

          // global constants
        assignforce.constant("secWeek", 604800000);
        
		  // url routing
		assignforce.config( function($routeProvider, $locationProvider){
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

          // theme config
        assignforce.config( function($mdThemingProvider) {

            var revOrangeMap = $mdThemingProvider.extendPalette("deep-orange", {
                "500": "#f26a25",
                "hue-2": "#f26a25"
            });

            $mdThemingProvider.definePalette("revOrange", revOrangeMap);
                
            // $mdThemingProvider.theme("default")
            //     .primaryPalette("revOrange")
            //     .accentPalette("revOrange");

            $mdThemingProvider.theme("default")
                .primaryPalette("indigo")
                .accentPalette("pink");

        });

