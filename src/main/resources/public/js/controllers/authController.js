/**
 *This controller is used to controller user access and facilitate user authorization 
 */

var app = angular.module("batchApp");

app.controller("AuthCtrl", function($scope, $location, $window){

	$scope.$on('$viewContentLoaded', function(){
		if(!$window.sessionStorage.getItem('token')){
            if($location.search().token){
                $window.sessionStorage.setItem('token',$location.search().token)
            }
            else {
                $window.location.replace('https://sf.aduet.tech/services/auth?redirect_url=http%3A%2F%2Fdev2.aduet.tech/home');
            }
		}
	});

});