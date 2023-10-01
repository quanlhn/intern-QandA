const express = require('express')
const router = express.Router()

const AuthController = require('../controller/AuthController')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/refresh-token', AuthController.refreshToken)
router.post('/updateCart', AuthController.updateCart)
router.post('/user/addOrder', AuthController.addOrder)
router.post('/user/updateOrder', AuthController.updateOrder)
router.post('/user/deleteUser', AuthController.deleteUser)
router.get('/user/findStaffs', AuthController.findStaffs)
router.post('/user/updateUser', AuthController.updateUser)

module.exports = router

