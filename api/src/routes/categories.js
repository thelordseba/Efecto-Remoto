const server = require('express').Router();
const { Category } = require('../db.js');
const isAdmin = require("./isAdmin.js");

// GET todas las categorías
// ECOM-80
server.get('/', (req, res, next) => {
    Category.findAll()
    .then(categories => res.send(categories))
    .catch(next);
});

// S18: Crear ruta para crear/agregar categoría (S115)

server.post('/', (req, res, next) => {
  if (isAdmin(req)){
    if(req.user) {
        if(req.user.isAdmin) {
    let {name, description} = req.body
    Category.create({
        name,
        description
    })                
    .then(cat => {
            res.status(201).json(cat);
        })
    .catch(next);
    }
} else {res.sendStatus(401)}}
else {res.sendStatus(401)}
});


// S19: Crear ruta para eliminar categoría (S115)

server.delete('/:categoryId', (req, res, next) => {
  if (isAdmin(req)){
    if(req.user) {
        if(req.user.isAdmin) {
	let categoryId = req.params.categoryId;
	Category.findByPk(categoryId)
    .then((category) => {
        if(!category) res.status(400).send({error: 'No se encontró ese ID de categoría'})
        if(category) {
            category.destroy();
            res.sendStatus(200)
        }    /// ¿Qué mando?
    })
}
} else {res.sendStatus(401)}}
  else {res.sendStatus(401)}
});

// S20: Crear ruta para modificar categoría (s115)

server.put('/:categoryId', (req, res, next) => {
  if (isAdmin(req)){
    if(req.user) {
        if(req.user.isAdmin) {
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
}
} else {res.sendStatus(401)}}
else {res.sendStatus(401)}
});

module.exports = server;
