const tableBody = $("#table-body");
var listOfText = [];
var localStorageExist = false;

// Displays current date
var currentDay = moment().format("dddd, MMMM Do");
$("#currentDay").text(currentDay);

// generating the rows
function createRows() {
  const currentHour = moment().format("HH:mm a");
  var times = [
    "9 am",
    "10 am",
    "11 am",
    "12 pm",
    "1 pm",
    "2 pm",
    "3 pm",
    "4 pm",
    "5 pm",
  ];

  for (let index = 0; index < 9; index++) {
    const rowHour = times[index];
    const rowDiv = $("<tr>").addClass("row-div");
    rowDiv.attr("id", index);
    const th = $("<th>").addClass(
      "col d-flex justify-content-between time-cell"
    );
    th.attr("scope", "row");
    th.text(rowHour);
    const td = $("<td>").addClass("col-6 user-input");
    const textArea = $("<textarea>").addClass("user-input");

    if (currentHour === rowHour) {
      td.addClass("present");
    } else if (moment(currentHour).isAfter()) {
      td.addClass("past");
    } else {
      td.addClass("future");
    }

    if (localStorageExist === false) {
      var textObject = {
        hour: rowHour,
        textInput: "",
      };
      listOfText.push(textObject);
    } else {
      textArea.append(listOfText[index].textInput);
    }
    const tdBtn = $("<td>").addClass("col");
    const saveBtn = $("<button>").addClass("saveBtn");
    saveBtn.html("save");
    saveBtn.attr("data-index", index);
    tdBtn.append(saveBtn);

    td.append(textArea);

    rowDiv.append(th, td, tdBtn);

    tableBody.append(rowDiv);
  }

  $(".saveBtn").on("click", function (event) {
    var clickedIndex = $(this).attr("data-index");
    // var textInput = $("textArea").val();
    var textInput = $("#" + clickedIndex)
      .find("textarea")
      .val();
    listOfText[clickedIndex].textInput = textInput;
    console.log(textInput);
    localStorage.setItem("text", JSON.stringify(listOfText));
  });
}

// function calls
function init() {
  listOfText = JSON.parse(localStorage.getItem("text"));
  if (listOfText === null) {
    listOfText = [];
  } else {
    localStorageExist = true;
  }
}
init();
createRows();
