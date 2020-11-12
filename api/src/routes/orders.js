const server = require('express').Router();
const { Order, User, Product, OrderLine } = require('../db.js');

//S44 Crear Ruta que retorne todas las ordenes (retorna las ordenes de un determinado status)
server.get('/', (req, res, next)=>{
    let {status} = req.query.status;
    Order.findAll({
        where:{
            status : status        //Status posibles => ['cart', 'created', 'processing', 'cancelled', 'completed']
        },
        include: [
            {
                model: User
            },
            {
                model: OrderLine,
                include: [
                    {
                        model:Product
                    }
                ]
            }
        ]
    })
    .then(order=>{
        res.status(200).json(order);
    })
    .catch(next);
});

//S46 Crear una ruta que retorne una orden en particular
server.get('/:id', (req, res, next)=>{
    Order.findOne({
        where:{
            id: req.params.id
        }, 
        include: [
            {
                model: User
            },
            {
                model: OrderLine,
                include: [
                    {
                        model:Product
                    }
                ]
            }
        ]
    })
    .then(order=>{
        res.status(200).json(order);
    })
    .catch(next)
});

//S47 : Crear Ruta para modificar una Orden
//PUT /orders/:id

server.put('/:id', (req, res) => {
    OrderLine.findOne({
        where: { id: req.params.id }
    }).then(orderLine => {
        orderLine.update({
            productId: req.body.productId,
            quantity: req.body.quantity
        }).then(orderLine => { res.status(200).json({ orderLine }); }).catch(error => { res.status(400).json({ error }) })
    }).catch(error => { res.status(400).json({ error }) })
})


module.exports = server;