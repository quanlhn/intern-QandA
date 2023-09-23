const express = require('express')
const router = express.Router()

const ProductController = require('../controller/ProductController')
const upload = require('../middleware/upload')
const authenticate = require('../middleware/authenticate')


router.get('/', ProductController.index)
router.post('/show', ProductController.show )
router.post('/store', upload.array('picture[]'), ProductController.store )
router.post('/update', ProductController.update )
router.post('/delete', ProductController.destroy )
router.post('/findProductByName', ProductController.findProductByName )
router.post('/findProductsByGenderType', ProductController.findProductsByGenderType ) 
router.post('/findProductsAndSort', ProductController.findProductsAndSort ) 
router.post('/findProductsByGender', ProductController.findProductsByGender ) 

module.exports = router