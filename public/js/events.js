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
	$.getJSON('/events/eventlist', function (data) {

		// Stick our user data array into a userlist variable in the global object
		eventListData = data;

		// For each item in our JSON, add a table row and cells to the content string
		$.each(data, function () {
			tableContent += '<tr>';
			tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.description + '">' + this.description + '</a></td>';
			tableContent += '<td>' + this.startdate.replace('T', ' ').substr(0, 19) + '</td>';
			tableContent += '<td>' + this.enddate.replace('T', ' ').substr(0, 19) + '</td>';
			if (this.status === statusEnum.yes) {
				tableContent += '<td><span class="label label-pill label-success">YES</span></td>';
			}
			else if (this.status === statusEnum.no) {
				tableContent += '<td><span class="label label-pill label-danger">NO</span></td>';
			}
			else if (this.status === statusEnum.maybe) {
				tableContent += '<td><span class="label label-pill label-warning">MAYBE</span></td>';
			}

			tableContent += '</tr>';

		});

		// Inject the whole content string into our existing HTML table
		$('#eventList table tbody').html(tableContent);
	});
}


