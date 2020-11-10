const server = require('express').Router();
const { User } = require('../db.js');
const { Sequelize } = require('sequelize');

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

//S36 Crear ruta que retorne todos los usuarios
server.get('/', (req, res, next)=>{
    User.findAll()
    .then((user)=>{
        res.status(201).json(user);
    })
    .catch(next);
});

module.exports = server;