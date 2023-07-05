
const { Router } = require('express')

const { postOrder } = require('../../handlers/mercadoPagoHandlers/mercadoPagoHadles');
const mercadoPagoRouter = Router()

mercadoPagoRouter.post('/', postOrder)

module.exports = mercadoPagoRouter