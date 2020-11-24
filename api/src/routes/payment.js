const server = require('express').Router();
const PaymentController = require("../MercadoPago/controllers/PaymentController"); //importamos el controller
const PaymentService = require("../MercadoPago/services/PaymentService"); //importamos el service

const PaymentInstance = new PaymentController(new PaymentService()); // Permitimos que el controller pueda usar el service

server.post("/new", (req, res) => PaymentInstance.getMercadoPagoLink(req, res) );

server.post("/webhook", (req, res) => PaymentInstance.webhook(req, res));

const getOne = (id) => {
    return new Promise((resolve, reject) => {
        Order.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: Product,
                    include: {
                        model: Image,
                    },
                },
                User,
            ],
        })
            .then((order) => {
                if (!order) {
                    return reject({
                        error: {
                            name: "ApiFindError",
                            type: "Orders error",
                            errors: [
                                {
                                    message:
                                        "order does not exist in the database",
                                    type: "not found",
                                    value: null,
                                },
                            ],
                        },
                    });
                }

                resolve(order);
            })
            .catch((err) =>
                reject({
                    error: err,
                })
            );
    });
};

const confirmedOrder = async ({
    id,
    payment_method_id,
    payment_type_id,
    payment_status,
    payment_status_detail,
    card_expiration_month,
    card_expiration_year,
    card_first_six_digits,
    card_last_four_digits,
    transaction_amount,
}) => {
    const Order = await getOne(id);
    Order.status = "Completed";
    Order.payment_method_id = payment_method_id;
    Order.payment_type_id = payment_type_id;
    Order.payment_status = payment_status;
    Order.payment_status_detail = payment_status_detail;
    Order.card_expiration_month = card_expiration_month;
    Order.card_expiration_year = card_expiration_year;
    Order.card_first_six_digits = card_first_six_digits;
    Order.card_last_four_digits = card_last_four_digits;
    Order.transaction_amount = transaction_amount;

    await Order.save();
    return Order;
};

server.get('/meli/callback', async (req, res) => {
    if (req.query.collection_status !== 'null') {
      try {
        const { body } = await mercadopago.payment.get(req.query.collection_id)
        const order_product = await confirmedOrder({
          id: req.query.external_reference,
          payment_method_id: body.payment_method_id,
          payment_type_id: body.payment_type_id,
          payment_status: body.status,
          payment_status_detail: body.status_detail,
          card_expiration_month: body.card.expiration_month,
          card_expiration_year: body.card.expiration_year,
          card_first_six_digits: body.card.first_six_digits,
          card_last_four_digits: body.card.last_four_digits,
          transaction_amount: body.transaction_amount
        })
        res.redirect(`http://localhost:3000/checkout/success`)
      } catch (error) {
        res.status(200).json(error)
      }
    } else {
      res.redirect(`http://localhost:3000/checkout/cancel?order=${req.query.external_reference}`)
    }
  })

module.exports = server;