const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if (err) {
            res.json ({
                error: err
            })
        }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass,
            role: req.body.role
        })
        if (!user.name || !user.email || !user.password || !user.password) { 

        }
        user.save()
        .then(user => {
            res.json({
                message: 'User Added Successfully!',
                success: true
            })
        })
        .catch(err => {
            res.json({
                message: 'An error occured!'
            })
        })
    }) 
}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({$or: [{email: username}, {phone: username}]})
    .then(user => {
        if (user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) {
                    res.json ({
                        error: err
                    })
                }
                if (result) {
                    let token = jwt.sign({name: user.name}, 'Quanlhn22012002', {expiresIn: '30s'})
                    let refreshToken = jwt.sign({name: user.name}, 'refreshtokensecret', {expiresIn: '48h'})
                    res.json({
                        message: 'Login Successfully!',
                        token,
                        refreshToken,
                        success: true,
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        cartDrawer: user.cartDrawer,
                        role: user.role
                    })
                } else {
                    res.json({
                        message: 'Password does not matched!',
                        success: false
                    })
                }
            })
        } else {
            res.json({
                message: "No user found!",
                success: false
            })
        }
    })
}

const refreshToken = (req, res, next) => {
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken,'refreshtokensecret', (err, decoded) => {
      if (err) {
        res.status(400).json ({
            err
        })
      } else {
        let token = jwt.sign({name: decoded.name}, 'Quanlhn22012002', {expiresIn: '30s'})
        let refreshToken = req.body.refreshToken
        res.status(200).json({
            message: 'Token refreshed successfully!',
            token,
            refreshToken
        })
      }  
    })
}

const updateCart = (req, res, next) => {
    let userID = req.body.userID
    let updatedData = {
        cartDrawer: req.body.cartDrawer
    }

    User.findByIdAndUpdate(userID, {$set: updatedData})
    .then(response => {
        res.json({
            message: 'Cart updated successfully!',
        })
    })
    .catch(err => {
        res.json({
            message: 'An error occured!'
        })
    })
}

const updateOrder = (req, res, order) => {
    let userID = req.body.userID
    User.findById(userID)
    .then(response => {
        let updatedData = {
            orders: [...response.orders, order]
        }
        User.findByIdAndUpdate(userID, {$set: updatedData})
        // .then(response2 => {
        //     res.json({
        //         message: 'Updated order successfully'
        //     })
        // })
        .catch(err => {
            res.json({
                message: 'error in fineAndUpdate'
            })
        })
    })
    .catch(err => {
        res.json({
            message: 'An error occured!'
        })
    })
}

module.exports = {
    register, login, refreshToken, updateCart, updateOrder
}