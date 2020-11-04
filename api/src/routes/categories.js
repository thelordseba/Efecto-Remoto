const server = require('express').Router();
const { Category } = require('../db.js');

// GET todas las categorías

server.get('/', (req, res, next) => {
    Category.findAll()
    .then(categories => res.send(categories))
    .catch(next);
});

// S18: Crear ruta para crear/agregar categoría

server.post('/', (req, res, next) => {
    let {name, description} = req.body
    Category.create({
        name,
        description
    })                
    .then(cat => {
            res.status(201).json(cat);
        })
    .catch(next);
});

// S19: Crear ruta para eliminar categoría

server.delete('/:categoryId', (req, res, next) => {
	let categoryId = req.params.categoryId;
	Category.findByPk(categoryId)
    .then((category) => {
        if(!category) res.status(400).send({error: 'No se encontró ese ID de categoría'})
        if(category) {
            category.destroy();
            res.sendStatus(200)
        }    /// ¿Qué mando?
    })
});

// S20: Crear ruta para modificar categoría

server.put('/:categoryId', (req, res, next) => {
    let categoryId = req.params.categoryId;
    Category.update(req.body, {
        where: {
            id: categoryId
        }
    })
    .then(cat => {
        res.status(200).send(cat);
    })
    .catch(next);
});

module.exports = server;
