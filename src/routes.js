const express = require('express')
const routes = express.Router()

const AnimalController = require('./controllers/AnimalController')
const CartController = require('./controllers/CartController')
const SaleController = require('./controllers/SaleController')
const AddressController = require('./controllers/AddressController')

routes.get('/', (req, res) => res.send('Hello from server'))

// Routes for Animal
routes.get('/dogs', AnimalController.index)
routes.get('/dogs/:query', AnimalController.indexQuery)
routes.post('/dogs', AnimalController.store)
routes.delete('/dogs/:id', AnimalController.destroy)
routes.put('/dogs', AnimalController.cart)
routes.get('/token', AnimalController.anonymousUser)
routes.post('/cart', AnimalController.cart)
routes.get('/reset', AnimalController.reset)

// Routes for Cart
routes.get('/cart/:token', CartController.index)
routes.get('/countCart/:token', CartController.count)

//Routes for Sale
routes.post('/sales/:token', SaleController.store)

//Routes for Address
routes.post('/address/:token', AddressController.store)

module.exports = routes;