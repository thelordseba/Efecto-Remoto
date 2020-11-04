const server = require('express').Router();
const { Product } = require('../db.js');
const { Category } = require('../db.js')
const { Sequelize } = require('sequelize');

// Task S17: Crear ruta para agregar o sacar categorías de un producto
server.post('/:productId/category/:categoryId', (req, res, next) => {
    Product.findByPk(req.params.productId, {
        where: {
            id: req.params.productId
        }       // include: {model: Category}         ///// Revisar con Fini. ¿Cómo modifico la tabla intermedia? catProd
    })
    .then(products => {res.status(200).send(products)})
    .catch(next);
});

server.delete('/:productId/category/:categoryId', (req, res, next) => {
    let categoryId = req.params.categoryId;
    let productId = req.params.productId;
	Product.findOne({
        where: { id: productId}
    })
    // .then((product) => {
    //     if(!category) res.status(400).send({error: 'No se encontró ese ID de producto'})
    //         category.destroy();
    //         res.sendStatus(200)     /// ¿Qué mando?
    // })
    .catch(next);
});

// Task S21: Crear ruta que devuelva todos los productos
server.get('/', (req, res, next) => {
    Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

// Task S22: Crear ruta que devuelva los productos de X categoría
server.get('/categories/:categoryId', (req, res, next) => {
    Category.findAll(req.params.categoryId, {
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
            [Sequelize.Op.iLike]: req.query.name,
        }
    })
    .then(product => {
        if(!product) { 
            res.status(400).send({error: 'No se identificó ese producto'});
        } else {
            res.send(product)
        }
    })
    .catch(next);
})

// Task S24: Crear ruta de producto individual, pasado un ID que retorne un producto con sus detalles
server.get('/:id', (req, res, next) => {
    Product.findByPk(req.params.id)
    .then(product => {
        if(product) {
            res.send(product)
        } else {
            res.status(400).send({error: 'No se identificó ese producto'});
        };
    })
    .catch(next);
});

// Task S25: Crear ruta para crear/agregar Producto
// POST /products
server.post('/', (req, res, next) => {
    const { ngoId, name, description, price, categoryId, image, stock } = req.body;
    Product.create(
        {
        ngoId: ngoId,
        name: name,
        description: description, 
        price: price, 
        categoryId: categoryId, 
        image: image, 
        stock: stock,
        }
    )            
    .then(product => {
        res.status(201).json(product);
    })
    .catch(next);
});

// Task S26 : Crear ruta para Modificar Producto
server.put('/:id', (req, res, next) => {
    Product.update(req.body, {
        where: {id: req.params.id}
    })
    .then(prod => {
        if(prod) res.status(200).send(prod);
        if(!prod) res.status(400).send({error: 'No se encontró ese ID de producto'})
    })
    .catch(next);
})

// Task S27: Crear Ruta para eliminar Producto
server.delete('/:id', (req, res, next) => {
    Product.destroy({
        where: {
            id: req.params.id 
        }
    })
    .then((prod) => {
        if(!prod) res.status(400).send({error: 'No se encontró ese ID de producto'})
        if(prod) res.sendStatus(200)
    })
    .catch(next);
});

module.exports = server;
