const { response } = require('express')
const Product = require('../models/Product')

const index = (req, res, next) => {
    Product.find()
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

const findProductByName = (req, res, next) => {
    Product.findOne({name: req.body.searchParam}).exec()
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
const findProductsByGenderType = (req, res, next) => {
    if (req.body.s_category) {
        Product.find({gender: req.body.s_gender, category: req.body.s_category}).exec()
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
    } else {
        Product.find({gender: req.body.s_gender, type: req.body.s_type}).exec()
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
}
const findProductsByType = (req, res, next) => {
    Product.find({ type: req.body.s_type}).exec()
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
const findProductsByGender = (req, res, next) => {
    Product.find({ gender: req.body.s_gender}).exec()
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
const findProductsAndSort = (req, res, next) => {
    Product.find({}).sort([[req.body.sort_name, 'desc']])
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

const show = (req, res, next) => {
    let productID = req.body.productID
    Product.findById(productID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

const store = (req, res, next) => {
    let product = new Product({
        name: req.body.name,
        // salePrice: req.body.salePrice,
        ListedPrice: req.body.ListedPrice,
        percentSale: req.body.percentSale,
        color_objects: req.body.color_objects,
        size: req.body.size,
        vote: req.body.vote,
        // picture: req.body.picture,
        gender: req.body.gender,
        category: req.body.category,
        type: req.body.type,
        comment: req.body.comment,
        feature1: req.body.feature1,
        feature2: req.body.feature2,
        
    })
    // if (req.files) {
    //     let path = ''
    //     req.files.forEach(function(files, index, arr) {
    //         path = path + files.path + ','
    //     })
    //     path = path.substring(0, path.lastIndexOf(","))
    //     product.picture = path
    // }

    product.salePrice = (product.ListedPrice / 100 ) * (100 - product.percentSale)
    product.save()
    .then(response => {
        res.json({
            message: 'Product Added Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured! 1'
        })
    })
}

const update = (req, res, next) => {
    let productID = req.body.productID
    let updatedData = {
        name: req.body.name,
        salePrice: req.body.salePrice,
        ListedPrice: req.body.ListedPrice,
        percentSale: req.body.percentSale,
        color_objects: req.body.color_objects,
        size: req.body.size,
        vote: req.body.vote,
        sold: req.body.sold,
        gender: req.body.gender,
        category: req.body.category,
        type: req.body.type,
        comment: req.body.comment,
        feature1: req.body.feature1,
        feature2: req.body.feature2,
    }

    Product.findByIdAndUpdate(productID, {$set: updatedData})
    .then(response => {
        res.json({
            message: 'Employee updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

//delete an employee

const destroy = (req, res, next) => {
    let productID = req.body.productID
    Product.findByIdAndRemove(productID)
    .then(response => {
        res.json({
            message: 'Employee removed Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

module.exports = {
    index, show, store, update, destroy, findProductByName, findProductsByGenderType, findProductsAndSort, findProductsByGender
}