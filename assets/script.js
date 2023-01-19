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

  // Get the current hour in 12-hour format
  var formattedHour = new Date().getHours();
  var hour = formattedHour % 12 || 12;
  var amPm = formattedHour < 12 ? "AM" : "PM";
  var formattedHour = hour.toLocaleString() + " " + amPm;

  // Loop through all time blocks
  $(".time-block").each(function () {
    // Get the hour of the current time block (from the id)
    var hour = $(this).attr("id").split("-")[1];

    // Compare the hour of the current time block with the current hour
    if (hour < formattedHour) {
      // If the hour of the current time block is before the current hour, add the "past" class
      $(this).addClass("past");
    } else if (hour === formattedHour) {
      // If the hour of the current time block is the current hour, add the "red" class
      $(this).addClass("present");
    } else {
      if (hour > formattedHour) {
        // If the hour of the current time block is after the current hour, add the "green" class
        $(this).addClass("future");
      }
    }
  });

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
