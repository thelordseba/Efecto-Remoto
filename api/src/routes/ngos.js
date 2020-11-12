const server = require('express').Router();
const { Ngo, Location } = require('../db.js');

server.get('/', (req, res, next)=>{
    Ngo.findAll()
   .then(ngos=> res.status(200).json(ngos))
    .catch(next);
});

server.post('/', async (req, res, next) => {
    try {const ngo = await Ngo.create({
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    })
    const location = await Location.create({
        address: req.body.address,
        number: req.body.number,
        postalCode: req.body.url,
        city: req.body.city,
        province: req.body.province
    })
    await ngo.setLocation(location)
    res.json(ngo);
    } catch(error) {next(error)}
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

module.exports = server;