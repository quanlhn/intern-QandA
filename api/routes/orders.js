const express = require('express')
const router = express.Router()

const Orders = require('../controller/OrdersController')

router.get('/', Orders.index)
router.post('/store', Orders.store)

module.exports = router