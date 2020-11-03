const server = require('express').Router();
const { Category } = require('../db.js');


server.delete('/products/category/:categoryId', (req, res, next) => {
	let categoryId = req.params.categoryId;
	Product.findOne({
        where: {
            categoryId: categoryId 
        }
    })
    .then((category) => {
        category.destroy();
        res.send(category)
    })
});