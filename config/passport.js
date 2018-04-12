"use strict";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

const bcrypt = require('bcrypt-nodejs');
var User = require.main.require('../models/User');
var db = require('./../db');

passport.serializeUser((user, done) => {
	//https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
	//The user id is saved in the session and is later used to retrieve the whole object via the deserializeUser function.
	done(null, user.idaccount);
});

passport.deserializeUser((id, done) => {
	//The id corresponds to the key of the user object that was given to the done function in serializeUser
	db.selectUserAccountById(id, (err, user) => {
		//The fetched object is attached to the request object as req.user
		done(err, user);
	});


});

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

	db.selectUserAccountByEmail(email.toLowerCase(), (err, user) => {
		if (err) { return done(err); }
		if (user === null) {
			return done(null, false, { msg: `Email ${email} not found.` });
		}
		else {
			bcrypt.compare(password, user.password, (err, isMatch) => {
				if (err) {
					return done(err);
				}

				if (isMatch) {
					return done(null, user);
				}
				return done(null, false, { msg: 'Invalid email or password.' });
			});
		}
	});

}));

/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */


/**
 * Sign in with GitHub.
 */

passport.use(new GitHubStrategy({
	clientID: process.env.GITHUB_ID,
	clientSecret: process.env.GITHUB_SECRET,
	callbackURL: '/auth/github/callback',
	passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {

	//Check if user is already logged in
	if (req.user) {
		//Link GitHub Account to existing account
		db.selectUserAccountByGithubId(profile.id, (err, existingUser) => {
			if (existingUser !== null) {
				req.flash('errors', { msg: 'There is already a GitHub account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
				done(err);
			} else {

				db.selectUserAccountById(req.user.idaccount, (err, user) => {
					if (err) {
						return done(err);
					}
					user.github = profile.id;
					user.githubaccesstoken = accessToken;
					user.profile.name = user.profile.name || profile.displayName;
					user.profile.picture = user.profile.picture || profile._json.avatar_url;
					user.profile.location = user.profile.location || profile._json.location;
					user.profile.website = user.profile.website || profile._json.blog;

					db.updatetUserAccountGitHub(user, (err) => {
						if (err) {
							return done(err);
						}
						else {
							req.flash('info', { msg: 'GitHub account has been linked.' });
							done(err, user);
						}

					});
				});
			}
		});
	} else {
		//Login with existing account or create a new account
		db.selectUserAccountByGithubId(profile.id, (err, existingUser) => {
			if (err) { return done(err); }
			if (existingUser !== null) {
				//Login with existing account
				return done(null, existingUser);
			}

			//Check if E-Mail address of github account is already in use
			//Attention: E-Mail field is empty if it is private in github account
			db.selectUserAccountByEmail(profile._json.email, (err, existingEmailUser) => {
				if (err) {
					return done(err);
				}
				if (existingEmailUser != null) {
					req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with GitHub manually from Account Settings.' });
					done(err);
				} else {
					var user = new User();
					user.email = profile._json.email;
					user.github = profile.id;
					user.githubaccesstoken = accessToken;
					user.profile.name = profile.displayName;
					user.profile.picture = profile._json.avatar_url;
					user.profile.location = profile._json.location;
					user.profile.website = profile._json.blog;
					db.insertUserAccountGitHub(user, (err, idaccount) => {
						user.idaccount = idaccount;
						done(err, user);
					});
				}
			});
		});
	}
}));


/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
	const provider = req.path.split('/').slice(-1)[0];
	const token = req.user.tokens.find(token => token.kind === provider);
	if (token) {
		next();
	} else {
		res.redirect(`/auth/${provider}`);
	}
};
