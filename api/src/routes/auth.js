const server = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { User } = require('../db.js');


const { HOSTFRONT, secretJWT } = process.env;

// PROBAR LA RUTA EN CHROME!!! 
server.get("/login/facebook", passport.authenticate("facebook"));

server.get("/login/facebook/callback", (req, res, next) => {
  passport.authorize("facebook", (err, user) => {
    if (err) return next(err);
    if (!user) { res.redirect(`${HOSTFRONT}/loginuser?error=401`) }
    else {
      const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin, userName: user.userName, firstName: user.firstName, lastName: user.lastName, email: user.email }, `${secretJWT}`); // acá necesito los datos de la base de datos 
      res.redirect(`${HOSTFRONT}/loginuser?t=${token}`); // VA AL FRONT Y PONE COMO QUERY EL TOKEN. 
    }
  })(req, res, next);
});


server.get('/me', async (req, res) => { 
    if (!req.user) { // se genera con el token que viene en el header
      res.sendStatus(401);
    } else if (!req.user.id) {
      res.sendStatus(401);
    } else {
      const user = await User.findByPk(req.user.id); // AGREGAR QUE TRAIGA LAS ÓRDENES Y CARRITO!!!
      const { id, userName, firstName, lastName, email, isAdmin } = user;
      res.json({ id, userName, firstName, lastName, email, isAdmin });
    }
});

module.exports = server;