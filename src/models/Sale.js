const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema({
    userId: String,
    animals: { type : Array , "default" : [] },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('sale', saleSchema)