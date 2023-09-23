const express = require('express')
const router = express.Router()

const Division = require('../controller/DivisionController')

router.get('/', Division.index)
router.get('/findProvince', Division.findProvince)
router.post('/findDistrict', Division.findDistrict)
router.post('/findWard', Division.findWard)

module.exports = router