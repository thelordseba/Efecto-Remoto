const server = require('express').Router();
const { User } = require('../db.js');
const { Sequelize } = require('sequelize');

//S34 Crear Ruta para agregar usuario
server.post('/', (req, res, next) => {
    let {userName, firstName, lastName, isAdmin, email, telephone, password, gitHubId, gmailId, facebookId} = req.body
    User.create({
        userName,
        firstName,
        lastName,
        isAdmin,
        email,
        telephone,
        password,
        gitHubId,
        gmailId,
        facebookId                
    })                
    .then(cat => {
            res.status(201).json(cat);
        })
    .catch(next);
});

//S35 Crear Ruta para modificar usuario
server.put('/:userId', (req, res, next) => {
    let userId = req.params.userId;
    User.update(req.body, {
        where: {
            id: userId
        }
    })
    .then(cat => {
        res.status(200).send(cat);
    })
    .catch(next);
});


module.exports = server;