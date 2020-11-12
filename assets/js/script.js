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
let getLocal = localStorage.getItem("availableTime");
if (getLocal) {
    availableTime = JSON.parse(getLocal);
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
            <div class="col-sm col-md-10 d-flex p-0 description">
            <div class="input-group">
                <textarea class="form-control text-area"></textarea>
                <div class="input-group-append">
                <button class="saveBtn d-flex justify-content-center align-items-center">
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
$.each($(".time-block"), function(index, value) {
    let eventInput = parseInt($(value).attr("data-time"));    
    // $(this refers to the $("time-block")
    if (eventInput == currentTime) {
        $(this).find("textarea").addClass("present");
    } 
    else if (eventInput < currentTime) {
        $(this).find("textarea").addClass("past");
    } 
    else {
        $(this).find("textarea").addClass("future");
    }
    // console.log("currentTime: "+ parseInt(currentTime));
    // console.log( "this:" + $(this));
})

// A lot of console.log to check for values and typeof 
// parseInt() for string --> number, apparently Number() and parseInt does the same thing.
// console.log("moment().hour(): " + Number(moment().hour()) + " " + typeof Number(moment().hour()));
// console.log("moment().hour(): " + parseInt(moment().hour()) + " " + typeof parseInt(moment().hour()));

// console.log(currentTime);

//set value of availableTime to equal the user input for each row
$(".time-block").each(function() {
    // $(this refers to the $("time-block")
    $(this).find(".text-area").val(availableTime[$(this).attr("data-time")].value);
    
    // console.log( "this:" + $(this));

});

// //save value to local storage on click
$(".saveBtn").on("click", function(event){
    event.preventDefault();

    //set availableTime time attribute by looking for the closest class of 'time-block' and ignoring other classes.
    // $(this) refers to the .savebtn
    var timeValue = $(this).closest(".time-block").attr("data-time");

    //set availableTime value attribute by looking for the closest class of 'time-block' and ignoring other classes.
    var textValue = $(this).closest(".time-block").find(".text-area").val();
    availableTime[timeValue].value = textValue;

    //save user input in each object to local storage
    localStorage.setItem("availableTime", JSON.stringify(availableTime));

    // console.log( "this:" + $(this));

});