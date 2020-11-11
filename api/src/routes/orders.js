const server = require('express').Router();
const { Order, Product } = require('../db.js');

//S44 Crear Ruta que retorne todas las ordenes (retorna las ordenes de un determinado status)
server.get('/', (req, res, next)=>{
    let {status} = req.query.status;
    Order.findAll({
        where:{
            status : status        //Status posibles => ['cart', 'created', 'processing', 'cancelled', 'completed']
        }
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
                model: Product
            }
        ]
    })
    .then(order=>{
        res.status(200).json(order);
    })
    .catch(next)
});


module.exports = server;