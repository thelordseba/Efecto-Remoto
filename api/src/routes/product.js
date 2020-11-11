const server = require('express').Router();
const { Product, Category, Image } = require('../db.js');

const { Sequelize } = require('sequelize');
const { response } = require('express');

// Task S17: Crear ruta para agregar o sacar categorías de un producto
server.post('/:productId/category/:categoryId', async (req, res, next) => {
    const {productId, categoryId} = req.params
    try { 
        const product = await Product.findByPk(productId)
        if (product) {
            const category = await Category.findByPk(categoryId)
            if (category) {
                await product.addCategory(category)
                res.sendStatus(201) 
            } else {
                res.status(404).json({error: "No se identificó ese ID de categoría"})    
            }
        } else {
            res.status(404).json({error: "No se identificó ese ID de producto"})
        }
    } 
    catch(error) {next()};
});

server.delete('/:productId/category/:categoryId', async (req, res, next) => {
    const {productId, categoryId} = req.params
    try { 
        const product = await Product.findByPk(productId)
        if (product) {
            const category = await Category.findByPk(categoryId)    
            if(category) {
                await product.removeCategory(category)
                res.sendStatus(200) 
            } else {
                res.status(404).json({error: "No se identificó ese ID de categoría"}) 
            }
        } else {
            res.status(404).json({error: "No se identificó ese ID de producto"})
        }
    }
    catch(error) {next()};
});

// Task S21: Crear ruta que devuelva todos los productos
server.get('/', (req, res, next) => {
    Product.findAll({include: {model: Image}})
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
        include: [Product, Image]})    
    .then(products => {
        if(products) {
            res.send(products)
        } else {
            res.status(404).json({error: "Esta categoría no tiene productos asociados"})
        }
    })
    .catch(next);
});

// Task S23: Crear ruta que retorne productos según el keyword de búsqueda
// GET /search?query={valor}
server.get('/search', (req, res, next) => {
    const valor = req.query.query;
    console.log(valor)
    Product.findAll({
      where: {
        [Sequelize.Op.or]: [
          { name: { [Sequelize.Op.substring]: valor } },
          { description: { [Sequelize.Op.substring]: valor } },
        ],
      },
    })
    .then((products) => {
        if(products.length > 0) {
            res.send(products);
        } else {
            res.status(404).json({error: "No se encontraron resultados para esta búsqueda"})
        }
    })
    .catch((err) => res.send(err));
})

// Task S24: Crear ruta de producto individual, pasado un ID que retorne un producto con sus detalles
server.get('/:id', (req, res, next) => {
    Product.findByPk(req.params.id, {include: [{model: Category}, {model: Image}]})
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
server.post('/', async (req, res, next) => {
    try {
        const product = await Product.create({
            ngoId: req.body.ngoId,
            name: req.body.name,
            description: req.body.description, 
            price: req.body.price, 
            stock: req.body.stock,
        })
        console.log(product)
        // const image = await Image.create({
        //     img: req.body.img, 
        // })
        // console.log(img)
        await product.setImage(image)
        res.status(201).json(product)
    } catch (error) {
        console.log('hola fini y tomi capos')
    }
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
    Product.findByPk({
        where: {
            id: req.params.id 
        }
    })
    .then((prod) => {
        if(!prod) res.status(400).send({error: 'No se encontró ese ID de producto'})
        if(prod) res.send(prod)
    })
    .then((prod) => {
        prod.destroy()
    })
    .catch(next);
});

module.exports = server;
