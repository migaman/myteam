"use strict";

const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
var schemaObject = require('schema-object');


// Create User schema 
var User = new schemaObject({
	idAccount: Number,
	email: String,
	password: String,
	passwordResetToken: String,
	passwordResetExpires: Date,
	createdAt: Date,
	updatedAt: Date,

	twitter: String,
	google: String,
	github: String,
	linkedin: String,
	tokens: Array,

	profile: {
		name: String,
		gender: String,
		location: String,
		website: String,
		picture: String
	}

},
	{
		methods: {
			/**
		   * Helper method for getting user's gravatar.
		   */
			gravatar: function (size) {
				if (!size) {
					size = 200;
				}
				if (!this.email) {
					return `https://gravatar.com/avatar/?s=${size}&d=retro`;
				}
				const md5 = crypto.createHash('md5').update(this.email).digest('hex');
				return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
			}
			,

			/**
			 * Helper method for validating user's password.
			 */
			comparePassword: function (candidatePassword, cb) {
				bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
					cb(err, isMatch);
				});
			}



		}

	}

);








module.exports = User;
