const server = require("express").Router();
const mercadopago = require('mercadopago');
const { confirmedOrder } = require("../MercadoPago/controllers/getOne_confirmedOrder.js");
// const { sendEmail } = require('../mailmodel/sendEmail');

const { PROD_ACCESS_TOKEN } = process.env
// Agrega credenciales
mercadopago.configure({
  sandbox: true,
  access_token: PROD_ACCESS_TOKEN,
});
        
const preferences = { 
items, // el array de objetos, items que declaramos más arriba
external_reference: "Efecto Remoto", // referencia para identificar la preferencia // ONG DE LA ORDERLINE
payer: { // información del comprador, si estan en producción tienen que traerlos del request
    //(al igual que hicimos con el precio del item) 
    name: "Lalo",
    surname: "Ortiz",
    email: "test_user_63274575@testuser.com", // REVISAR
    // si estan en sandbox, aca tienen que poner el email de SU usuario de prueba si estan 
    //en producción, deberian completar esta información 
    //de la misma manera que lo hicimos con items, units, y price
    phone: {
    area_code: "11",
    number: "22223333"
    },
    address: {
    zip_code: "1111",
    street_name: "False",
    street_number: "123"
    }
}, 
payment_methods: {
    // declaramos el método de pago y sus restricciones
    excluded_payment_methods: [
    // aca podemos excluir metodos de pagos, tengan en cuenta que es un array de objetos
    // donde el id de cada objeto es la exclusión
    {
        id: "amex"
    // acá estamos excluyendo el uso de la tarjeta American Express
    }
    ],
    excluded_payment_types: [{ id: "atm" }],
    // aca podemos excluir TIPOS de pagos, es un array de objetos
    // Por ejemplo, aca estamos excluyendo pago por cajero
    installments: 1, 
    // mayor cantidad de cuotas permitidas
    default_installments: 1
    // la cantidad de cuotas que van a aparecer por defecto
}, 
back_urls: { // declaramos las urls de redireccionamiento
    success: "https://localhost:3001/payment/meli/callback", // url a la que va a redireccionar si sale todo bien
    failure: "https://localhost:3001/payment/meli/callback" // url a la que va a redireccionar si falla el pago
}, 
notification_url: "https://localhost:3001/payment/webhook", // declaramos nuestra url donde recibiremos las notificaciones. Es la misma ruta que declaramos en app.js
auto_return: "approved" // si la compra es exitosa automaticamente redirige a "success" de back_urls
};
const items = order.products.map(product => ({
    title: props.product.name,
    unit_price: product.order_product.price,
    quantity: product.order_product.quantity
})) 

router.route("/:id/toPayment").post(async (req, res) => {
    const { id } = req.params;
    const { address } = req.body;

    try {
        let order = await getOne(id);
        let preference = {
            items: order.products.map((product) => ({
                title: product.name,
                unit_price: product.order_product.price,
                quantity: product.order_product.amount,
            })),
            payment_methods: {
                excluded_payment_types: [
                    {
                        id: "ticket",
                    },
                    {
                        id: "atm",
                    },
                ],
                installments: 1,
            },
            external_reference: Order.id.toString(),
            back_urls: {
                success: `${process.env.API}/payment/meli/callback`,
                failure: `${process.env.API}/payment/meli/callback`,
            },
            auto_return: "approved",
        };
        const response = await mercadopago.preferences.create(preference);
        Order = await toPaymentOrder({
            id,
            address,
            init_point: response.body.init_point,
        });
        res.json({ redirect: response.body.init_point, order: Order });
    } catch (error) {
        res.status(400).json(error);
}

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