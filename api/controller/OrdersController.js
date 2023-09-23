const { response } = require('express')
const Orders = require('../models/Orders')
const UserController = require('./AuthController')
const index = (req, res, next) => {
    Orders.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(err => {
        res.json({
            message: 'An error occurred!'
        })
    })
}

const store = (req, res, next) => {
    let order = new Orders(req.body.order)
    order.save()
    .then(UserController.updateOrder(req, res, order))
    .then(response => {
        res.json({
            message: 'Order added successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurred'
        })
    })
}

module.exports = {
    index, store
}