const currentDay = document.getElementById("currentDay");
const date = new Date();
var formattedDay = dayjs(currentDay).format("MM, DD, YYYY");
$("#currentDay").text(formattedDay);
// Get current date & time as a string
const dateString = date.toLocaleDateString() + " " + date.toLocaleTimeString();
currentDay.innerHTML = dateString;

//Update date & time on page load
window.onload = function () {
  setInterval(function () {
    let time = new Date();
    document.getElementById("currentDay").innerHTML =
      time.toLocaleDateString() + " " + time.toLocaleTimeString();
  }, 1000);
};

$(document).ready(function () {
  // code goes inside this function to make sure all elements are rendered properly before running javascript
  // Loop through all hours
  for (var i = 9; i <= 17; i++) {
    // Get the event for the current hour from local storage
    var event = localStorage.getItem(i);
    // If an event is found, display it in the corresponding textarea
    if (event) {
      $("#hour-" + i + " .description").val(event);
    }
  }

  // Get the current hour in 24-hour format
  var currentHour = new Date().getHours();

  // Loop through all time blocks
  $(".time-block").each(function () {
    // Get the hour of the current time block (from the id)
    var hour = $(this).attr("id").split("-")[1];

    // Compare the hour of the current time block with the current hour
    if (hour < currentHour) {
      // If the hour of the current time block is before the current hour, add the "past" class
      $(this).addClass("past");
    } else if (hour === currentHour) {
      // If the hour of the current time block is the current hour, add the "red" class
      $(this).addClass("present");
    } else {
      if (hour > currentHour) {
        // If the hour of the current time block is after the current hour, add the "green" class
        $(this).addClass("future");
      }
    }
  });
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // Select all save buttons on the page
  var saveButtons = $(".saveBtn");

  // Add an event listener to each save button
  saveButtons.on("click", function () {
    // Get the corresponding textarea element
    var textarea = $(this).parent().find(".description");
    // Get the text from the textarea
    var event = textarea.val();
    // Get the hour of the event (from the id of the parent div)
    var hour = $(this).parent().attr("id").split("-")[1];
    // Save the event to local storage
    localStorage.setItem(hour, event);
  });
});
