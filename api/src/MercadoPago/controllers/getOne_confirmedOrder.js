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

const confirmedOrder = async ({id, payment_method_id, payment_type_id, payment_status, payment_status_detail, card_expiration_month, card_expiration_year, card_first_six_digits, card_last_four_digits, transaction_amount }) => {
    const Order = await getOne(id);
    Order.status = "completed";
    Order.paymentMethodId = payment_method_id;
    Order.paymentTypeId = payment_type_id;
    Order.paymentStatus = payment_status;
    Order.paymentStatusDetail = payment_status_detail;
    Order.cardExpMonth = card_expiration_month;
    Order.cardExpYear = card_expiration_year;
    Order.lastFourDigits = card_last_four_digits;
    Order.recurringPayment = recurring_payment;
    Order.transactionAmount = transaction_amount;

    await Order.save();
    return Order;
};