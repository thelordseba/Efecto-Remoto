const server = require('express').Router();
const { User } = require('../db.js');

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

//S36 Crear ruta que retorne todos los usuarios
server.get('/', (req, res, next)=>{
    User.findAll()
    .then((user)=>{
        res.status(201).json(user);
    })
    .catch(next);
});

//S37 Crear ruta para eliminar un usuario
server.delete('/:userId', (req, res, next)=>{
    User.findOne({
        where:{
            id: req.params.userId
        }
    })
    .then(user=>{
        if(!user){
            res.status(400).send("ERROR: El usuario que intenta eliminar no existe.");
        }else{     
            user.destroy();
            res.sendStatus(200);       
        }
    })
    .catch(next);       
});

module.exports = server;