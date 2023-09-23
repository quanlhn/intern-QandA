const mongoose = require('mongoose')
const Schema = mongoose.Schema

const suggestProductsSchema = new Schema({
    name: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    thumbnail: {
        type: String
    },
    filterBy: {
        type: String
    },
    sortBy: {
        type: String
    },
    getDataBy: {
        type: String
    }
}, {timestamps: true})

const SuggestProducts = mongoose.model('SuggestProducts', suggestProductsSchema)

module.exports = SuggestProducts
