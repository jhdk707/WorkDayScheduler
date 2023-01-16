var currentDay = new Date();
var formattedDay = dayjs(currentDay).format("dddd, MMMM D, YYYY");
$("currentDay").text(formattedDay);

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

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
//
// TODO: Add code to display the current date in the header of the page.

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

setInterval(function () {
  var currentDate = new Date();
  var formattedDate = dayjs(currentDate).format("MMMM D, YYYY hh:mm A");
  $("#currentDate").text(formattedDate);
}, 60000);
