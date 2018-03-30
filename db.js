"use strict";

const Pool = require('pg-pool');
const url = require('url')

const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');

const config = {
	user: auth[0],
	password: auth[1],
	host: params.hostname,
	port: params.port,
	database: params.pathname.split('/')[1],
	ssl: true
};

const pool = new Pool(config);


//Doku für dies: https://github.com/brianc/node-pg-pool
module.exports = {

	selectUserAccountByEmail: function (email, cb) {
		var sql = "SELECT idaccount, email, password FROM mt_account a WHERE email = $1";
		pool.query(sql, [email], (err, rows) => {
			if (err) throw err;
			cb(err, rows);
		})
	},

	selectUserAccountById: function (idaccount, cb) {
		var sql = "SELECT idaccount, email, password FROM mt_account a WHERE idaccount = $1";
		pool.query(sql, [idaccount], (err, rows) => {
			if (err) throw err;
			cb(err, rows);
		})
	},

	insertUserAccount: function (email, hash, cb) {

		var sql = "INSERT INTO mt_account(email, password) VALUES ($1, $2) RETURNING idaccount";
		pool.query(sql, [email, hash], (err, rows) => {
			if (err) throw err;
			cb(err, rows);
		})
	},



}
