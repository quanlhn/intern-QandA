const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TypePoster = new Schema({
    name:{
        type: String
    },
    description:{
        type: String
    },
    picture:{
        type: String
    },
    gender:{
        type: String
    },
    type:{
        type: String
    },
      
}, {timestamps: true})

const Product = mongoose.model('TypePoster', TypePoster)
module.exports = Product