// Dom Elements
let currentDayEl = $("#currentDay");
let containerEl = $(".container");

// Creating text area for userInput
let availableTime = {};

// Current hour
let currentTime = moment().hour();
// console.log("currentTime: " + currentTime);

// The Current Time
function currentTimeNow() {
    let currentDisplay = moment().format("MMMM Do YYYY, h:mm:ss a");
    currentDayEl.html(currentDisplay);
}

setInterval(currentTimeNow, 1000);
// console.log("currentTimeNow: " + currentTimeNow());

//Check for local storage to set value to the object and clearing if currentTime is between 12am and 9am
if (localStorage.getItem("availableTime")) {
    availableTime = JSON.parse(localStorage.getItem("availableTime"));
} else {
    availableTime = {
        "9": {
            time: "9",
            value: ""
        },
        "10": {
            time: "10",
            value: ""
        },
        "11": {
            time: "11",
            value: ""
        },
        "12": {
            time: "12",
            value: ""
        },
        "13": {
            time: "13",
            value: ""
        },
        "14": {
            time: "14",
            value: ""
        },
        "15": {
            time: "15",
            value: ""
        },
        "16": {
            time: "16",
            value: ""
        },
        "17": {
            time: "17",
            value: ""
        }
    };
}

// Creating Time blocks, text Areas and Save buttons
for (let hour = 9; hour < 18; hour++) {

    // started the for loop at 9 so the data-time can be set starting at 9 then renders up to 17 (5PM)
    $(".container").append(`
        
        <div class="row time-block" data-time="${hour}">

        <!-- hours -->
            <div class="col-sm col-md-2 hour">
            <p>${moment({hour}).format("h  a")}</p>
            </div>

        <!-- schedule -->
            <div class="col-sm col-md-10 d-flex description">
            <div class="input-group">
                <textarea class="form-control text-area"></textarea>
                <div class="input-group-append">
                <button class="saveBtn d-flex justify-center align-center">
                    <i class="far fa-save fa-2x save-icon"></i>
                </button>
                </div>
            </div>
            </div>
        </div>
        `);

    
    // console.log(typeof parseInt(currentTime));    

    // console.log("eventInput: " + typeof parseInt(containerEl.find(`#${hour}`))); 
    // console.log("moment().hour(): " + typeof moment().hour());

    // console.log("eventInput: " + typeof eventInput); 
}

//Checking time to determine present, past, or future
$.each($('.time-block'), function(index, value) {
    let eventInput = Number($(value).attr("data-time"));    
    if (eventInput == currentTime) {
        $(this).find("textarea").addClass("present");
    } 
    else if (eventInput < currentTime) {
        $(this).find("textarea").addClass("past");
    } 
    else {
        $(this).find("textarea").addClass("future");
    }
    console.log("currentTime: "+ parseInt(currentTime));
})

// parseInt() for string --> number, apparently Number() and parseInt does the same thing.
// console.log("moment().hour(): " + Number(moment().hour()) + " " + typeof Number(moment().hour()));
// console.log("moment().hour(): " + parseInt(moment().hour()) + " " + typeof parseInt(moment().hour()));

// console.log(currentTime);


