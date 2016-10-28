/**
 * 
 */
//Basic routing information
var app = angular.module("batchApp", ['ngRoute', 'ui.bootstrap']);
	app.config(['$routeProvider', function($routeProvider){
		$routeProvider.
		when('/home', {
			templateUrl : 'home.html'
		}).
		when('/viewbatches', {
			templateUrl : 'viewbatches.html'
		}).
		when('/viewtrainers', {
			templateUrl : 'viewtrainers.html',
			controller: 'trainerCtrl'
		}).
		when('/createbatches', {
			templateUrl : 'createbatches.html',
			controller : 'batchCtrl'
		}).
		when('/locations', {
			templateUrl : 'locations.html',
			controller : 'locationCtrl'
		}).
		when('/viewcurrentbatches', {
			templateUrl : 'viewbatches.html'
		}).
		when('/viewupcomingbatches', {
			templateUrl : 'viewbatches.html'
		}).
		when('/allbatches', {
			templateUrl : 'allbatches.html',
			controller : 'allBatchCtrl'
		}).
		when('/viewendedbatches', {
			templateUrl : 'viewbatches.html'
		});
	}]);


	/*app.controller('dateCtrl', function($scope){
		$scope.today = function(){
			$scope.dt = new Date();
		};
		
		$scope.today();
		
		$scope.clear = function(){
			$scope.dt = null;
		};
		
		$scope.inlineOptions = {
				customClass : getDayClass,
				minDate : new Date(),
				showWeeks : true
		};
		
		$scope.dateOptions = {
				dateDisabled: disabled,
				formatYear: 'yy',
				minDate: new Date(),
				startingDay: 1
		};
		
		//Disable Weekend
		function disabled(data){
			var date = data.date,
			mode = data.mode;
			
			return mode == 'day' && (date.getDay() === 0 || date.getDay() === 6);
		}
		
		$scope.toggleMin = function(){
			$scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
			$scope.dateOptions.minDate = $scope.inlineOptions.minDate;
		};
		
		$scope.toggleMin();
		
		$scope.open1 = function(){
			$scope.popup1.opened = true;
		};
		
		$scope.open2 = function(){
			$scope.popup2.opened = true;
		};
		
		$scope.setDate = function(year, month, day){
			$scope.dt = new Date(year, month, day);
		};
		
		$scope.format = 'dd-MMM-yy';
		
		$scope.popup1 = {
			opened: false
		};
		
		$scope.popup2 = {
				opened: false
			};
		
		  var tomorrow = new Date();
		  tomorrow.setDate(tomorrow.getDate() + 1);
		  var afterTomorrow = new Date();
		  afterTomorrow.setDate(tomorrow.getDate() + 1);
		  $scope.events = [
		    {
		      date: tomorrow,
		      status: 'full'
		    },
		    {
		      date: afterTomorrow,
		      status: 'partially'
		    }
		  ];
		
		
		function getDayClass(data){
			var date = data.date,
			mode = data.mode;
			
			if (mode === 'day'){
				var dayToCheck = new Date(date).setHours(0,0,0,0);
				
				for(var i = 0; i < $scope.events[i].length; i++){
					var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
					
					if (dayToCheck === currentDay){
						return $scope.events[i].status;
					}
				}
			}
<<<<<<< HEAD
		return '';
	}
}); */// End of date timer
			


// -----------------------------------------------------------------------
// Trainer Section
app.controller('trainerCtrl', function($scope, trainerService) {
	// console.log('Getting Trainers');
	// console.log('takin care of business');
	// $scope.testingVar = 12345;
	$scope.getTrainers = trainerService.getAllTrainers(function(response) {
		console.log(response.data);
		$scope.trainers = response.data
	});
	$scope.createDate = function(ms) {
		console.log('hit');
		var s = (1000 * ms);
		var date = new Date(ms);
		var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
				'Sep', 'Oct', 'Nov', 'Dec' ];
		var year = date.getFullYear();
		var month = months[date.getMonth()];
		var date = date.getDate();
		var time = date + ' ' + month + ' ' + year;

		if (date == 'Invalid Date') {
			console.log('here');
			return 'hello';
		}
		return String(time);
	};
	/*
	 * $scope.createDate = function(ms){ return trainerService.createDate(ms); }
	 */// console.log('BallyHoo');
})


app.service('trainerService', function($http, $q) {

	this.getAllTrainers = function(callback) {
		$http.get('rest/trainer').then(callback);
	}

	this.getTrainers = function() {
		// console.log('and workin overtime');
		var tpromise = $http.get('rest/trainer').then(function(response) {
			// console.log('its alright');
			console.log(response);
			// console.log(response + 'I think I got the trainers')
		}, function(error) {
			console.log('NAAW');
			console.log($q.reject(error))

		})
	}
	/*
	 * this.createDate = function(ms){ var s = (1000 * ms); console.log(s); var
	 * date = new Date(s);
	 * 
	 * if(date == 'Invalid Date'){ console.log('here'); return 'hello'; } return
	 * date; }// end createDate
	 */
});
		
	app.factory('transferService', function() {
		 var savedData = {}
		 
		 function set(data) {
		   savedData = data;
		 }
		 function get() {
		  return savedData;
		 }

		 return {
		  set: set,
		  get: get
		 }

	});


	
