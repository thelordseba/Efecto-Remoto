const server = require('express').Router();
const { Product } = require('../db.js');
const { Category } = require('../db.js');
const { Sequelize } = require('sequelize');

// Task S17: Crear ruta para agregar o sacar categorías de un producto
server.post('/:productId/category/:categoryId', async (req, res, next) => {
    const {productId, categoryId} = req.params
    try { const product = await Product.findByPk(productId)
    const category = await Category.findByPk(categoryId)    
    await product.addCategory(category)
    res.sendStatus(201) }
    catch(error) {next()};
});

server.delete('/:productId/category/:categoryId', async (req, res, next) => {
    const {productId, categoryId} = req.params
    try { const product = await Product.findByPk(productId)
    const category = await Category.findByPk(categoryId)    
    await product.removeCategory(category)
    res.sendStatus(200) }
    catch(error) {next()};
});

// Task S21: Crear ruta que devuelva todos los productos
server.get('/', (req, res, next) => {
    Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

// Task S22: Crear ruta que devuelva los productos de X categoría
server.get('/categories/:categoryId', (req, res, next) => {
    const categoryId = req.params.categoryId;
    Category.findOne({
        where: {
            id: categoryId
        },
        include: [Product]})    
    .then(products => res.send(products))
    .catch(next);
});

// Task S23: Crear ruta que retorne productos según el keyword de búsqueda
// GET /search?query={valor}
server.get('/search', (req, res, next) => {
    const valor = req.query.query;

    Product.findAll({
      where: {
        [Sequelize.Op.or]: [
          { name: { [Sequelize.Op.substring]: valor } },
          { description: { [Sequelize.Op.substring]: valor } },
        //   { category: { [Sequelize.Op.substring]: valor} },
        ],
      },
    })
    .then((products) => {
        res.send(products);
    })
    .catch((err) => res.send(err));
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
    const { ngoId, name, description, price, categoryId, img, stock } = req.body;
    Product.create(
        {
        ngoId: ngoId,
        name: name,
        description: description, 
        price: price, 
        categoryId: categoryId, 
        img: img, 
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
