const server = require("express").Router();
const mercadopago = require('mercadopago');
const { confirmedOrder } = require("../MercadoPago/controllers/getOne_confirmedOrder.js");
// const { sendEmail } = require('../mailmodel/sendEmail');sdf

const { PROD_ACCESS_TOKEN } = process.env
// Agrega credenciales
mercadopago.configure({
  sandbox: true,
  access_token: PROD_ACCESS_TOKEN,
});

server.route("/:id/toPayment").post(async (req, res) => {
    const { id } = req.params;
    try {
        let order = await getOne(id);
        let preference = {
            items: order.products.map(product => ({
                title: props.product.name,
                unit_price: product.order_product.price,
                quantity: product.order_product.quantity
            })),
            payment_methods: {
                excluded_payment_types: [{ id: "ticket" }, { id: "atm" }],
                installments: 1,
            },
            external_reference: order.id.toString(),
            back_urls: {
                success: `https://localhost:3001/payment/meli/callback`,
                failure: `https://localhost:3001/payment/meli/callback`,
            },
            auto_return: "approved",
        };
        const response = await mercadopago.preferences.create(preference);
        Order = await toPaymentOrder({
            id,
            init_point: response.body.init_point,
        });
        res.json({ redirect: response.body.init_point, order: Order });
    } catch (error) {
        res.status(400).json(error);
    };
});

server.get('/meli/callback', async (req, res) => {
    if (req.query.collection_status !== 'null') {
      try {
        const { body } = await mercadopago.payment.get(req.query.collection_id)
        const order_product = await confirmedOrder({
          id: req.query.external_reference,
          paymentMethodId: body.payment_method_id,
          paymentTypeId: body.payment_type_id,
          paymentStatus: body.status,
          paymentStatusDetail: body.status_detail,
          cardExpMonth: body.card.expiration_month,
          cardExpYear: body.card.expiration_year,
          lastFourDigits: body.card.first_six_digits,
          recurringPayment: body.recurring_payment,
          transactionAmount: body.transaction_amount
        })
        res.redirect(`http://localhost:3000/checkout/success`)
      } catch (error) { res.status(200).json(error) }
    } else { res.redirect(`http://localhost:3000/checkout/cancel?order=${req.query.external_reference}`) }
})

module.exports = server;