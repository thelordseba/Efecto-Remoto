const server = require("express").Router();
const { User, Location } = require("../db.js");
const isAdmin = require("./isAdmin.js");
const SendEmail = require("../emailModel/SendEmail.js");

//S34 Crear Ruta para agregar usuario
server.post("/", async (req, res, next) => {
  try {
    const user = await User.create({
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      isAdmin: req.body.isAdmin,
      email: req.body.email,
      telephone: req.body.telephone,
      password: req.body.password,
      gitHubId: req.body.gitHubId,
      gmailId: req.body.gmailId,
      facebookId: req.body.facebookId,
    });
    const location = await Location.create({
      address: req.body.address,
      number: req.body.number,
      postalCode: req.body.postalCode,
      city: req.body.city,
      province: req.body.province,
    });
    await user.setLocation(location);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

//S35 Crear Ruta para modificar usuario
server.put("/:userId", async (req, res, next) => {
  const {
    userName,
    firstName,
    lastName,
    isAdmin,
    email,
    telephone,
    password,
    gitHubId,
    gmailId,
    facebookId,
    address,
    number,
    postalCode,
    city,
    province,
  } = req.body;

  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    const location = await Location.findOne({
      where: { id: user.locationId },
    });
    await location.update({
      address,
      number,
      postalCode,
      city,
      province,
    });
    await user.update({
      userName,
      firstName,
      lastName,
      isAdmin,
      email,
      telephone,
      password,
      gitHubId,
      gmailId,
      facebookId,
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// S67: POST /auth/promote/:id --> Promote convierte al usuario con ID: id a Admin. S115
server.put("/:userId/isAdmin", async (req, res, next) => {
  if (isAdmin(req)) {
    const { isAdmin } = req.body;
    try {
      const user = await User.findOne({ where: { id: req.params.userId } });
      await user.update({ isAdmin });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
});

//S36 Crear ruta que retorne todos los usuarios S115
server.get("/", async (req, res, next) => {
  // if (isAdmin(req)) {
  try {
    const users = await User.findAll({
      include: [{ model: Location }],
    });
    res.send(users);
  } catch (error) {
    next(error);
  }
  // }
});

//Get user Id by Email S115 //Si encuentra el user envía email para restablecer el password
server.get("/getUserbyEmail", async (req, res, next) => {  
    const userEmail = req.query.userEmail;
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        }
      });     
      if(!!user) {
        SendEmail(user, false);
      } 
      res.json(user);
    } catch (error) {
      next(error);
    }  
});

//Get user by Id S115
server.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
      include: [{ model: Location }],
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

//S37 Crear ruta para eliminar un usuario S115
server.delete("/:userId", async (req, res, next) => {
  if (isAdmin(req)) {
    try {
      const user = await User.findOne({
        where: {
          id: req.params.userId,
        },
      });
      const location = await Location.findOne({
        where: {
          id: user.locationId,
        },
      });
      await location.destroy();
      await user.destroy();
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
});

server.post("/:userId/passwordReset", async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.update(req.body, {
      where: { id: userId },
    });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = server;
