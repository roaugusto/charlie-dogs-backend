const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const requireDir = require('require-dir')

const port = process.env.PORT || 3000
const dbUrl = 'mongodb://rodrigosantos:rodrigo123@ds151753.mlab.com:51753/charlie-dogs'

const app = express();

// Habilitando o protocolo WS - WebSocket 
// Necessario para entender as requisicoes real-time
// const server = require('http').Server(app)
// const io = require('socket.io')(server)

// Iniciando o banco MongoDB
mongoose.connect(dbUrl, { useNewUrlParser: true }, err => {
    if (err) {
        console.log('Error> ', err)
    } else {
        console.log('Connected to mongodb')
    }
})

requireDir('./src/models')

//Adicionando middleware socket.io
// app.use((req, res, next) => {
//     req.io = io
//     return next()
// })

app.use(cors())
app.use(express.json())
app.use("/api", require("./src/routes"));
app.use(bodyParser.json())

//Trocar app por server para habilitar o protocolo WS
//server.listen(port, () => {
app.listen(port, () => {
    console.log('Server running on port: ', port)
})