const server = require('express').Router();
const { Ngo } = require('../db.js');

server.get('/', (req, res, next)=>{
    Ngo.findAll()
   .then(ngos=> res.status(200).json(ngos))
    .catch(next);
});

server.post('/', (req, res, next) => {
    Product.create(req.body)            
    .then(ngo => {
        res.status(201).json(ngo);
    })
    .catch(next);
});

server.delete('/:id', (req, res, next) => {
    Ngo.findByPk({
        where: {
            id: req.params.id 
        }
    })
    .then((ngo) => {
        if(!ngo) res.status(400).send({error: 'No se encontró ese ID de producto'})
        if(ngo) res.send(prod)
    })
    .then((ngo) => {
        ngo.destroy()
    })
    .catch(next);
});

server.put('/:id', (req, res, next) => {
    Ngo.update(req.body, {
        where: {id: req.params.id}
    })
    .then(ngo => {
        if(ngo) res.status(200).send(ngo);
        if(!ngo) res.status(400).send({error: 'No se encontró ese ID de producto'})
    })
    .catch(next);
})