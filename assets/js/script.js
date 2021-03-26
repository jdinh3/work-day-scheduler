var schedule = [];
const tableBody = $("#table-body"); //$("<div>")

// Displays current date
var currentDay = moment().format("dddd, MMMM Do");
$("#currentDay").text(currentDay);

// generating the rest of the rows
function createRows() {
  /**
     *    <tr class="row-div">
            <th
              class="col d-flex justify-content-between time-cell"
              scope="row"
            >
              9am
            </th>
            <td class="col-6 user-input">Mark</td>
            <td class="col">
              <button class="saveBtn" img src="#" alt="save button">
                Save
              </button>
            </td>
          </tr>
     */
  const currentHour = parseInt(moment().format("HH"));

  for (let index = 0; index < 9; index++) {
    const rowHour = index + 9;
    const rowDiv = $("<tr>").addClass("row-div");
    rowDiv.attr("id", rowHour);
    const th = $("<th>").addClass(
      "col d-flex justify-content-between time-cell"
    );
    th.text(rowHour);
    th.attr("scope", "row");
    const td = $("<td>").addClass("col-6 user-input");

    if (currentHour === rowHour) {
      td.addClass("present");
    } else if (currentHour > rowHour) {
      td.addClass("past");
    } else {
      td.addClass("future");
    }
    const tdBtn = $("<td>").addClass("col");
    const saveBtn = $("<button>").addClass("saveBtn");
    tdBtn.append(saveBtn);

    rowDiv.append(th, td, tdBtn);

    tableBody.append(rowDiv);
  }

  $(".saveBtn").on("click", function (event) {
    const parentEl = $(this).parent().parent();
    console.log(parentEl);
    console.log(parentEl.find(".user-input"));
    console.log($(this).parent().siblings());
  });
}

createRows();
