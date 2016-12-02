
    var assignforce = angular.module( "batchApp" );

    assignforce.controller( "locationCtrl", function( $scope, locationService ) {
        console.log("Beginning location controller.");
        var lc = this;

          // functions
            // calls showToast method of aCtrl
        lc.showToast = function( message ) {
            $scope.$parent.aCtrl.showToast( message );
        };

            // adds location
        lc.addLocation = function() {
            lc.showToast("Add location.");
              // bring up location addition dialog or whatever
        };

            // opens room list for location
        lc.openLocation = function(location) {
            // lc.showToast("Open " + location.name + ".");

            if (location.rooms.length > 0) {
                var id = "#loc" + location.id;
                $(id).slideToggle( lc.removeRooms(location) );
            }
        };

            // add room to location
        lc.addRoom = function() {
            // lc.showToast("Add room.");
            if (lc.selectedList.length > 1) {
                lc.showToast("Please select only a location.");
            } 
              // indicates that the list item is actually a room and not a location
            else if (!Array.isArray(lc.selectedList[0].rooms)) {
                lc.showToast("Please select a location.");
            } else {
                // bring up room addition dialog or whatever
                lc.showToast("Adding room to location", lc.selectedList[0].name);
            }
        };

            // removes rooms from selectedList on location menu close
        lc.removeRooms = function( location ) {
            if (location.rooms.length > 0) {
                location.rooms.forEach( function(room) {
                    var idx = lc.selectedList.indexOf(room);
                    if (idx > -1) {
                        lc.selectedList.splice( idx, 1 );
                    }
                });
            }
        };

            // edit location
        lc.editSelected = function() {
            // lc.showToast("Edit.");
            if (lc.selectedList.length > 1) {
                lc.showToast("Please select only one item.");
            } else {
                // bring up location/room editting dialog or whatever
                if (Array.isArray(ls.selectedList[0].rooms)) {
                    lc.showToast("Editting location", ls.selectedList[0].name);
                } else {
                    lc.showToast("Editting room", ls.selectedList[0].roomName);
                }
            }
        };

            // delete location
        lc.deleteSelected = function() {
            // lc.showToast("Delete.");
              // bring up deletion confirmation dialog with summation of locations/rooms to be deleted
            var summary = lc.categorizeSelected();
            console.log(summary);
            lc.showToast("Delete " + summary.locations + " location(s) and " + summary.rooms + " room(s)?");
        };

            // counts the number of rooms and locations selected
        lc.categorizeSelected = function() {
            
            var summary = { rooms: 0, locations: 0};
            if (lc.selectedList.length > 0) {
                lc.selectedList.forEach( function(item) {
                    if (Array.isArray(item.rooms)) {
                        summary.locations++;
                    } else {
                        summary.rooms++;
                    }
                });
            }
            return summary;
        };

            // checks box if location/room is in selectedList
        lc.exists = function(obj) {
            return lc.selectedList.indexOf( obj ) > -1;
        };

            // adds/removes location/room from selectedList
        lc.toggle = function(obj) {

            var idx = lc.selectedList.indexOf(obj);
            if (idx == -1) {
                lc.selectedList.push(obj);
            } else {
                lc.selectedList.splice( idx, 1 );
            }
        };

        lc.visible = function(location) {
            
            var element = $("#loc" + location.id)[0];
            if (!element) {
                return false;
            } else {
                var style = window.getComputedStyle(element);
                if (style.display == "none") {
                    return false;
                } else {
                    return true;
                }
            }
        };

          // data
        lc.selectedList = [];

          // page initialization
            // data gathering
        locationService.getAll( function(response) {
            console.log("  (LC)  Retrieving all locations.")
            lc.locations = response;
        }, function(error) {
            console.log("  (LC)  Failed to retrieve all locations with error:", error.data.message);
            lc.showToast( "Could not fetch locations.");
        });

    });