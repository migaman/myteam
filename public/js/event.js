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
	$.getJSON('/events/' + idevent, function (data) {

		// For each item in our JSON, add a table row and cells to the content string
		$.each(data, function () {
			tableContent += '<tr>';
			tableContent += '<td>' + this.firstname + '</td>';
			tableContent += '<td>' + this.lastname + '</td>';
			if (this.status === statusEnum.yes) {
				tableContent += '<td><span class="label label-pill label-success">YES</span></td>';
			}
			else if (this.status === statusEnum.no) {
				tableContent += '<td><span class="label label-pill label-danger">NO</span></td>';
			}
			else if (this.status === statusEnum.maybe) {
				tableContent += '<td><span class="label label-pill label-warning">MAYBE</span></td>';
			}
			else {
				//status not defined yet
				tableContent += '<td><span class="label label-pill label-default">?</span></td>';
			}
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




