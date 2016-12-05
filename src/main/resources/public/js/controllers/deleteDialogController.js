
    var assignforce = angular.module( "batchApp" );

    assignforce.controller( "deleteDialogCtrl", function( $scope, $mdDialog, $timeout, locationService ){
        console.log("Beginning deletion controller.");
        var dc = this;

          // functions
            // format text
        dc.formatText = function() {

            var title = "Delete ";

            if (dc.summary.rooms == 1) {
                title += " 1 room";
            } else if (dc.summary.rooms > 1) {
                title += dc.summary.rooms + " rooms"; 
            }

            if (dc.summary.locations == 1) {
                if (dc.summary.rooms > 0) {
                    title += " and";
                }
                title += " 1 location";
            } else if (dc.summary.locations > 1) {
                if (dc.summary.rooms > 0) {
                    title += " and";
                }
                title += dc.summary.locations + " locations";
            }
            title += "?";

            dc.desc = title;
        }();

            // delete list
        dc.delete = function() {
            for (var i = 0; i < dc.summary.rooms + dc.summary.locations; i++) {
                if ( Array.isArray(dc.list[i].rooms) ) {
                    dc.deleted += dc.deleteLocation( dc.list[i] );
                } else {
                    dc.deleted += dc.deleteRoom( dc.list[i] )
                }
            }
            dc.flag = false;
            // dc.loading();
            $mdDialog.hide();
        };

            // wait to close dialog on all items successfully deleting or 30 seconds
        dc.loading = function(){
            $timeout( $mdDialog.cancel(), 30000 );
            while (dc.thinking) {}
            $mdDialog.hide();
        };

            // deactivate location
        dc.deleteLocation = function( location ) {

            if (location.rooms.length > 0) {
                location.rooms.forEach( function(room){
                    room.active = false;
                });
            }

            location.active = false;
            locationService.update( location, function(response){
                console.log("  (DC)  Location deleted.");
                return 1;
            }, function(error){
                console.log("  (DC)  Failed to delete location with error:", error.data.message);
                lc.showToast("Failed to delete location.");
                return 0;
            });
        };

            // deactivate room
        dc.deleteRoom = function( roomIn ) {
            
            var locationIn;
            dc.locations.forEach( function(location){
                if (location.rooms.length > 0) {
                    location.rooms.forEach( function(room){
                        if (room.roomID == roomIn.roomID) {
                            locationIn = location;
                            room.active = false;
                        }
                    });
                }
            });

            locationService.update( locationIn, function(response){
                console.log("  (DC)  Room deleted.");
                return 1;
            }, function(error){
                console.log("  (DC)  Failed to delete room with error:", error.data.message);
                return 0;
            });
        };

            // cancel deletion
        dc.cancel = function(){
            $mdDialog.cancel();
        };

          // data
        dc.thinking = ( dc.deleted == (dc.summary.rooms + dc.summary.locations) );
        dc.flag = true;
        dc.deleted = 0;

          // page initialization
            // data gathering
        locationService.getAll( function(response) {
            console.log("  (DC)  Retrieving all locations.")
            dc.locations = response;
        }, function(error) {
            console.log("  (DC)  Failed to retrieve all locations with error:", error.data.message);
            $mdDialog.cancel();
        });
    });