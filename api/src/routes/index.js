const { Router } = require("express");
// import all routers;
const productRouter = require("./product");
const categoryRouter = require("./categories");
const userRouter = require("./users");
const orderRouter = require("./orders");
const ngoRouter = require("./ngos");
const locationsRouter = require("./locations");
const reviewsRouter = require("./reviews");
const router = Router();
// const authRouterFB = require("./authFB");
// const authRouterGM = require("./authGM");
// const authRouterLocal = require("./authLocal");

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use("/authFB", authRouterFB);
// router.use("/authGM", authRouterGM);
// router.use("/authLocal", authRouterLocal);
// router.use("/auth", authRouterFB);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/ngos", ngoRouter);
router.use("/locations", locationsRouter);
router.use("/reviews", reviewsRouter);

module.exports = router;
