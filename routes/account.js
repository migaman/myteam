var express = require('express');
var router = express.Router();
var log = require('log4js').getLogger("index");
const passport = require('passport');


/*
 * GET login
 */
router.get('/login', function(req, res) {
	log.debug("This is in the account module");
	if (req.user) {
		return res.redirect('/');
	}
    res.render('login', { title: 'Hello, World!', user: 'hans' });
});

/*
 * POST to adduser.
 */
router.post('/login', function(req, res, next) {
    log.debug("This is in the account module: POST login");
	
	req.assert('email', 'Email is not valid').isEmail();
	req.assert('password', 'Password cannot be blank').notEmpty();
	req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

	const errors = req.validationErrors();

	if (errors) {
		req.flash('errors', errors);
		return res.redirect('/account/login');
	}
	
	log.info("nun login local");

	passport.authenticate('local', (err, user, info) => {
		log.info("auth nun login local");
		if (err) { 
			log.info("ndddun login local");
			return next(err); 
		}
		log.info("bbb nun login local");
		if (!user) {
			log.info("renun login local");
			req.flash('errors', info);
			return res.redirect('/account/login');
		}
		log.info("dd  sddfnun login local");
		req.logIn(user, (err) => {
		  if (err) { 
			log.info("error nun login local");
			return next(err); 
		}
		log.info("alls ok");
		  req.flash('success', { msg: 'Success! You are logged in.' });
		  res.redirect(req.session.returnTo || '/');
		});
	})(req, res, next);
	
});


module.exports = router;