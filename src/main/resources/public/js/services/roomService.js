
var app = angular.module("batchApp");

app.service( "roomService", function($resource) {
    var Room = $resource('/api/v2/room/:roomID',{roomID: '@roomID'},{update:{method:'PUT'}});
    var rs = this;

    rs.create = function(room, success, error){
        var newRoom = new Room(room);
        newRoom.$save(success, error);
    };

    rs.getAll = function(success, error) {
        return Room.query(success, error);
    };

    rs.getById = function(id, success, error){
        return Room.get({id: id}, success, error);
    };

    rs.update = function(room, success, error){
        room.$update(success, error);
    };

    rs.delete = function(room, success, error){
        room.$remove(success, error);
    };

});