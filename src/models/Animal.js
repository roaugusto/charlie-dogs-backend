const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema({
    image: { type: String, required: true },
    raca: { type: String, required: true },
    dtNasc: { type: String, required: true },
    sexo: { type: String, required: true },
    valor: { type: Number, required: true },
    status: { type: String, default: 'A' },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('animal', animalSchema);