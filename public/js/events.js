"use strict";

// Userlist data array for filling in info box
var eventListData = [];


// DOM Ready =============================================================
$(document).ready(function () {

	// Populate the user table on initial page load
	populateTable();


});

// Functions =============================================================

// Fill table with data
function populateTable() {

	// Empty content string
	var tableContent = '';

	var statusEnum = Object.freeze({ "yes": 1, "no": 2, "maybe": 3 })

	// jQuery AJAX call for JSON
	$.getJSON('/api/events/eventlist', function (data) {

		// Stick our user data array into a userlist variable in the global object
		eventListData = data;

		// For each item in our JSON, add a table row and cells to the content string
		$.each(data, function () {
			tableContent += '<tr>';
			tableContent += '<td><a href="/event?idevent=' + this.idappointment + '" rel="' + this.idappointment + '">' + this.description + '</a></td>';
			tableContent += '<td>' + this.startdate.replace('T', ' ').substr(0, 19) + '</td>';
			tableContent += '<td>' + this.enddate.replace('T', ' ').substr(0, 19) + '</td>';


			var stateYes = 'value="0"';
			var activeYes = '';
			var stateMaybe = 'value="0"';
			var activeMaybe = '';
			var stateNo = 'value="0"';
			var activeNo = '';

			if (this.status === statusEnum.yes) {
				stateYes = 'checked="checked" value="1"';
				activeYes = "active";
			}
			else if (this.status === statusEnum.maybe) {
				stateMaybe = 'checked="checked" value="1"';
				activeMaybe = "active";
			}
			else if (this.status === statusEnum.no) {
				stateNo = 'checked="checked" value="1"';
				activeNo = "active";
			}

			tableContent += `<td>
							<div class="btn-group" data-toggle="buttons">
								
								<label class="btn btn_green ` + activeYes + `" >
									<input ` + stateYes + ` type="radio"> Yes
								</label>
								<label class="btn btn_orange ` + activeMaybe + `">
									<input ` + stateMaybe + ` type="radio"> Maybe
								</label>
								<label class="btn btn_red ` + activeNo + `">
									<input ` + stateNo + ` type="radio"> No
								</label>

							</div>
						</td>`;
			tableContent += '</tr>';


			tableContent += '</tr>';

		});

		// Inject the whole content string into our existing HTML table
		$('#eventList table tbody').html(tableContent);
	});
}


