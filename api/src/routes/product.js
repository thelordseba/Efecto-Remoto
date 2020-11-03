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

// Task S22: Crear ruta que devuelva los productos de X categoría
server.get('/categoria/:category', (req, res, next) => {
    Category.findOne(req.params.category, {
        include: {model: Product}
    })
    .then(products => {res.status(200).send(products)})
    .catch(next);
});

// Task S23: Crear ruta que retorne productos según el keyword de búsqueda
// GET /search?query={valor}
server.get('/search', (req, res, next) => {
    Product.findAll({
        where: {
            name: {
                [Sequelize.Op.iLike]: req.query.value,
            }
        }
    })
})

// Task S24: Crear ruta de producto individual, pasado un ID que retorne un producto con sus detalles
server.get('/:id', (req, res, next) => {
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

// Task S25: Crear ruta para crear/agregar Producto
// POST /products
server.post('/', (req, res, next) => {
    const { ngoId, name, description, price, categoryId, image, stock } = req.body;
    Product.create({
        ngoId: ngoId,
        name: name,
        description: description, 
        price: price, 
        categoryId: categoryId, 
        image: image, 
        stock: stock,
    })                
    .then(cat => {
        res.status(201).send(cat);
    })
    .catch(next);
})

// Task S26 : Crear ruta para Modificar Producto
server.put('/:id', (req, res, next) => {
    Product.update(req.body, {
        where: {productId: req.params.id}
    })
    .then(prod => {
        if(prod) res.status(200).send(prod);
        if(!prod) res.status(400).send({error: 'No se encontró ese ID de producto'})
    })
    .catch(next);
})

// Task S27: Crear Ruta para eliminar Producto
server.delete('/products/:id', (req, res, next) => {
    Product.destroy({
        where: {
            productId: req.params.id 
        }
    })
    .then((prod) => {
        if(!prod) res.status(400).send({error: 'No se encontró ese ID de producto'})
        if(prod) res.sendStatus(200)
    })
    .catch(next);
});

module.exports = server;
