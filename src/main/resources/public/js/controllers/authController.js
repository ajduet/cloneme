/**
 *This controller is used to controller user access and facilitate user authorization 
 */

var app = angular.module("batchApp");

app.controller("AuthCtrl", function(userSrv){
	
	this.credentials = {};
	
	this.isUserAuthenticated = function(){
		return userSrv.isUserAuthenticated();
	}
	
	this.login = function(){
		userSrv.login(this.credentials);
	}
	
	this.hasError = function(){
		return userSrv.error || false;
	}
	
	this.getError = function(){
		return userSrv.error;
	}
});