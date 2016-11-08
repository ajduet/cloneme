
    var assignforce = angular.module( "batchApp" );

    assignforce.factory('transferService', function() {
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