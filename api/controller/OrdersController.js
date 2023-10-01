const { response } = require('express')
const Orders = require('../models/Orders')
const User = require('../models/User')
const { default: mongoose } = require('mongoose')
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
    .then(UserController.addOrder(req, res, order))
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

const update = (req, res, next) => {
    let orderID = req.body.orderID
    // let userID = req.body.userID
    let status = req.body.status
        
    Orders.findByIdAndUpdate(orderID, {$set: {status}})
    .then(response => {
        const userID = response.userID
        UserController.updateOrder(req, res, userID)
        res.json({
            message: "status updated successfully"
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurred'
        })
    })
}

const ordersOfUser = (req, res, next) => {
    const userID = req.body.userID
    Orders.find({ userID: userID }).exec()
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
    index, store, update, ordersOfUser
}