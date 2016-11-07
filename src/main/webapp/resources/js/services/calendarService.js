
    var assignforce = angular.module( "batchApp" );

    assignforce.service( "calendarService", function(){
        var cs = this;

        cs.countWeeks = function(startDate, endDate){
            cs.diff = (endDate / 1000) - (startDate / 1000);
            cs.secondsInWeek = 604800;
            cs.weeks = Math.ceil(cs.diff / cs.secondsInWeek);
            return cs.weeks;
        }
    });