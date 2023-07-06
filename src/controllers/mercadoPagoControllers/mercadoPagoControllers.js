const axios = require('axios')
const { MERCADOPAGO_TOKEN } = process.env;

const newOrder = async () => {

    const url = 'https://api.mercadopago.com/checkout/preferences'

    const body = {
        payer_email: 'test_user_1754017320@testuser.com',
        items:[
                ({
                        title: "DevPool Premium",
                        quantity: 1,
                        unit_price: 100,
                        currency_id: "USD"

                })
        ],

        back_urls: {
            failure: 'https://front-end-beige-two.vercel.app/home',
            pending: 'https://front-end-beige-two.vercel.app/home',
            success: 'https://front-end-beige-two.vercel.app/home'
        }
    }
    
    const payment = await axios.post(url, body, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${MERCADOPAGO_TOKEN}`
        }
    })

    return payment.data;
}

module.exports = {
    newOrder
}