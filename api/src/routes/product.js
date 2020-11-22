const server = require("express").Router();
const { Product, Category, Image } = require("../db.js");
const { Op } = require("sequelize");

const { Sequelize } = require("sequelize");
// const { response } = require('express');

// Task S17: Crear ruta para agregar o sacar categorías de un producto
server.post("/:productId/category", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByPk(productId);
    if (product) {
      const categories = [];
      if (req.body) {
        for (const cat of req.body) {
          categories.push(Category.findByPk(cat));
        }
        await product.setCategories(await Promise.all(categories));
        res.sendStatus(201);
      } else {
        res.status(404).json({ error: "No se identificó ese ID de categoría" });
      }
    } else {
      res.status(404).json({ error: "No se identificó ese ID de producto" });
    }
  } catch (error) {
    next();
  }
});

server.delete("/:productId/category/:categoryId", async (req, res, next) => {
  const { productId, categoryId } = req.params;
  try {
    const product = await Product.findByPk(productId);
    if (product) {
      const category = await Category.findByPk(categoryId);
      if (category) {
        await product.removeCategory(category);
        res.sendStatus(200);
      } else {
        res.status(404).json({ error: "No se identificó ese ID de categoría" });
      }
    } else {
      res.status(404).json({ error: "No se identificó ese ID de producto" });
    }
  } catch (error) {
    next();
  }
});

// Task S22: Crear ruta que devuelva los productos de X categoría
server.get("/categories/:categoryId", (req, res, next) => {
  const categoryId = req.params.categoryId;
  const offset = req.query.offset;
  const limit = req.query.limit;
  Product.findAndCountAll({
    limit,
    offset,
    include: [
      {
        model: Category,
        where: { id: categoryId },
      },
      Image,
    ],
  })
    .then(({ count, rows: products }) => {
      if (products.length > 0) {
        res.send({ products, count });
      } else {
        res
          .status(404)
          .json({ error: "Esta categoría no tiene productos asociados." });
      }
    })
    .catch(next);
});

// Task S21: Crear ruta que devuelva todos los productos
server.get("/", (req, res, next) => {
  const offset = req.query.offset;
  const limit = req.query.limit;
  Product.findAndCountAll({ limit, offset, include: { model: Image } })
    .then(({ count, rows: products }) => {
      if (products.length > 0) {
        res.send({ products, count });
      } else {
        res.status(404).json({
          error: "No hay productos para seleccionar en este momento.",
        });
      }
    })
    .catch((err) => res.send(err));
});

// Task S23: Crear ruta que retorne productos según el keyword de búsqueda
// GET /search?query={valor}
server.get("/search", (req, res, next) => {
  const valor = req.query.query;
  const offset = req.query.offset;
  const limit = req.query.limit;
  Product.findAndCountAll({
    limit,
    offset,
    where: {
      [Op.or]: [
        { name: { [Op.iLike]: "%" + valor + "%" } },
        { description: { [Op.iLike]: "%" + valor + "%" } },
      ],
    },
    include: [Image],
  })
    .then(({ count, rows: products }) => {
      if (products.length > 0) {
        res.send({ products, count });
      } else {
        res
          .status(404)
          .json({ error: "No se encontraron resultados para esta búsqueda" });
      }
    })
    .catch((err) => res.send(err));
});

// Task S24: Crear ruta de producto individual, pasado un ID que retorne un producto con sus detalles
server.get("/:id", (req, res, next) => {
  Product.findByPk(req.params.id, {
    include: [{ model: Category }, { model: Image }],
  })
    .then((product) => {
      if (product) {
        res.send(product);
      } else {
        res.status(400).send({ error: "No se identificó ese producto" });
      }
    })
    .catch(next);
});

// Task S25: Crear ruta para crear/agregar Producto
server.post("/", async (req, res) => {
  try {
    const product = await Product.create({
      ngoId: req.body.ngoId,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
    });
    const image = await Image.create({
      url: req.body.url,
    });
    await product.addImage(image);
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
  }
});

// Task S26 : Crear ruta para Modificar Producto
server.put("/:id", (req, res, next) => {
  Product.update(req.body, {
    where: { id: req.params.id },
  })
    .then((prod) => {
      if (prod) res.status(200).send(prod);
      if (!prod)
        res.status(400).send({ error: "No se encontró ese ID de producto" });
    })
    .catch(next);
});

// Task S27: Crear Ruta para eliminar Producto
server.delete("/:userId", (req, res, next) => {
  Product.findOne({
    where: {
      id: req.params.userId,
    },
  })
    .then((product) => {
      if (!product) {
        res
          .status(400)
          .send("ERROR: El usuario que intenta eliminar no existe.");
      } else {
        Image.findOne({
          where: {
            id: product.imageId,
          },
        }).then((image) => {
          image.destroy();
        });
        product.destroy();
        res.sendStatus(200);
      }
    })
    .catch(next);
});

module.exports = server;
