const server = require('express').Router();
const { User, Ngo, Location } = require('../db.js');

server.post('/locationPureba', (req, res)=>{});

server.get('/', (req, res, next)=>{
    Location.findAll()
   .then(location=> res.status(200).json(location))
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