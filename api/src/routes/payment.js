const server = require("express").Router();
const mercadopago = require('mercadopago');
const { confirmedOrder, getOne, toPaymentOrder } = require("../MercadoPago/controllers/controllers.js");
// const { sendEmail } = require('../mailmodel/sendEmail');sdf

const { PROD_ACCESS_TOKEN } = process.env
// Agrega credenciales
mercadopago.configure({
  sandbox: true,
  access_token: PROD_ACCESS_TOKEN,
});

server.post("/:id/toPayment", async (req, res) => {
    const { id } = req.params;
    try {
        let order = await getOne(id);
        let preference = {
            items: order.products.map(product => ({
                title: product.name,
                unit_price: product.price,
                quantity: product.orderLine.dataValues.quantity
            })),
            payment_methods: {
                excluded_payment_types: [{ id: "ticket" }, { id: "atm" }],
                installments: 1,
            },
            external_reference: order.id.toString(),
            back_urls: {
                success: `http://localhost:3001/payment/meli/callback`,
                failure: `http://localhost:3001/payment/meli/callback`,
            },
            // operation_type: {
            //     recurring_payment: 
            // },
            auto_return: "approved", // redirecciona a nuestra página automáticamente una vez finalizado el pago
        };
        const response = await mercadopago.preferences.create(preference);
        Order = await toPaymentOrder({
            id,
            initPoint: response.body.init_point, // la url para redireccionar al usuario a la página de pago de MP
        });
        res.json({ redirect: response.body.init_point, order: Order });
    } catch (error) { console.log(error); res.status(400).json(error)};
});

server.get('/meli/callback', async (req, res) => {
    if (req.query.collection_status !== 'null') {
      try {
        const { body } = await mercadopago.payment.get(req.query.collection_id)
        const data = {
            ...body,
            id: parseInt(req.query.external_reference),
        }
        const order_product = await confirmedOrder(data)
        res.redirect(`http://localhost:3000/checkout/success`)
      } catch (error) { console.log(error); res.status(500).json(error) }
    } else { res.redirect(`http://localhost:3000/checkout/cancel?order=${req.query.external_reference}`) }
})

module.exports = server;