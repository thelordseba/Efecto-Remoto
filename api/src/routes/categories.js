const server = require('express').Router();
const { Category } = require('../db.js');

// S18: Crear ruta para crear/agregar categoría

server.post('/', (req, res, next) => {
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

server.delete('/:categoryId', (req, res, next) => {
	let categoryId = req.params.categoryId;
	Product.findOne({
        where: { categoryId: categoryId }
    })
    .then((category) => {
        if(!category) res.status(400).send({error: 'No se encontró ese ID de categoría'})
        category.destroy();
        res.sendStatus(200)              /// ¿Qué mando?
    })
    .catch(next);
});


// S20: Crear ruta para modificar categoría

server.put('/:categoryId', (req, res, next) => {
    Category.update({
        name: req.body.name,
        description: req.body.description}, {
            where: req.params.categoryId}) //
    .then(cat => res.status(200).send(cat))
    .catch(next);
});

