"use strict";

const Pool = require('pg-pool');
const url = require('url')

const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');
var usermodel = require.main.require('../models/usermodel');
var appointmentmodel = require.main.require('../models/appointmentmodel');
var eventmodel = require.main.require('../models/eventmodel');
var playermodel = require.main.require('../models/playermodel');

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
        var sql = "SELECT idaccount, email, password FROM mt_account a WHERE email = $1 and email is not null";
        pool.query(sql, [email], (err, rs) => {
            if (err) {
                cb(err);
            }
            else {
                var user = null;

                if (rs.rowCount) {
                    user = new usermodel();
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
                var user = null;

                if (rs.rowCount) {
                    user = new usermodel();
                    user.idaccount = rs.rows[0].idaccount;
                    user.email = rs.rows[0].email;
                    user.password = rs.rows[0].password;
                    user.profile.name = rs.rows[0].username;
                    user.profile.location = rs.rows[0].location;
                    user.profile.gender = rs.rows[0].gender;
                    user.profile.website = rs.rows[0].website;
                }

                cb(err, user);
            }
        })
    },

    selectUserAccountByGithubId: function (idprofile, cb) {
        var sql = "SELECT idaccount, email, password, username, gender, location, website FROM mt_account a WHERE github = $1";
        pool.query(sql, [idprofile], (err, rs) => {
            if (err) {
                cb(err);
            }
            else {
                var user = null;

                if (rs.rowCount) {
                    user = new usermodel();
                    user.idaccount = rs.rows[0].idaccount;
                    user.email = rs.rows[0].email;
                    user.password = rs.rows[0].password;
                    user.profile.name = rs.rows[0].username;
                    user.profile.location = rs.rows[0].location;
                    user.profile.gender = rs.rows[0].gender;
                    user.profile.website = rs.rows[0].website;
                }

                cb(err, user);
            }
        })
    },

    selectUserAccountByResetToken: function (passwordresettoken, passwordresetexpires, cb) {

        var sql = "SELECT idaccount, email, password, username, gender, location, website FROM mt_account a WHERE passwordresettoken = $1 AND passwordresetexpires >= $2";
        pool.query(sql, [passwordresettoken, passwordresetexpires], (err, rs) => {
            if (err) {
                cb(err);
            }
            else {
                var user = null;

                if (rs.rowCount) {
                    user = new usermodel();
                    user.idaccount = rs.rows[0].idaccount;
                    user.email = rs.rows[0].email;
                    user.password = rs.rows[0].password;
                    user.profile.name = rs.rows[0].username;
                    user.profile.location = rs.rows[0].location;
                    user.profile.gender = rs.rows[0].gender;
                    user.profile.website = rs.rows[0].website;
                }

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

    insertUserAccountGitHub: function (user, cb) {

        var sql = "INSERT INTO mt_account(email, github, githubaccesstoken, username) VALUES ($1, $2, $3, $4) RETURNING idaccount";
        pool.query(sql, [user.email, user.github, user.githubaccesstoken, user.profile.name], (err, rs) => {
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

    updatetUserAccountGitHub: function (user, cb) {
        var sql = `UPDATE mt_account SET 
					email = $1
					, github = $2
					, githubaccesstoken	= $3
					, username  = $4
					, website   = $5
					 WHERE idaccount = $6`;
        pool.query(sql, [user.email, user.github, user.githubaccesstoken, user.profile.name, user.profile.website, user.idaccount], (err) => {
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

    updatetUserAccountPasswordViaReset: function (user, cb) {
        var sql = `UPDATE mt_account SET 
					password = $1
					, passwordResetToken = null
					, passwordResetExpires = null
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

    updatetUserAccountPasswordReset: function (user, cb) {
        var sql = `UPDATE mt_account SET 
					  passwordResetToken = $1
					, passwordResetExpires = $2
					WHERE idaccount = $3`;
        pool.query(sql, [user.passwordResetToken, user.passwordResetExpires, user.idaccount], (err) => {
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
    },

    selectEvents: function (idaccount, cb) {
        var sql = `SELECT 
						a.idappointment
						, a.startdate
						, a.enddate
						, a.description
						, pa.idparticipationstatus
				  	FROM mt_appointment a
				  	LEFT OUTER JOIN mt_player pla ON pla.idaccount = $1
					LEFT OUTER JOIN mt_playerappointment pa ON a.idappointment = pa.idappointment AND pa.idplayer = pla.idplayer`;
        pool.query(sql, [idaccount], (err, rs) => {
            if (err) {
                cb(err);
            }
            else {
                var appointments = [];
                if (rs.rowCount) {
                    for (var i = 0; i < rs.rowCount; i++) {
                        var app = new appointmentmodel();
                        app.idappointment = rs.rows[i].idappointment;
                        app.startdate = rs.rows[i].startdate;
                        app.enddate = rs.rows[i].enddate;
                        app.description = rs.rows[i].description;
                        app.status = rs.rows[i].idparticipationstatus;
                        appointments.push(app);
                    }

                }

                cb(err, appointments);
            }

        })
    },

    selectEvent: function (idevent, cb) {
        var sql = `SELECT 
						a.idappointment
						, a.startdate
						, a.enddate
						, a.description
						, pla.idplayer
						, pla.firstname
						, pla.lastname
						, pa.idparticipationstatus
					FROM mt_appointment a
					CROSS JOIN mt_player pla
					LEFT OUTER JOIN mt_playerappointment pa ON a.idappointment = pa.idappointment AND pa.idplayer = pla.idplayer
					WHERE a.idappointment = $1;`;
        pool.query(sql, [idevent], (err, rs) => {
            if (err) {
                cb(err);
            }
            else {
                var eventmodels = [];
                if (rs.rowCount) {
                    for (var i = 0; i < rs.rowCount; i++) {
                        var event = new eventmodel();
                        event.idappointment = rs.rows[i].idappointment;
                        event.startdate = rs.rows[i].startdate;
                        event.enddate = rs.rows[i].enddate;
                        event.description = rs.rows[i].description;
                        event.idplayer = rs.rows[i].idplayer;
                        event.firstname = rs.rows[i].firstname;
                        event.lastname = rs.rows[i].lastname;
                        event.status = rs.rows[i].idparticipationstatus;
                        eventmodels.push(event);
                    }

                }

                cb(err, eventmodels);
            }

        })
    },

    selectPlayers: function (cb) {
        var sql = `SELECT 
						p.idplayer
						, p.firstname
						, p.lastname
						, p.playernr
					FROM mt_player p`;
        pool.query(sql, (err, rs) => {
            if (err) {
                cb(err);
            }
            else {
                var players = [];
                if (rs.rowCount) {
                    for (var i = 0; i < rs.rowCount; i++) {
                        var player = new playermodel();
                        player.idplayer = rs.rows[i].idplayer;
                        player.firstname = rs.rows[i].firstname;
                        player.lastname = rs.rows[i].lastname;
                        player.playerno = rs.rows[i].playernr;
                        players.push(player);
                    }

                }

                cb(err, players);
            }

        })
    },

    selectPlayer: function (idplayer, cb) {
        var sql = `SELECT 
						p.idplayer
						, p.firstname
						, p.lastname
						, p.playernr
					FROM mt_player p
					WHERE p.idplayer = $1`;
        pool.query(sql, [idplayer], (err, rs) => {
            if (err) {
                cb(err);
            }
            else {
                var player = new playermodel();
                if (rs.rowCount) {
                    player.idplayer = rs.rows[0].idplayer;
                    player.firstname = rs.rows[0].firstname;
                    player.lastname = rs.rows[0].lastname;
                    player.playerno = rs.rows[0].playernr;
                }
                cb(err, player);

            }

        })
    }




}
