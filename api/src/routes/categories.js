const server = require('express').Router();
const { Category } = require('../db.js');

// S17: Crear ruta para agregar o sacar categorías de un producto

server.post('/products/:productId/category/:categoryId', (req, res, next) => {
    Product.findByPk(req.params.productId, {
        include: {model: Category}         ///// Revisar con Fini. ¿Cómo modifico la tabla intermedia? catProd
    })
    .then(products => {res.status(200).send(products)})
    .catch(next);
});


// S18: Crear ruta para crear/agregar categoría

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

// S19: Crear ruta para eliminar categoría

server.delete('/products/category/:categoryId', (req, res, next) => {
	let categoryId = req.params.categoryId;
	Product.findOne({
        where: { categoryId: categoryId }
    })
    .then((category) => {
        if(!category) res.status(400).send({error: 'No se encontró ese ID de producto'})
        if(category) {
            category.destroy();
            res.sendStatus(200)
        }    /// ¿Qué mando?
    })
});

// S20: Crear ruta para modificar categoría

server.put('/product/category/:categoryId', (req, res, next) => {
    Category.update({
        name: req.body.name,
        description: req.body.description}, {
            where: req.params.categoryId}) //
    .then(cat => {
        res.status(200).send(cat);
    })
    .catch(next);
});

