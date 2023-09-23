const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DivisionSchema = new Schema({
    code: {
        type: String
    },
    id: {
        type: String
    },
    ward: {
        type: String
    },
    district: {
        type: String
    },
    province: {
        type: String
    },
    provinceID: {
        type: String
    },
    level: {
        type: String
    },
    
}, {timestamps: true})

const Division = mongoose.model('divisions', DivisionSchema)
module.exports = Division