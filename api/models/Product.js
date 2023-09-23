const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name:{
        type: String
    },
    salePrice:{
        type: Number
    },
    ListedPrice:{
        type: Number
    },
    percentSale:{
        type: Number
    },
    size:{
        type: Array
    },
    vote:{
        type: Number
    },
    color_objects:{
        type: Array
    },
    gender:{
        type: String
    },
    category:{
        type: String
    },
    type:{
        type: String
    },
    comment:{
        type: Object
    },
    sold: {
        type: Number
    },
    feature1:{
        type: String
    },
    feature2:{
        type: String
    },
    
}, {timestamps: true})

const Product = mongoose.model('Product', productSchema)
module.exports = Product