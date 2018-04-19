"use strict";

var schemaObject = require('schema-object');


// Create appointment schema 
var appointmentmodel = new schemaObject({
    idappointment: String,
    startdate: Date,
    enddate: Date,
    description: String,
    status: Number,
});


module.exports = appointmentmodel;
