const {newOrder} = require('../../controllers/mercadoPagoControllers/mercadoPagoControllers');
const postOrder = async(req, res) => {
    try {
        const { bodyOrder } = req.body
        const order = await newOrder(bodyOrder)
        res.status(200).send(order)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    postOrder
}