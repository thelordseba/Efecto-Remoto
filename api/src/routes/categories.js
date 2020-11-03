const server = require('express').Router();
const { Category } = require('../db.js');


server.post('/product/category', (req, res, next) => {
    Category.findOrCreate({
        where: {
            name: req.body.name,
            description: req.body.description
        }
    })                
    .then(cat => {
            res.status(201).send(cat);
        })
    .catch(next);
});

server.put('/product/category/:id', (req, res, next) => {
    Category.findByPk(req.params.id) //
    .then(cat => {
        res.status(200).send(cat);
    })
    .catch(next);
});

server.delete('/products/category/:category', (req, res, next) => {
	let category = req.params.category;
	Product.findOne({
        where: {
            name: category 
        }
    })
    .then((category) => {
        if(!category) res.status(400).send({error: 'No se encontró ese ID de producto'})
        if(category) {
            category.destroy();
            res.sendStatus(200)
        }    /// ¿Qué mando?
    })
});