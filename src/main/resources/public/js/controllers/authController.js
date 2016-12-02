/**
 *This controller is used to controller user access and facilitate user authorization 
 */

var app = angular.module("batchApp");

app.controller("AuthCtrl", function( $mdToast, userSrv ){
	
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

      // global function available to all other controllers (as they are all children of authCtrl) to create toast messages
    this.showToast = function( message ) {
        $mdToast.show( $mdToast.simple().textContent( message ).action("OKAY").position("top right").highlightAction(true) );
    };
});