const server = require('express').Router();
const { User } = require('../db.js');
const { Sequelize } = require('sequelize');

// RUTA EJEMPLO

server.get('/', (req, res, next) => {
    User.findAll()
    .then(users => res.send(users))
    .catch(next);
})