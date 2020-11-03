const server = require('express').Router();
const { Product } = require('../db.js');

// S21: Crear ruta que devuelva todos los productos
server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.get('/products/:id', (req, res, next) => {
    Product.findOne({
        where: {
            productId: req.params.id
        }
    })
    .then(product => {
        if(!product.productId) {
            res.status(400).send({error: 'No se identificó ese producto'});
        } else {
            res.send(product)
        };
	})
	.catch(next);
});

server.put('/products/:id', (req, res, next) => {
    Product.findByPk(req.params.id)
    .then(prod => {
        if(prod) res.status(200).send(prod);
        if(!prod) res.status(400).send({error: 'No se encontró ese ID de producto'})
    })
    .catch(next);
})

server.get('/products/categoria/:category', (req, res, next) => {
    Category.findByPk(req.params.category, {
        include: {model: Product}
    })
    .then(products => {res.status(200).send(products)})
    .catch(next);
});

module.exports = server;
