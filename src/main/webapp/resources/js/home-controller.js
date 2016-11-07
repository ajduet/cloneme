/**
 * Controller of the home view 
 */
var app = angular.module("batchApp");

app.controller("HomeCtrl", function(userSrv){
	
	this.credentials = {};
	
	this.isUserAuthenticated = function(){
		return userSrv.isUserAuthenticated();
	}
	
	this.login = function(){
		userSrv.login(this.credentials);
	}
});