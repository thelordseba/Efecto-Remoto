const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const categoryRouter = require('./categories.js');
const userRouter = require('./users.js');
const orderRouter = require('./orders.js');
const ngoOrder = require('./ngos.js');
const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/users', userRouter)
router.use('/orders', orderRouter)
router.use('/ngos', ngoOrder)

module.exports = router;
