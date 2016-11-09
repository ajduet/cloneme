
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
				.when("/createBatch", {
					templateUrl : "html/views/createbatches.html",
					controller  : "batchCtrl"
				})
				.when("/locations", {
					templateUrl : "html/views/locations.html",
					controller  : "locationCtrl"
				})


				.when("/viewcurrentbatches", {
					templateUrl : "html/views/viewbatches.html"
				})
				.when("/viewupcomingbatches", {
					templateUrl : "html/views/viewbatches.html"
				})
				.when("/allbatches", {
					templateUrl : "html/views/allbatches.html",
					controller  : "allBatchCtrl"
				})
				.when("/viewendedbatches", {
					templateUrl : 'html/views/viewbatches.html'
				});
		}]);

// // Trainer Section
// app.controller('trainerCtrl', function($scope, trainerService) {
// 	// console.log('Getting Trainers');
// 	// console.log('takin care of business');
// 	// $scope.testingVar = 12345;
// 	$scope.getTrainers = trainerService.getAllTrainers(function(response) {
// 		console.log(response.data);
// 		$scope.trainers = response.data
// 	});
// 	$scope.createDate = function(ms) {
// 		console.log('hit');
// 		var s = (1000 * ms);
// 		var date = new Date(ms);
// 		var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
// 				'Sep', 'Oct', 'Nov', 'Dec' ];
// 		var year = date.getFullYear();
// 		var month = months[date.getMonth()];
// 		var date = date.getDate();
// 		var time = date + ' ' + month + ' ' + year;

// 		if (date == 'Invalid Date') {
// 			console.log('here');
// 			return 'hello';
// 		}
// 		return String(time);
// 	};
// 	/*
// 	 * $scope.createDate = function(ms){ return trainerService.createDate(ms); }
// 	 */// console.log('BallyHoo');
// })


// app.service('trainerService', function($http, $q) {

// 	this.getAllTrainers = function(callback) {
// 		$http.get('rest/trainer').then(callback);
// 		// $http.get('http://dev.aduet.tech/AssignForce/rest/trainer').then(callback);
// 		// $http.get('http://localhost:8085/AssignForce/rest/trainer').then(callback);
// 		// $http.get('http://assignforce.aduet.tech/AssignForce/rest/trainer').then(callback);
// 	}

// 	this.getTrainers = function() {
// 		// console.log('and workin overtime');

// 		var tpromise = $http.get('rest/trainer').then(function(response) {
// 		// var tpromise = $http.get('http://dev.aduet.tech/AssignForce/rest/trainer').then(function(response) {
// 		// var tpromise = $http.get('http://localhost:8085/AssignForce/rest/trainer').then(function(response) {
// 		// var tpromise = $http.get('http://assignforce.aduet.tech/AssignForce/rest/trainer').then(function(response) {
// 			// console.log('its alright');
// 			console.log(response);
// 			// console.log(response + 'I think I got the trainers')
// 		}, function(error) {
// 			console.log('NAAW');
// 			console.log($q.reject(error))

// 		})
// 	}
// 	/*
// 	 * this.createDate = function(ms){ var s = (1000 * ms); console.log(s); var
// 	 * date = new Date(s);
// 	 * 
// 	 * if(date == 'Invalid Date'){ console.log('here'); return 'hello'; } return
// 	 * date; }// end createDate
// 	 */
// });


	
