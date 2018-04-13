"use strict";

var schemaObject = require('schema-object');


// Create User schema 
var appointment = new schemaObject({
	idappointment: String,
	startdate: Date,
	enddate: Date,
	description: String
});


module.exports = appointment;
