const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const SchemaVentas = new Schema({
    producto: String,
    fecha: Date,
    mes: Number,
    anio: Number,
    total: Number,
    descripcion: String
})

module.exports = mongoose.model('ventas', SchemaVentas);