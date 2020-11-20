const server = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { User } = require("../db.js");

const { HOSTFRONT, secretJWT } = process.env;

// login local
server.post("/login/email", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ status: "error", code: "unauthorized", message: "Usuario y/o contraseña inválida", info });
    } else {
      return res.send(jwt.sign({ id: user.id, isAdmin: user.isAdmin }, secretJWT));
    }
  })(req, res, next);
});

server.post('/logout/email', (req, res,) => {
	if (req.isAuthenticated()) {
		req.logout();
		res.sendStatus(200);
	}
    return res.status(401).send('Error de logueo');
}); 

server.post("/register", async (req, res) => {
  const {
    firstName, 
    lastName,
    email,
    password,
  } = req.body;
  try {
    if (!name || !email || !password)
      res.status(400).json({ message: 'Datos incompletos' })
    else {
      const user = await User.create(firstName, lastName, email, password)
      return res.json({
        user,
        token: jwt.sign({ id: user.id, isAdmin: user.isAdmin }, secretJWT),
      });
    }
  }
  catch (err) {
    console.log(err.message)
    res.status(400).json({ message: 'Email en uso' })
  }
})

// PROBAR LA RUTA EN CHROME!!!
server.get("/login/facebook", passport.authenticate("facebook"));

server.get("/login/facebook/callback", (req, res, next) => {
  passport.authorize("facebook", (err, user) => {
    if (err) return next(err);
    if (!user) {
      res.redirect(`${HOSTFRONT}/loginuser?error=401`);
    } else {
      const token = jwt.sign(
        {
          id: user.id,
          isAdmin: user.isAdmin,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        `${secretJWT}`
      ); // acá necesito los datos de la base de datos
      res.redirect(`${HOSTFRONT}loginuser?t=${token}`); // VA AL FRONT Y PONE COMO QUERY EL TOKEN.
    }
  })(req, res, next);
});

server.get("/me", async (req, res) => {
  if (!req.user) {
    // se genera con el token que viene en el header
    res.sendStatus(401);
  } else if (!req.user.id) {
    res.sendStatus(401);
  } else {
    const user = await User.findByPk(req.user.id); // AGREGAR QUE TRAIGA LAS ÓRDENES Y CARRITO!!!
    const { id, userName, firstName, lastName, email, isAdmin } = user;
    res.json({ id, userName, firstName, lastName, email, isAdmin });
  }
});

server.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

server.get("/login/google/callback", (req, res, next) => {
  passport.authorize("google", (err, user) => {
    if (err) return next(err);
    if (!user) {
      res.redirect(`${HOSTFRONT}/loginuser?error=401`);
    } else {
      const token = jwt.sign({ 
        id: user.id,
          isAdmin: user.isAdmin,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email, },
          `${secretJWT}`
           );
      res.redirect(`${HOSTFRONT}/loginuser?t=${token}`);
    }
  })(req, res, next);
});


module.exports = server;