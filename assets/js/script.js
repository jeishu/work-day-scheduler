// Dom Elements
let jumbotronEl = $(".jumbotron");
let currentDayEl = $("#currentDay");

// The Current Time
function currentTime() {
    let currentDisplay = moment().format("MMMM Do YYYY, h:mm:ss a");
    currentDayEl.html(currentDisplay);
}

console.log(currentTime());

setInterval(currentTime, 1000);

