"use strict";

// Userlist data array for filling in info box
var playerListData = [];


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
	$.getJSON('/api/players/playerlist', function (data) {

		// Stick our user data array into a userlist variable in the global object
		playerListData = data;

		// For each item in our JSON, add a table row and cells to the content string
		$.each(data, function () {
			tableContent += '<tr>';
			tableContent += '<td><a href="/player?idplayer=' + this.idplayer + '" rel="' + this.idplayer + '">' + this.idplayer + '</a></td>';
			tableContent += '<td>' + this.firstname + '</td>';
			tableContent += '<td>' + this.lastname + '</td>';
			tableContent += '<td>' + this.playerno + '</td>';
			tableContent += '</tr>';

		});

		// Inject the whole content string into our existing HTML table
		$('#playerList table tbody').html(tableContent);
	});
}


