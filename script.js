// the current day is displayed at the top of the calendar
var dateToday = moment().format("dddd, MMM Do YYYY");

$("#currentDay").text(dateToday);

// I am presented with timeblocks for standard business hours
var hours = [
  { stringTime: "9AM", numTime: 0900 },
  { stringTime: "10AM", numTime: 1000 },
  { stringTime: "11AM", numTime: 1100 },
  { stringTime: "12PM", numTime: 1200 },
  { stringTime: "1PM", numTime: 1300 },
  { stringTime: "2PM", numTime: 1400 },
  { stringTime: "3PM", numTime: 1500 },
  { stringTime: "4PM", numTime: 1600 },
  { stringTime: "5PM", numTime: 1700 },
];

// make a row for every hour from 9am - 5pm
// get the hours from 9am - 5pm
hours.map((hour) => {
  var hourRow = $("<div>");
  hourRow.attr("class", "row");

  var hourSpan = $("<span>");
  hourSpan.attr("class", "hour col");
  hourSpan.text(hour.stringTime);
  hourRow.append(hourSpan);

  // WHEN I click into a timeblock
  // THEN I can enter an event
  var hourDescription = $("<textarea>");
  hourDescription.attr("class", "description");

  var saveBtn = $("<button>");
  saveBtn.attr("class", "saveBtn");
  saveBtn.text("Save");

  // WHEN I click the save button for that timeblock
  saveBtn.on("click", function () {
    // THEN the text for that event is saved in local storage
    var event = hourDescription.val();
    localStorage.setItem(hour.stringTime, event);
  });

  var storedValue = localStorage.getItem(hour.stringTime);

  // WHEN I refresh the page
  // THEN the saved events persist
  if (storedValue) {
    hourDescription.val(storedValue);
  }

  // WHEN I view the timeblocks for that day
  $(".time-block").append(hourRow);
  hourRow.append(hourDescription);
  hourRow.append(saveBtn);

  var timeNow = parseInt(moment().format("HH") + "00");
  var hourNow = parseInt(hour.numTime);

  // THEN each timeblock is color coded to indicate whether it is in the past, present, or future
  if (hourNow === timeNow) {
    hourDescription.addClass("present");
  } else if (hourNow <= timeNow) {
    hourDescription.addClass("past");
  } else {
    hourDescription.addClass("future");
  }
});