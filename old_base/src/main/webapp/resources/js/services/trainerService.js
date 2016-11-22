
    var assignforce = angular.module( "batchApp" );

    assignforce.service('trainerService', function($http, $q) {
        var ts = this;

        ts.getAllTrainers = function(callback) {
            $http.get('../rest/trainer').then(callback);
            // $http.get('http://dev.aduet.tech/AssignForce/rest/trainer').then(callback);
            // $http.get('http://localhost:8085/AssignForce/rest/trainer').then(callback);
            // $http.get('http://assignforce.aduet.tech/AssignForce/rest/trainer').then(callback);
        }

        ts.getTrainers = function() {

            var tpromise = $http.get('../rest/trainer').then(function(response) {
            // var tpromise = $http.get('http://dev.aduet.tech/AssignForce/rest/trainer').then(function(response) {
            // var tpromise = $http.get('http://localhost:8085/AssignForce/rest/trainer').then(function(response) {
            // var tpromise = $http.get('http://assignforce.aduet.tech/AssignForce/rest/trainer').then(function(response) {
            }, function(error) {
                console.log($q.reject(error))

            })
        }
    });