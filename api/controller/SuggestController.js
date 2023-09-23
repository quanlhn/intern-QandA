const { response } = require('express');
const SuggestProducts = require('../models/SuggestProducts')

const index = (req, res, next) => {
    SuggestProducts.find()
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

const AddSuggestion = (req, res, next) => {
    let suggest = new SuggestProducts({
        name: req.body.name,
        title: req.body.title,
        description: req.body.description,
        thumbnail: req.body.thumbnail,
        filterBy: req.body.filterBy,
        sortBy: req.body.sortBy
    })

    suggest.save()
    .then(response => {
        res.json({
            message: 'Suggest Added Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

module.exports = {
    index, AddSuggestion
}