const server = require('express').Router();
const { Order } = require('../db.js');

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


module.exports = server;