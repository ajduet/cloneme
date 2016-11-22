
    var assignforce = angular.module( "batchApp" );

    assignforce.controller('trainerCtrl', function($scope, trainerService) {
        
	    console.log("Beginning trainer controller.");
        var tc = $scope;
	
          // functions
        tc.getTrainers = trainerService.getAllTrainers(function(response) {
            tc.trainers = response.data
        });

        tc.createDate = function(ms) {
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
    })