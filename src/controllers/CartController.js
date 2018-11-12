const Cart = require('../models/Cart')
const jwt = require('jsonwebtoken')

module.exports = {

    async index(req, res) {

        let payload = jwt.verify(req.params.token, 'secretKey')
        if (!payload) {
            return res.status(401).send('Unauthorized request')
        }

        let userId = payload.subject    
        const cart = await Cart.find({ userId: userId, status: "C" });
        return res.json(cart)

    },

    async store(req, res) {

        const cart = await Cart.create(req.body)
        return res.status(200).send(cart)

    },

    async count(req, res) {

        let payload = jwt.verify(req.params.token, 'secretKey')
        if (!payload) {
            return res.status(401).send('Unauthorized request')
        }

        const qtdCart = await Cart.countDocuments({ userId: payload.subject, status: "C" })
        //console.log('qtdCart: ', qtdCart)
        return res.json(qtdCart)

    },



}
