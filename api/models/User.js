const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    cartDrawer: {
        type: Array
    },
    orders: {
        type: Array
    },
    role: {
        type: String
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User
