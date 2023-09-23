const express = require('express')
const router = express.Router()

const TypePoster = require('../controller/TypePoster')

router.get('/', TypePoster.index)
router.post('/add', TypePoster.AddTypePoster)
router.post('/findByGenderAndType', TypePoster.findByGenderAndType)

module.exports = router