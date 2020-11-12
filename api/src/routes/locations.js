const server = require('express').Router();
const { User, Ngo, Location } = require('../db.js');

server.get('/', (res, next)=>{
    Location.findAll()
   .then(ngos=> res.status(200).json(ngos))
    .catch(next);
});

server.delete('/:id', (req, res, next) => {
    Location.findByPk({
        where: {
            id: req.params.id 
        }
    })
    .then((location) => {
        if(!location) res.status(400).send({error: 'No se encontró ese ID de producto'})
        if(location) res.send(location)
    })
    .then((location) => {
        location.destroy()
    })
    .catch(next);
});

server.put('/:id', (req, res, next) => {
    Location.update(req.body, {
        where: {id: req.params.id}
    })
    .then(location => {
        if(location) res.status(200).send(location);
        if(!location) res.status(400).send({error: 'No se encontró ese ID de producto'})
    })
    .catch(next);
})

module.exports = server;