const server = require("express").Router();
const { Review, Product, User } = require("../db.js");

server.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [{ model: Product }, { model: User }],
    });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

server.get("/:productId", async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const reviews = await Review.findAll({
      where: { productId: productId },
      include: [{ model: Product }, { model: User }],
    });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

server.post("/:productId", async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findByPk(productId);
    const user = await User.findByPk(req.body.userId);
    await user.addProduct(product, {
      through: { rating: req.body.rating, description: req.body.description },
    });
    // await user.addProduct(product);
    res.sendStatus(201);
  } catch (error) {
    next();
  }
});

server.put("/:productId", async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findByPk(productId);
    const user = await User.findByPk(req.body.userId);
    await user.addProduct(product, {
      through: { rating: req.body.rating, description: req.body.description },
    });
    // await user.addProduct(product);
    res.sendStatus(201);
  } catch (error) {
    next();
  }
});

server.delete("/:productId", async (req, res, next) => {
  const productId = req.params.productId;
  const userId = req.body.userId;
  try {
    const review = await Review.findOne({
      where: {
        productId: productId,
        userId: userId,
      },
    });
    await review.destroy();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = server;
