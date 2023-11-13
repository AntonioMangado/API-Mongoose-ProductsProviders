const mongoose = require('mongoose');
require('../config/db_mongo') // Conexión a BBDD MongoDB

const objectSchema = {
    company_name: { 
        type: String, 
        required: true,
        unique: true
    },
    cif: { 
        type: Number, 
        required: true,
        unique: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    url_web: { 
        type: String, 
        required: true 
    },
};

// Crear el esquema
const publisherSchema = mongoose.Schema(objectSchema);

// Crear el modelo --> Colección
const Provider = mongoose.model('Provider', publisherSchema);

module.exports = Provider;

// Ejemplo provider:
// let newProvider = {
//     company_name: "Amazon",
//     cif: 229323,
//     address: "New Delaware 34",
//     url_web: "www.amazon.com" 
// }