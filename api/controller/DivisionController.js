const { response } = require('express')
const Division = require('../models/AdministrativeDivision')

const index = (req, res, next) => {
    Division.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(err => {
        res.json({
            message: 'An error occured!'
        })
    })
}

// 

const findProvince = (req, res, next) => {
    const level1 = 'Tỉnh'
    const level2 = 'Thành phố Trung ương'
    Division.find({$or: [{level: level2}, {level: level1}]}).exec()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(err => {
        res.json({
            message: 'An error occured!'
        })
    })          
}
const findDistrict = (req, res, next) => {
    const level1 = 'Quận'
    const level2 = 'Huyện'
    const level3 = 'Thị xã'
    const level4 = 'Thành phố'
    Division.find({$or: [{level: level1}, {level: level2}, {level: level3}, {level: level4}], province: req.body.province }).exec()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(err => {
        res.json({
            message: 'An error occured!'
        })
    })          
}
const findWard = (req, res, next) => {
    const level1 = 'Phường'
    const level2 = 'Xã'
    const level3 = 'Thị trấn'
    Division.find({$or: [{level: level1}, {level: level2}, {level: level3}], district: req.body.district }).exec()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(err => {
        res.json({
            message: 'An error occured!'
        })
    })          
}

module.exports = {
    index, findProvince, findWard, findDistrict
}