
    var assignforce = angular.module( "batchApp" );

    assignforce.service('batchService', function($http, $q, $location){
        var bs = this;

        bs.getBatch = function(callback, id){
            if(typeof(id) == typeof(NaN)){
                $http.get('../rest/getbatch', {params: {bId: id}}).then(callback);
                // $http.get('http://localhost:8085/AssignForce/rest/getbatch', {params: {bId: id}}).then(callback);
                // $http.get('http://dev.aduet.tech/AssignForce/rest/getbatch', {params: {bId: id}}).then(callback);
                // $http.get('http://assignforce.aduet.tech/AssignForce/rest/getbatch', {params: {bId: id}}).then(callback);
            }
        }
        
        bs.getCurrs = function(callback){
            $http.get('../rest/curriculum').then(callback);
            // $http.get('http://localhost:8085/AssignForce/rest/curriculum').then(callback);
            // $http.get('http://dev.aduet.tech/AssignForce/rest/curriculum').then(callback);
            // $http.get('http://assignforce.aduet.tech/AssignForce/rest/curriculum').then(callback);
            
        }
        
        bs.getTopics = function(callback){
            $http.get('../rest/topics').then(callback);
            // $http.get('http://localhost:8085/AssignForce/rest/topics').then(callback);
            // $http.get('http://dev.aduet.tech/AssignForce/rest/topics').then(callback);
            // $http.get('http://assignforce.aduet.tech/AssignForce/rest/topics').then(callback);
            
        }
        
        bs.getRooms = function(callback){
            $http.get('../rest/rooms').then(callback);
            // $http.get('http://localhost:8085/AssignForce/rest/rooms').then(callback);
            // $http.get('http://dev.aduet.tech/AssignForce/rest/rooms').then(callback);
            // $http.get('http://assignforce.aduet.tech/AssignForce/rest/rooms').then(callback);
            
        }
        
        bs.saveBatch = function(batchName, topic, curr, trainer, room, date, date2, batchID){
            console.log('Saving batch')
            var batchObj = {};
        
            // console.log("batchID: "+ batchID);
            
            if(typeof(batchID) == typeof(NaN)){
                batchObj.batchId = batchID;
            } else {
                batchObj.batchId = 0;
            }
            
            batchObj.batchName = batchName;
            batchObj.topic = "Java";
            batchObj.curr = curr;
            batchObj.trainer = trainer;
            batchObj.room = room;
            batchObj.date = date;
            batchObj.date2 = date2;
            
            var promise = $http.post('../rest/savebatch', batchObj)
                .then(
                    function(response){
                        console.log("Batch saved: ", response);
                        $location.path("/allbatches");
                    },
                    
                    function(error){
                        console.lgo("Batch failed to save.")
                        console.log($q.reject(error));
                    }
            );
            
        }

        bs.attachRooms = function( locations, rooms ) {
            console.log("    Attaching rooms to locations.");

            var roomLoc = [];
            var roomList = [];
            for (i = 0; i < locations.length; i++) {
                for (var j = 0; j < rooms.length; j++) {
                    if (rooms[j].locationID.locationID == locations[i].locationID) {
                        roomList.push( rooms[j] );
                    }
                }
                roomLoc[i] = [ locations[i], roomList ];
                roomList = [];
            }
            return roomLoc;
        }
        
    });