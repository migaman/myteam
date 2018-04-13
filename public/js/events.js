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

	// jQuery AJAX call for JSON
	$.getJSON('/events/eventlist', function (data) {

		// Stick our user data array into a userlist variable in the global object
		eventListData = data;

		// For each item in our JSON, add a table row and cells to the content string
		$.each(data, function () {
			tableContent += '<tr>';
			tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.description + '">' + this.description + '</a></td>';
			tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.startdate + '">' + this.startdate + '</a></td>';
			tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.enddate + '">' + this.enddate + '</a></td>';
			tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this.idappointment + '">status</a></td>';
			tableContent += '</tr>';

		});

		// Inject the whole content string into our existing HTML table
		$('#eventList table tbody').html(tableContent);
	});
}


