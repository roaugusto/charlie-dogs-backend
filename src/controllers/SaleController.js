const Sale = require('../models/Sale')
const Cart = require('../models/Cart')
const jwt = require('jsonwebtoken')

module.exports = {

    async store(req, res) {

        let payload = jwt.verify(req.params.token, 'secretKey')
        if (!payload) {
            return res.status(401).send('Unauthorized request')
        }

        let userId = payload.subject
        let saleData = {};
        saleData['animals'] = req.body.animals
        saleData['userId'] = userId

        //console.log('sale: ', saleData)
        const sale = await Sale.create(saleData)
        const cart = await Cart.updateMany({ userId: userId, status: "C" }, { status: "F" });

        return res.status(200).send(sale)

    }


}
