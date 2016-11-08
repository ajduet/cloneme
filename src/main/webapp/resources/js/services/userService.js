/**
 * User service will provide user based functionality especially for authentication
 */
var app = angular.module("batchApp");

app.constant('authorizeUrl', 'rest/authorize');

app.service('userSrv', function($http, authorizeUrl){
	
	var userAuthenticated = false;
	
	this.error;
	
	this.isUserAuthenticated = function(){
		return userAuthenticated;
	}
	
	this.login = function(credentials){
		
		$http.post(authorizeUrl, JSON.stringify(credentials))
			.then(function(data){
				userAuthenticated = true;
			}.bind(this), function(error){
				this.error = "Invalid username or password";
			}.bind(this));
	}
	
	this.logout = function(){
		userAuthenticated = false;
	}
	
});