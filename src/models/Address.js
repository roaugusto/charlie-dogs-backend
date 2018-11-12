const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    userId: String,
    nome: String,
    cpf: String,
    email: String,
    cep: Number,
    estado: String,
    endereco: String,
    numero: String,
    bairro: String,
    cidade: String,
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('address', addressSchema)