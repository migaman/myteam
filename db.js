"use strict";

const Pool = require('pg-pool');
const url = require('url')

const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');
var User = require.main.require('../models/User');

//pg-pool doesn't acceppt database_url: https://github.com/brianc/node-pg-pool
const config = {
	user: auth[0],
	password: auth[1],
	host: params.hostname,
	port: params.port,
	database: params.pathname.split('/')[1],
	ssl: true
};

const pool = new Pool(config);



module.exports = {

	selectUserAccountByEmail: function (email, cb) {
		var sql = "SELECT idaccount, email, password FROM mt_account a WHERE email = $1";
		pool.query(sql, [email], (err, rs) => {
			if (err) {
				cb(err);
			}
			else {
				var user = null;

				if (rs.rowCount) {
					user = new User();
					user.idaccount = rs.rows[0].idaccount;
					user.email = rs.rows[0].email;
					user.password = rs.rows[0].password;
				}

				cb(err, user);
			}

		})
	},

	selectUserAccountById: function (idaccount, cb) {
		var sql = "SELECT idaccount, email, password, username, gender, location, website FROM mt_account a WHERE idaccount = $1";
		pool.query(sql, [idaccount], (err, rs) => {
			if (err) {
				cb(err);
			}
			else {
				var user = new User();
				user.idaccount = rs.rows[0].idaccount;
				user.email = rs.rows[0].email;
				user.password = rs.rows[0].password;
				user.profile.name = rs.rows[0].username;
				user.profile.location = rs.rows[0].location;
				user.profile.gender = rs.rows[0].gender;
				user.profile.website = rs.rows[0].website;

				cb(err, user);
			}
		})
	},

	insertUserAccount: function (email, hash, cb) {

		var sql = "INSERT INTO mt_account(email, password) VALUES ($1, $2) RETURNING idaccount";
		pool.query(sql, [email, hash], (err, rs) => {
			if (err) {
				cb(err);
			}
			else {
				var idaccount = rs.rows[0].idaccount;
				cb(err, idaccount);
			}

		})
	},

	updatetUserAccount: function (user, cb) {
		var sql = `UPDATE mt_account SET 
					email = $1
					, username	= $2
					, gender	= $3
					, location  = $4
					, website   = $5
					 WHERE idaccount = $6`;
		pool.query(sql, [user.email, user.profile.name, user.profile.gender, user.profile.location, user.profile.website, user.idaccount], (err) => {
			if (err) {
				cb(err);
			}
			else {
				cb();
			}

		})
	},

	updatetUserAccountPassword: function (user, cb) {
		var sql = `UPDATE mt_account SET 
					password = $1
					 WHERE idaccount = $2`;
		pool.query(sql, [user.password, user.idaccount], (err) => {
			if (err) {
				cb(err);
			}
			else {
				cb();
			}

		})
	},

	deleteUserAccount: function (idaccount, cb) {
		var sql = "DELETE FROM mt_account WHERE idaccount = $1";
		pool.query(sql, [idaccount], (err) => {
			if (err) {
				cb(err);
			}
			else {
				cb();
			}
		})
	},


	selectAllUsers: function (cb) {
		var sql = "SELECT array_to_json(array_agg(t)) FROM mt_account t";
		pool.query(sql, (err, rs) => {
			if (err) {
				cb(err);
			}
			else {
				var jsonAllUsers = rs.rows[0].array_to_json;
				cb(err, jsonAllUsers);
			}
		})
	}



}
