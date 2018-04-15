"use strict";

var schemaObject = require('schema-object');


// Create User schema 
var eventmodel = new schemaObject({
	idappointment: String,
	startdate: Date,
	enddate: Date,
	description: String,
	idplayer: Number,
	firstname: String,
	lastname: String,
	status: Number
});


module.exports = eventmodel;
