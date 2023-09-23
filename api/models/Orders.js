const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema ({
    userID: {
        type: String
    },
    products: {
        type: Array
    },
    total: {
        type: Number
    },
    ship: {
        type: Number
    },
    phone: {
        type: String
    },
    customerName: {
        type: String
    },
    province: {
        type: String
    },
    district: {
        type: String
    },
    ward: {
        type: String
    },
    address: {
        type: String
    },
    status: {
        type: String
    },
}, {timestamps: true})

const Orders = mongoose.model('Orders', orderSchema)
module.exports = Orders