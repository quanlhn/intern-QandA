const express = require('express')
const router = express.Router()

const SuggestController = require('../controller/SuggestController')

router.get('/', SuggestController.index)
router.post('/add', SuggestController.AddSuggestion)

module.exports = router