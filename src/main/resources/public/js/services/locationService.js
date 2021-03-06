
var app = angular.module("batchApp");

app.service( "locationService", function($resource) {
    var Location = $resource('/api/v2/location/:id',{id: '@id'},{update:{method:'PUT'}});
    var ls = this;
    
    ls.create = function(location, success, error){
        var newLocation = new Location(location);
        newLocation.$save(success, error);
    };

    ls.getAll = function(success, error) {
        return Location.query(success, error);
    };

    ls.getById = function(id, success){
        return Location.get({id: id}, success, error);
    };

    ls.update = function(location, success, error){
        location.$update(success, error);
    };

    //I am not really changing ls
    ls.delete = function(location, success, error){
        location.$remove(success, error);
    };
});