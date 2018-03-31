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
			if (err) throw err;
			var user = null;

			if (rs.rowCount) {
				user = new User({
					idaccount: rs.rows[0].idaccount,
					email: rs.rows[0].email,
					password: rs.rows[0].password
				});
			}

			cb(err, user);
		})
	},

	selectUserAccountById: function (idaccount, cb) {
		var sql = "SELECT idaccount, email, password FROM mt_account a WHERE idaccount = $1";
		pool.query(sql, [idaccount], (err, rs) => {
			if (err) throw err;

			var user = new User({
				idaccount: rs.rows[0].idaccount,
				email: rs.rows[0].email,
				password: rs.rows[0].password
			});

			cb(err, user);
		})
	},

	insertUserAccount: function (email, hash, cb) {

		var sql = "INSERT INTO mt_account(email, password) VALUES ($1, $2) RETURNING idaccount";
		pool.query(sql, [email, hash], (err, rs) => {
			if (err) throw err;

			var idaccount = rs.rows[0].idaccount;

			cb(err, idaccount);
		})
	},

	deleteUserAccount: function (idaccount, cb) {
		var sql = "DELETE FROM mt_account WHERE idaccount = $1";
		pool.query(sql, [idaccount], (err) => {
			if (err) throw err;
			cb(err);
		})
	},


	selectAllUsers: function (cb) {
		var sql = "SELECT array_to_json(array_agg(t)) FROM mt_account t";
		pool.query(sql, (err, rs) => {
			if (err) throw err;

			var jsonAllUsers = rs.rows[0].array_to_json;

			cb(err, jsonAllUsers);
		})
	}



}
