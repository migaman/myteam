"use strict";

var schemaObject = require('schema-object');


// Create User schema 
var appointment = new schemaObject({
	idappointment: String,
	startdate: Date,
	enddate: Date,
	description: String,
	status: Number
});


module.exports = appointment;
