const rl = require("readline");
const fs = require('fs');

require('events').EventEmitter.defaultMaxListeners = 100

var utils = require('./config/utils.js');


var parkingLotArray = [];
var parkingCapacity = 0;

var query = process.argv;

if (query.length == 3) {
    fs.readFile(query[2], 'utf-8', function (err, data) {
        var arr = data.split("\n");
        for (var i = 0; i < arr.length; i++) {
            commands(arr[i]);
        }
    });
}
else {
    interact();
}

function interact() {
    var prompts = rl.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
    prompts.question("> ", function (data) {
        commands(data);
    });
}

function commands(input) {
    var cmd = input.split(" ")[0];
    switch (cmd) {

        case "create_parking_lot":
            parkingCapacity = utils.create_parking_lot(input);
            console.log("Created a parking lot with " + parkingCapacity + " slots");

            for (var i = 0; i < parkingCapacity; i++) {
                var obj = new Object();
                obj[parseInt(i)] = null;
                parkingLotArray.push(obj);
            }
            break;

        case "park":
            var slotNumber = utils.park(parkingCapacity, parkingLotArray, input);
            if (slotNumber) {
                console.log("Allocated slot number: ", slotNumber);
            } else {
                console.log("Sorry, parking lot is full");
            }
            break;

        case "leave":
            var slotNumber = utils.leave(parkingCapacity, parkingLotArray, input);
            if (slotNumber) {
                console.log("Slot number " + slotNumber + " is free");
            } else {
                console.log("Sorry, parking lot is full");
            }
            break;

        case "status":
            var values = utils.status(parkingCapacity, parkingLotArray);
            if (values.length > 1) {
                console.log(values.join("\n"));
            } else {
                console.log("Parking lot is empty");
            }
            break;

        case "registration_numbers_for_cars_with_colour":

            var regNum = utils.registration_numbers_for_cars_with_colour(parkingCapacity, parkingLotArray, input);

            if (regNum) {
                console.log(regNum);
            } else {
                console.log("No Found");
            }
            break;

        case "slot_numbers_for_cars_with_colour":
            var slotNumbers = utils.slot_numbers_for_cars_with_colour(parkingCapacity, parkingLotArray, input);
            if (slotNumbers) {
                console.log(slotNumbers);
            } else {
                console.log("Not Found");
            }
            break;
        case "slot_number_for_registration_number":
            var slotNumber = utils.slot_number_for_registration_number(parkingCapacity, parkingLotArray, input);
            if (slotNumber) {
                console.log(slotNumber);
            } else {
                console.log("Sorry, parking lot is full");
            }
            break;
    }
    interact();
}




