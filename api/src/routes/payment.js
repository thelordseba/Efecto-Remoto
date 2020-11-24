const server = require('express').Router();
const PaymentController = require("../MercadoPago/controllers/PaymentController"); //importamos el controller
const PaymentService = require("../MercadoPago/services/PaymentService"); //importamos el service

const PaymentInstance = new PaymentController(new PaymentService()); // Permitimos que el controller pueda usar el service

server.post("/new", (req, res) => PaymentInstance.getMercadoPagoLink(req, res) );

server.post("/webhook", (req, res) => PaymentInstance.webhook(req, res));

module.exports = server;