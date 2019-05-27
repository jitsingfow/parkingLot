module.exports = {

    create_parking_lot: function (nLots) {
        parkingCapacity = parseInt(nLots.split(" ")[1]);
        return parkingCapacity;
    },

    park: function (parkingCapacity, parkingLotArray, input) {
        if (parkingCapacity > 0) {
            if (_findParking(parkingLotArray) === true) {
                for (var i = 0; i < parkingLotArray.length; i++) {
                    if (parkingLotArray[i][i] == null) {
                        var car = input.split(" ")[1] + ":" + input.split(" ")[2];
                        parkingLotArray[i][i] = car;
                        return i + 1;
                    }
                }
            }
        }
        else {
            return null;
        }
    },

    leave: function (parkingCapacity, parkingLotArray, input) {
        if (parkingCapacity > 0) {
            var index = input.split(" ")[1] - 1;
            if (index > -1 && index <= parkingLotArray.length) {
                parkingLotArray[index][index] = null;
                return index + 1;
            }
        }
        else {
            return null;
        }
    },

    status: function (parkingCapacity, parkingLotArray) {

        var statusArray = [];

        if (parkingCapacity > 0) {
            statusArray.push("Slot No. Registration No. Color ");
            for (var i = 0; i < parkingLotArray.length; i++) {
                if (parkingLotArray[i][i] != null) {
                    var e = i + 1;
                    statusArray.push(e + ".  " + parkingLotArray[i][i].split(":")[0] + "  " + parkingLotArray[i][i].split(":")[1]);
                }
            }
            return statusArray;
        } else {
            return [];
        }
    },

    registration_numbers_for_cars_with_colour: function (parkingCapacity, parkingLotArray, input) {
        if (parkingCapacity > 0) {
            var foundCarArray = [];
            for (var i = 0; i < parkingLotArray.length; i++) {
                if (parkingLotArray[i][i] && parkingLotArray[i][i].split(":")[1] == input.split(" ")[1]) {
                    foundCarArray.push(parkingLotArray[i][i].split(":")[0]);
                }
            }
            return foundCarArray.join(', ');
        } else {
            return null;
        }
    },

    slot_numbers_for_cars_with_colour: function (parkingCapacity, parkingLotArray, input) {
        if (parkingCapacity > 0) {
            var foundCarArray = new Array();
            for (var i = 0; i < parkingLotArray.length; i++) {
                if (parkingLotArray[i][i] && parkingLotArray[i][i].split(":")[1] == input.split(" ")[1]) {
                    foundCarArray.push(i + 1);
                }
            }
            return foundCarArray.join(', ');
        } else {
            return null;
        }
    },

    slot_number_for_registration_number: function (parkingCapacity, parkingLotArray, input) {
        if(parkingCapacity > 0){
	    	var slotNumber;
	        for(var i=0; i< parkingLotArray.length; i++){
	        	if(parkingLotArray[i][i] && parkingLotArray[i][i].split(":")[0] == input.split(" ")[1]){
	        		slotNumber = i + 1;
	        	}else{
	        		slotNumber = "Not found";
	        	}
	        }
        	return slotNumber;
        }else{
			return null;
		}
    }
}

function _findParking(parkingLotArray) {
    var isAvailable = false;
    for (var i = 0; i < parkingLotArray.length; i++) {
        if (parkingLotArray[i][i] == null) {
            isAvailable = true;
        }
    }
    return isAvailable;
}