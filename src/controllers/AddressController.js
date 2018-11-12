const Address = require('../models/Address')
const jwt = require('jsonwebtoken')

module.exports = {

    async store(req, res) {

        let payload = jwt.verify(req.params.token, 'secretKey')
        if (!payload) {
            return res.status(401).send('Unauthorized request')
        }

        let addressData = {};
        addressData = req.body.address
        addressData['userId'] = payload.subject

        //console.log('address: ', addressData)
        const address = await Address.create(addressData)
        return res.status(200).send(address)

    }


}
