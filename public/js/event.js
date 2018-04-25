"use strict";


// DOM Ready =============================================================
$(document).ready(function () {
	// Populate the user table on initial page load
	populateTable(params.idevent);

});

// Functions =============================================================

// Fill table with data
function populateTable(idevent) {

	// Empty content string
	var tableContent = '';

	var statusEnum = Object.freeze({ "yes": 1, "no": 2, "maybe": 3 })
	//read parameter idappointment

	// jQuery AJAX call for JSON
	$.getJSON('/api/events/' + idevent, function (data) {

		// For each item in our JSON, add a table row and cells to the content string
		$.each(data, function () {
			tableContent += '<tr>';
			tableContent += '<td>' + this.firstname + '</td>';
			tableContent += '<td>' + this.lastname + '</td>';

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

		});

		// Inject the whole content string into our existing HTML table
		$('#playerList table tbody').html(tableContent);
	});
}


function getSearchParameters() {
	var prmstr = window.location.search.substr(1);
	return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray(prmstr) {
	var params = {};
	var prmarr = prmstr.split("&");
	for (var i = 0; i < prmarr.length; i++) {
		var tmparr = prmarr[i].split("=");
		params[tmparr[0]] = tmparr[1];
	}
	return params;
}

var params = getSearchParameters();




