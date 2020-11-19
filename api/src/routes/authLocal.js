const router = require('express').Router();
const passport = require('passport');
const {User} = require('../db');
const token = require('jsonwebtoken');


// login local
router.post('/login/email', passport.authenticate('local'), (req, res) => {
	res.send(req.user);
});

router.post('/logout/email', (req, res,) => {
	if (req.isAuthenticated()) {
		req.logout();
		res.sendStatus(200);
	}
    return res.status(400).send('Error de logueo');
}); 

// const token = jwt.sign({user: boy}, 'top_secret' )
// return res.json({token});




module.exports = router;
