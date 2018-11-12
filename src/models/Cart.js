const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: String,
    status: String,
    animal: {
        image: { type: String, required: true },
        raca: { type: String, required: true },
        dtNasc: { type: String, required: true },
        sexo: { type: String, required: true },
        valor: { type: Number, required: true },
    },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('cart', cartSchema)