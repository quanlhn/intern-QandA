const { response } = require('express')
const TypePoster = require('../models/TypePoster')

const index = (req, res, next) => {
    TypePoster.find()
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

const AddTypePoster = (req, res, next) => {
    let poster = new TypePoster({
        name: req.body.name,
        description: req.body.description,
        picture: req.body.picture,
        gender: req.body.gender,
        type: req.body.type
    })

    poster.save()
    .then(response => {
        res.json({
            message: 'Typeposter Added Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

const findByGenderAndType = (req, res, next) => {
    TypePoster.find({ type: req.body.s_type, gender: req.body.s_gender}).exec()
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
    index, AddTypePoster, findByGenderAndType
}