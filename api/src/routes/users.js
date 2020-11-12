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

//S41 : Crear Ruta para editar las cantidades del carrito
//Descripción
// Crear Ruta para editar las cantidades del carrito

// PUT /users/:idUser/cart

server.put('/:userId/cart', (req, res) => {
    Order.findOne({
        where: { userId: req.params.userId, status: "open" }
    }).then(order => {
        OrderLine.findOne({
            where: { orderId: order.id, productId: req.body.productId }
        }).then(orderLine => {
            if(req.body.quantity === 'add') {
               orderLine.update({
                    quantity: orderLine.quantity + 1
                })
                res.status(200).json({ orderLine });
            }
            if(req.body.quantity === 'subtract') {
                orderLine.update({
                    quantity: orderLine.quantity - 1
                })
                res.status(200).json({ orderLine });
            }
        })
    }).catch(error => { res.status(400).json({ error })
  })
})

module.exports = server;