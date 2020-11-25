const server = require('express').Router();
const { Ngo, Location } = require('../db.js');
const isAdmin = require("./isAdmin.js");

server.get('/', (req, res, next)=>{
    Ngo.findAll()
   .then(ngos=> res.status(200).json(ngos))
    .catch(next);
});
//(115)
server.post('/', async (req, res, next) => {
  if (isAdmin(req)){
    try {const ngo = await Ngo.create({
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,
        // accessToken: req.body.accessToken
    })
    const location = await Location.create({
        address: req.body.address,
        number: req.body.number,
        postalCode: req.body.postalCode,
        city: req.body.city,
        province: req.body.province
    })
    await ngo.setLocation(location)
    res.json(ngo);
    } catch(error) {next(error)}
}
});
//(S115)
server.delete('/:id', (req, res, next) => {
  if (isAdmin(req)){
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
}
});
//(S115)
server.put('/:id', (req, res, next) => {
  if (isAdmin(req)){
    Ngo.update(req.body, {
        where: {id: req.params.id}
    })
    .then(ngo => {
        if(ngo) res.status(200).send(ngo);
        if(!ngo) res.status(400).send({error: 'No se encontró ese ID de producto'})
    })
    .catch(next);
}
})

module.exports = server;