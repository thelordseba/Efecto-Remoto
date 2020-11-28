const { Product, Image, User, Category, Order } = require("../../db.js");
const SendEmail = require("../../emailModel/sendEmail.js");

const getOneProduct = (id) => {
    return new Promise((resolve, reject) => {
      Product.findOne({ where: { id }, include: [Category, Image] })
        .then((product) => {
          if (!product) {
            return reject({
              error: {
                name: "ApiFindError",
                type: "Products Error",
                errors: [
                  {
                    message: "Producto no existe en la base de datos",
                    type: "not found",
                    value: null,
                  },
                ],
              },
            });
          }
  
          resolve(product);
        })
        .catch((err) => reject({ error: err }));
    });
  };

const getOne = (id) => {
    return new Promise((resolve, reject) => {
        Order.findOne({
            where: { id },
            include: [
                { model: Product, include: { model: Image }},
                User,
            ],
        }).then((order) => {
            if (!order) {
                return reject({
                    error: {
                        name: "ApiFindError",
                        type: "Orders error",
                        errors: [{
                            message: "order does not exist in the database",
                            type: "not found",
                            value: null,
                        }],
                    },
                });
            } resolve(order);
        }).catch((err) => reject({ error: err }));
    });
};

const toPaymentOrder = async ({ id, initPoint }) => {
    const Order = await getOne(id);
    let poderComprar = true;

    Order.products.map((product) => {
        if (product.orderLine.quantity > product.stock) {
            poderComprar = false;
        }
    });

    return new Promise((resolve, reject) => {
        if (!poderComprar) {
            return reject({
                error: {
                    message:
                        "No se puede hacer la compra, uno de los productos no tiene el stock suficiente",
                },
            });
        }

        const products = Order.products.map((product) => {
            return getOneProduct(product.id)
                .then((p) => {
                    p.stock = p.stock - product.order_product.quantity;
                    return p.save();
                })
                .catch((err) => err);
        });

        Promise.all(products)
            .then(() => {
                Order.status = "processing";
                Order.initPoint = initPoint;
                Order.save();
            })
            .catch((err) => reject({error: err}));

        getOne(id).then((e) => {resolve(e)});
    });
};

const confirmedOrder = async ({ id, payment_method_id, payment_type_id, status, status_detail, card, transaction_amount }) => {
    const Order = await getOne(id);
    Order.status = "completed";
    Order.paymentMethodId = payment_method_id;
    Order.paymentTypeId = payment_type_id;
    Order.paymentStatus = status;
    Order.paymentStatusDetail = status_detail;
    Order.cardExpMonth = card.expiration_month;
    Order.cardExpYear = card.expiration_year;
    Order.lastFourDigits = card.last_four_digits;
    // Order.recurringPayment = recurring_payment;
    Order.transactionAmount = transaction_amount;
    await Order.save();
    SendEmail(Order);
    return Order;
};

module.exports = {
    getOneProduct,
    getOne,
    confirmedOrder,
    toPaymentOrder,
}; 