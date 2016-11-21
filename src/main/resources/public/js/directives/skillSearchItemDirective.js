
    var assignforce = angular.module( "batchApp" );

    assignforce.directive( "skillSearchItem", function() {
        return {
            restrict: "AE",
            scope: {
                skillName: "=skill",
                remove: "="
            },
            templateUrl: "html/templates/skillSearchItemTemplate.html" 
        };
    });