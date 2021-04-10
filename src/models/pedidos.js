const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const SchemaPedidos = new Schema({
    producto: String,
    fecha: Date,
    mes: Number,
    anio: Number,
    envio: String,
    total: Number,
    entrega: String,
    estado: String
})

module.exports = mongoose.model('pedidos', SchemaPedidos);