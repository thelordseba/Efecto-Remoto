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

module.exports = server;
