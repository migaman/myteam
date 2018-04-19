"use strict";

var schemaObject = require('schema-object');


// Create User schema 
var playermodel = new schemaObject({
    idplayer: String,
    firstname: String,
    lastname: String,
    playerno: Number
});



module.exports = playermodel;
