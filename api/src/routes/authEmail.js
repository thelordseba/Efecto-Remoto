const server = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
//const { User } = require("../db.js");

const { HOSTFRONT, secretJWT } = process.env;

server.get("/", (req, res, next) => {
  passport.authorize("local", (err, user) => {
    if (err) return next(err);
    
    const token = jwt.sign(
    {        
        email: user.email
    },
    `${secretJWT}`
    );

      res.send(`${HOSTFRONT}/newpass?t=${token}`);
    
  })(req, res, next);
});

module.exports = server;
