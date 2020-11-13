const server = require('express').Router();
const { Product, User, Order, OrderLine, Location} = require('../db.js');

//S34 Crear Ruta para agregar usuario
server.post('/', async (req, res, next) => {    
    try{     
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
            facebookId: req.body.facebookId
        });

        const location = await Location.create({
            address: req.body.address,
            number: req.body.number,
            postalCode: req.body.postalCode,
            city: req.body.city,
            province: req.body.province
        });

         await user.setLocation(location);
        res.status(200).json(user);
    } catch(error){       
        next(error);
    }
});

//S35 Crear Ruta para modificar usuario
server.put('/:userId', (req, res, next) => {
    const {userName, firstName, lastName, isAdmin, 
           email, telephone, password, gitHubId, 
           gmailId, facebookId, address, number, 
           postalCode, city, province} = req.body;

    User.findOne({
        where:{
            id: req.params.userId
        }
    })
    .then(user=>{
        if(!user){
            res.status(400).send("ERROR: El usuario que intenta modificar no existe.")
        }else {
            Location.findOne({
                where: {
                    id: user.locationId
                }
            })     
            .then(location => {
                location.update({
                    address, number, postalCode, 
                    city, province                     
                })
            });
            user.update({
                userName, firstName, lastName,
                isAdmin, email, telephone,
                password, gitHubId, gmailId,
                facebookId
            });
            res.status(200).json(user);       
        }
    })
    .catch(next);
});

//S36 Crear ruta que retorne todos los usuarios
server.get('/', (req, res, next)=>{
    User.findAll(
        {
            include: {
                model: Location
            }
        }
    )
    .then((user)=>{
        res.status(201).json(user);
    })
    .catch(next);
});

//Get user by Id
server.get('/:id', (req, res, next)=>{
    User.findByPk(   
           req.params.id        
    )
    .then(user => {
        if(user) {
            res.send(user)
        } else {
            res.status(400).send({error: 'No se identificó ese Usuario'});
        };
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
            Location.findOne({
                where: {
                    id: user.locationId
                }
            })   
            .then(location=>{
                location.destroy();
            }) 
            user.destroy();
            res.sendStatus(200);       
        }
    })
    .catch(next);       
});

module.exports = server;