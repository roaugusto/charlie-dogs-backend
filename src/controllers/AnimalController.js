const Animal = require('../models/Animal')
const Cart = require('../models/Cart')

const jwt = require('jsonwebtoken')

let AnonymousUser = 0;
module.exports = {

    async index(req, res) {
        const animals = await Animal.find({ status: "A" });
        return res.json(animals)
    },

    async indexQuery(req, res) {

        const animals = await Animal.find({ raca: { $regex: req.params.query + '.*', $options: 'i' }, status: "A" });
        return res.json(animals)

    },

    async store(req, res) {

        const animal = await Animal.create(req.body.animal)
        return res.status(200).send(animal)

    },

    async destroy(req, res) {

        console.log('id: ', req.params.id)

        await Animal.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                console.log(err)
            }
            else {
                console.log('animal removed!');
                res.status(200).send('item removed!')
            }
        })

        //return res.status(200).send('ok')
    },

    async anonymousUser(req, res) {

        AnonymousUser = AnonymousUser + 1
        let date = new Date()
        let user = "AbCd" + AnonymousUser + date.getTime();
        console.log('user: ', user)

        let payload = { subject: user }
        let token = jwt.sign(payload, 'secretKey')
        console.log('token: ', token)
        res.status(200).send(token)

    },

    async cart(req, res) {

        let payload = jwt.verify(req.body.token, 'secretKey')
        if (!payload) {
            return res.status(401).send('Unauthorized request')
        }

        await Animal.findOneAndUpdate({ _id: req.body.animal._id }, { status: "C" });

        let cartData = {};
        cartData['animal'] = req.body.animal
        cartData['userId'] = payload.subject
        cartData['status'] = "C"

        // console.log('cart: ', cartData)
        const cart = await Cart.create(cartData)

        // Emitindo evento 
        //const qtdCart = await Cart.count({ userId: payload.subject, status: "C" })
        //console.log('qtdCart: ', qtdCart)
        //req.io.emit('qtdCart', qtdCart);

        return res.status(200).send(cart)

    },

    async reset(req, res) {

        const animal = await Animal.updateMany( {}, { status: "A" });
        const cart = await Cart.deleteMany({})

        return res.status(200).send(animal)

    }
}